// @ts-check

import Main from './Main.js';

const initialState = {
  form: {
    message: '',
  },
  uploadedFeed: [],
  uploadedArticles: [],
};

export default () => {
  const element = document.getElementById('point');
  const obj = new Main(element, initialState);
  obj.init();
};
