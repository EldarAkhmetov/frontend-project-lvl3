// @ts-check
import axios from 'axios';
import getAllOriginLink from './all-origin';

const loadRss = (value) => new Promise((resolve, reject) => {
  axios(getAllOriginLink(value))
    .then(({ data }) => {
      resolve(data);
    })
    .catch((e) => {
      reject(e);
    });
});

export default loadRss;
