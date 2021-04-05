// @ts-check
import i18next from 'i18next';
import resources from './locales';
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
  const element = document.getElementById('point');
  const obj = new Main(element, initialState, i18nInstance);
  obj.init();
};
