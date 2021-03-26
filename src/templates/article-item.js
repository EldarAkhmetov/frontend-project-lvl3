export default (article) => `
  <li class="list-group-item d-flex justify-content-between align-items-start">
    <a href=${article.link} class="fw-bold" target="_blank" rel="noopener noreferrer">${article.title}</a>
    <button type="button" class="btn btn-primary btn-sm">Просмотр</button>
  </li>
`;
