export default (link) => {
  const allOriginLink = 'https://allorigins.hexlet.app/';
  return `${allOriginLink}get?url=${encodeURIComponent(link)}&disableCache=true`;
};
