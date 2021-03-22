// @ts-check

import Main from './Main.js';

const initialState = {
  form: {
    isValid: false,
    validationErrors: [],
  },
  uploadedFeed: [],
  uploadedArticles: [],
};

export default () => {
  const element = document.getElementById('point');
  const obj = new Main(element, initialState);
  obj.init();
};
