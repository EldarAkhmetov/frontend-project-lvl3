// @ts-check
import i18next from 'i18next';
import resources from './locales/index.js';
import runApp from './app.js';

export default () => {
  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: 'ru',
    resources,
  });
  runApp(i18nInstance);
};
