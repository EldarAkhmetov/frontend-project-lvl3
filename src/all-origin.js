export default (link) => {
  const allOriginLink = 'https://hexlet-allorigins.herokuapp.com/';
  return `${allOriginLink}raw?disableCache=true&url=${link}`;
};
