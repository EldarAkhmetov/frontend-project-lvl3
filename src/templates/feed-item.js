export default (feed) => `
  <li class="list-group-item">
    <h3>${feed.title}</h3>
    <p>${feed.description}</p>
  </li>
`;
