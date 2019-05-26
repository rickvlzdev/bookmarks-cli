const db = require('../db');
const getLatestArticles = async (numberOfArticles = 10) => {
  try {
    const articleInstances = await db.Article.findAll({
      order: [['id', 'DESC']],
      limit: numberOfArticles,
    });
    const articles = await db.Article.serializeArray(articleInstances);
    return articles;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getLatestArticles,
};