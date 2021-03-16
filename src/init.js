// @ts-check

import Main from './Main.js';

export default () => {
  const element = document.getElementById('point');
  const obj = new Main(element);
  obj.init();
};
