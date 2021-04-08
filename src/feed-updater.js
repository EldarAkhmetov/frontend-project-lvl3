import loadRss from './rss-loader';
import parseRss from './rss-parser';

export default (state) => {
  const interval = 5000;
  const updateArticles = () => {
    const currentFeedLinks = state.feeds.map((feed) => feed.link);
    Promise.all(currentFeedLinks.map(loadRss))
      .then((data) => {
        const currentArticles = state.articles;
        const newArticles = [];
        const parsedData = data.map((feed) => parseRss(feed));
        parsedData.forEach((feed) => {
          feed.items.forEach((item) => {
            const hasArticle = currentArticles.some((article) => article.link === item.link);
            if (!hasArticle) {
              newArticles.push(item);
            }
          });
        });
        if (newArticles.length > 0) {
          newArticles.reverse().forEach((article) => state.articles.unshift(article));
        }
        setTimeout(updateArticles, interval);
      })
      .catch(() => {
      });
  };
  setTimeout(updateArticles, interval);
};
