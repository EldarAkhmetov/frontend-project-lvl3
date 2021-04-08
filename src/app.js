import onChange from 'on-change';
import * as yup from 'yup';
import render, { renderSubmit, renderFeedback } from './view.js';

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

  const watchedState = onChange(initialState, (path) => {
    switch (path) {
      case 'form.state':
        renderSubmit(watchedState.form.state, element);
        break;
      case 'form.message':
        renderFeedback(watchedState.form.message, element);
        break;
      default:
        console.log(path);
        break;
    }
  });

  const schema = yup.string()
    .url(i18n.t('errorMessages.invalidUrl'))
    .notOneOf(watchedState.feeds.map((feed) => feed.link), i18n.t('errorMessages.alreadyExists'));

  element.form.addEventListener('submit', (e) => {
    e.preventDefault();
    schema.validate(element.input.value)
      .then(() => {
        watchedState.form.message = '';
        watchedState.form.state = 'loading';
      })
      .catch((error) => {
        const [errorText] = error.errors;
        watchedState.form.message = errorText;
      });
  });
};
