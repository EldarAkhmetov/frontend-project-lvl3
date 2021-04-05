// @ts-check
import i18next from 'i18next';
import resources from './locales/index.js';
import Main from './Main.js';

export default () => {
  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: 'ru',
    resources,
  });

  const initialState = {
    form: {
      message: '',
    },
    uploadedFeed: [],
    uploadedArticles: [],
  };
  document.body.innerHTML = '<div id="point"></div>';
  const element = document.getElementById('point');
  const obj = new Main(element, initialState, i18nInstance);
  obj.init();
};
