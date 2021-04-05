export default (link) => {
  const allOriginLink = 'https://hexlet-allorigins.herokuapp.com/';
  return `${allOriginLink}get?url=${encodeURIComponent(link)}&disableCache=true`;
};
