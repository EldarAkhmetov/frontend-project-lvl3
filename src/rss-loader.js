// @ts-check
import axios from 'axios';

const loadRss = (value) => new Promise((resolve, reject) => {
  axios(value)
    .then(({ data }) => {
      resolve(data);
    })
    .catch((e) => {
      reject(e);
    });
});

export default loadRss;
