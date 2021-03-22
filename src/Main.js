// @ts-check
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

  updateRenderFeed() {
    const section = document.querySelector('section[name="feed"]');
    const row = section.querySelector('div[name="feed-info"]');
    row.innerHTML = mainFeedHtml;
    const feedInfo = row.querySelector('ul[name="feed-list"]');
    const feedList = this.state.uploadedFeed.map(createFeedItem)
      .join('');
    feedInfo.innerHTML = feedList;
  }

  updateRenderArticles() {
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
        feedback.innerHTML = 'Rss already exists';
        submitButton.disabled = false;
      } else {
        loadRss(value)
          .then((data) => {
            feedback.classList.remove('d-none');
            feedback.classList.remove('text-danger');
            feedback.innerHTML = 'RSS успешно загружен';
            input.value = '';
            const parsedData = parseRss(data);
            const { title, description, items } = parsedData;
            this.state.uploadedFeed.push({ title, description, link: value });
            this.state.uploadedArticles = [...items, ...this.state.uploadedArticles];
            this.updateRenderFeed();
            this.updateRenderArticles();
          })
          .catch((error) => {
            feedback.classList.remove('d-none');
            feedback.classList.add('text-danger');
            feedback.innerHTML = 'Ресурс не содержит валидный RSS';
            console.log(error.message);
          })
          .finally(() => {
            submitButton.disabled = false;
          });
      }
    });
  }

  init() {
    this.render();
    this.bind();
    console.log('ehu!');
  }
}
