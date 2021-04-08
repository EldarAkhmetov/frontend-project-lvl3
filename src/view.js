import mainInnerHtml from './templates/main-inner-html';
import mainFeedHtml from './templates/main-feed-html';
import createFeedItem from './templates/feed-item';
import mainArticleHtml from './templates/main-article-html';
import createArticleItem from './templates/article-item';

const renderDisableSubmit = (element) => {
  const { input, submitButton } = element;
  input.readOnly = true;
  submitButton.disabled = true;
};

const renderEnableSubmit = (element) => {
  const { input, submitButton } = element;
  input.readOnly = false;
  submitButton.disabled = false;
};

export const renderSubmit = (formState, element) => {
  switch (formState) {
    case 'loading':
      renderDisableSubmit(element);
      break;
    default:
      renderEnableSubmit(element);
      break;
  }
};

export const renderFeed = (feeds) => {
  const section = document.querySelector('section[name="feed"]');
  const row = section.querySelector('div[name="feed-info"]');
  row.innerHTML = mainFeedHtml;
  const feedInfo = row.querySelector('ul[name="feed-list"]');
  const feedList = feeds.map(createFeedItem)
    .join('');
  feedInfo.innerHTML = feedList;
};

const renderModal = (article, element) => {
  const { modal, modalCloseButtons } = element;
  document.body.classList.add('modal-open');
  modal.classList.add('show');
  modal.setAttribute('style', 'display: block; padding-right: 17px;');

  const title = modal.querySelector('.modal-title');
  const description = modal.querySelector('.modal-body');
  const link = modal.querySelector('a');

  title.textContent = article.title;
  description.textContent = article.description;
  link.href = article.link;
  modalCloseButtons.forEach((modalCloseElement) => {
    modalCloseElement.addEventListener('click', () => {
      document.body.classList.remove('modal-open');
      modal.classList.remove('show');
      modal.setAttribute('style', 'display: hidden;');
    });
  });
};

export const renderArticles = (articleItems, element) => {
  const section = document.querySelector('section[name="feed"]');
  const row = section.querySelector('div[name="articles"]');
  row.innerHTML = mainArticleHtml;
  const articles = row.querySelector('ul[name="articles-list"]');
  const articlesList = articleItems
    .map(createArticleItem)
    .join('');
  articles.innerHTML = articlesList;
  const viewButtons = articles.querySelectorAll('button');
  const articleLinks = articles.querySelectorAll('a');
  articleLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const articleId = e.target.parentNode.dataset.id;
      const currentArticle = articleItems
        .find((article) => article.id === articleId);
      if (!currentArticle.isRead) {
        currentArticle.isRead = true;
        renderArticles(articleItems, element);
      }
    });
  });
  viewButtons.forEach((viewButton) => {
    viewButton.addEventListener('click', (e) => {
      const articleId = e.target.parentNode.dataset.id;
      const currentArticle = articleItems
        .find((article) => article.id === articleId);
      if (!currentArticle.isRead) {
        currentArticle.isRead = true;
        renderArticles(articleItems, element);
      }
      renderModal(currentArticle, element);
    });
  });
};

export const renderFeedback = (message, element) => {
  const { feedback } = element;
  if (!message) {
    feedback.classList.add('d-none');
    feedback.classList.add('text-danger');
    feedback.textContent = '';
    return;
  }
  feedback.classList.remove('d-none');
  feedback.textContent = message;
};

export default (element) => {
  const main = document.createElement('main');
  main.classList.add('flex-grow-1');
  main.innerHTML = mainInnerHtml;
  element.parentNode.replaceChild(main, element);
};
