export default (article) => `
  <li class="list-group-item d-flex justify-content-between align-items-start" data-id=${article.id}>
    <a href=${article.link} class="${article.isRead ? 'font-weight-normal' : 'font-weight-bold'}" target="_blank" rel="noopener noreferrer">${article.title}</a>
    <button type="button" class="btn btn-primary btn-sm">Просмотр</button>
  </li>
`;
