// @ts-check

import { cloneDeep } from 'lodash';
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
  const obj = new Main(element, cloneDeep(initialState));
  obj.init();
};
