// @ts-check
import i18next from 'i18next';
import resources from './locales';
import loadRss from './rss-loader';
import parseRss from './rss-parser';
import mainInnerHtml from './templates/main-inner-html';
import mainFeedHtml from './templates/main-feed-html';
import createFeedItem from './templates/feed-item';
import mainArticleHtml from './templates/main-article-html';
import createArticleItem from './templates/article-item';

export default class Main {
  constructor(element, state) {
    this.element = element;
    this.state = state;
  }

  renderFeed() {
    const section = document.querySelector('section[name="feed"]');
    const row = section.querySelector('div[name="feed-info"]');
    row.innerHTML = mainFeedHtml;
    const feedInfo = row.querySelector('ul[name="feed-list"]');
    const feedList = this.state.uploadedFeed.map(createFeedItem)
      .join('');
    feedInfo.innerHTML = feedList;
  }

  renderArticles() {
    const section = document.querySelector('section[name="feed"]');
    const row = section.querySelector('div[name="articles"]');
    row.innerHTML = mainArticleHtml;
    const articles = row.querySelector('ul[name="articles-list"]');
    const articlesList = this.state.uploadedArticles
      .map(createArticleItem)
      .join('');
    articles.innerHTML = articlesList;
  }

  render() {
    const main = document.createElement('main');
    main.classList.add('flex-grow-1');
    main.innerHTML = mainInnerHtml;
    this.element.parentNode.replaceChild(main, this.element);
    this.element = main;
  }

  initAutoUpdate() {
    const interval = 5000;
    const updateArticles = () => {
      const currentFeedLinks = this.state.uploadedFeed.map((feed) => feed.link);
      Promise.all(currentFeedLinks.map(loadRss))
        .then((data) => {
          const currentArticles = this.state.uploadedArticles;
          let isFeedChange = false;
          const parsedData = data.map((feed) => parseRss(feed));
          parsedData.forEach((feed) => {
            feed.items.forEach((item) => {
              const hasArticle = currentArticles.find((article) => article.link === item.link);
              if (!hasArticle) {
                this.state.uploadedArticles = [item, ...currentArticles];
                isFeedChange = true;
              }
            });
          });
          if (isFeedChange) {
            this.renderArticles();
          }
          setTimeout(updateArticles, interval);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    setTimeout(updateArticles, interval);
  }

  bind() {
    const { element } = this;
    const form = element.querySelector('form');
    const input = form.querySelector('input');
    const submitButton = form.querySelector('button');
    const feedback = form.querySelector('div.feedback');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      feedback.classList.add('d-none');
      feedback.classList.add('text-danger');
      submitButton.disabled = true;
      const { value } = input;
      feedback.innerHTML = '';
      if (this.state.uploadedFeed.find((feed) => feed.link === value)) {
        feedback.classList.remove('d-none');
        feedback.innerHTML = i18next.t('errorMessages.alreadyExists');
        submitButton.disabled = false;
        return;
      }

      loadRss(value)
        .then((data) => {
          feedback.classList.remove('d-none');
          feedback.classList.remove('text-danger');
          feedback.innerHTML = i18next.t('successMessages.feedLoaded');
          input.value = '';
          const parsedData = parseRss(data);
          const { title, description, items } = parsedData;
          this.state.uploadedFeed.push({ title, description, link: value });
          this.state.uploadedArticles = [...items, ...this.state.uploadedArticles];
          this.renderFeed();
          this.renderArticles();
          if (this.state.uploadedFeed.length === 1) {
            this.initAutoUpdate();
          }
        })
        .catch((error) => {
          feedback.classList.remove('d-none');
          feedback.classList.add('text-danger');
          feedback.innerHTML = i18next.t('errorMessages.rssRequired');
          console.log(error.message);
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    });
  }

  init() {
    i18next.init({
      lng: 'ru',
      debug: true,
      resources,
    })
      .then(() => {
        this.render();
        this.bind();
        console.log('ehu!');
      });
  }
}
