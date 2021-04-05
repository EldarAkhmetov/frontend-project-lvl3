// @ts-check
import i18next from 'i18next';
import { cloneDeep } from 'lodash';
import resources from './locales';
import Main from './Main.js';

export default () => {
  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: 'ru',
    debug: true,
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
  const obj = new Main(element, cloneDeep(initialState), i18nInstance);
  obj.init();
};
