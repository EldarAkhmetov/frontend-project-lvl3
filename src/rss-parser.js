// @ts-check

const buildItems = (item) => ({
  title: item.querySelector('title').textContent,
  description: item.querySelector('title').textContent,
  link: item.querySelector('link').textContent,
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
