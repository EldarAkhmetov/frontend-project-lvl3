import onChange from 'on-change';
import * as yup from 'yup';
import loadRss from './rss-loader';
import parseRss from './rss-parser';
import initAutoUpdate from './feed-updater';
import render, {
  renderSubmit,
  renderFeedback,
  renderFeed,
  renderArticles,
} from './view.js';

export default (i18n) => {
  const initialState = {
    form: {
      message: '',
      state: 'filling',
    },
    feeds: [],
    articles: [],
  };

  document.body.innerHTML = '<div id="point"></div>';
  const initialElement = document.querySelector('#point');
  render(initialElement);

  const element = {
    body: document.body,
    form: document.querySelector('form'),
    input: document.querySelector('input'),
    submitButton: document.querySelector('button[name="add"]'),
    feedback: document.querySelector('div.feedback'),
    modal: document.querySelector('.modal'),
    modalCloseButtons: document.querySelectorAll('[data-dismiss="modal"]'),
  };

  const watchedState = onChange(initialState, (path, value) => {
    switch (path) {
      case 'form.state':
        renderSubmit(value, element);
        break;
      case 'form.message':
        renderFeedback(value, element);
        break;
      case 'feeds':
        renderFeed(value);
        break;
      case 'articles':
        renderArticles(value, element);
        break;
      default:
        throw new Error('No such property');
    }
  });

  element.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { feedback } = element;
    const { value } = element.input;
    watchedState.form.message = '';
    try {
      const schema = yup.string()
        .url(i18n.t('errorMessages.invalidUrl'))
        .notOneOf(watchedState.feeds.map(({ link }) => link), i18n.t('errorMessages.alreadyExists'));
      schema.validateSync(value);
    } catch (error) {
      const [errorText] = error.errors;
      watchedState.form.message = errorText;
      return;
    }

    watchedState.form.state = 'loading';
    loadRss(value)
      .then((data) => {
        const parsedData = parseRss(data);
        watchedState.form.state = 'filling';
        element.input.value = '';
        feedback.classList.remove('text-danger');
        watchedState.form.message = i18n.t('successMessages.feedLoaded');
        const { title, description, items } = parsedData;
        watchedState.feeds = [{ title, description, link: value }, ...watchedState.feeds];
        watchedState.articles = [...items, ...watchedState.articles];
        if (watchedState.feeds.length === 1) {
          initAutoUpdate(watchedState);
        }
      })
      .catch((error) => {
        watchedState.form.state = 'filling';
        watchedState.form.message = i18n.t('errorMessages.rssRequired');
        if (error.message !== "Cannot read property 'textContent' of null") {
          watchedState.form.message = i18n.t('errorMessages.networkError');
        }
      });
  });
};
