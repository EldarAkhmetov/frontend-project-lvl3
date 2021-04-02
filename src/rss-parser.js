// @ts-check
import { uniqueId } from 'lodash';

const buildItems = (item) => ({
  title: item.querySelector('title').textContent,
  description: item.querySelector('description').textContent,
  link: item.querySelector('link').textContent,
  id: uniqueId(),
  isRead: false,
});

export default (rssData) => {
  const parser = new DOMParser();
  const xmlDocument = parser.parseFromString(rssData, 'text/xml');
  return {
    title: xmlDocument.querySelector('title').textContent,
    description: xmlDocument.querySelector('description').textContent,
    items: [...xmlDocument.querySelectorAll('item')].map(buildItems),
  };
};
