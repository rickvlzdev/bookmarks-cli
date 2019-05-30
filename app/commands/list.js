const db = require('../db');
const getLatestArticles = async (data, options) => {
  const {limit = 10, all: complete = false} = options;
  const articleInstances = await db.Article.findAll({
    order: [['id', 'DESC']],
    limit,
  });
  const articles = await db.Article.serializeArray(articleInstances, complete);
  return articles;
};

module.exports = {
  getLatestArticles,
};