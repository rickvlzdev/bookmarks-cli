const db = require('../db');
const getLatestArticles = async (data, options) => {
  try {
    const {limit = 10, all: complete = false} = options;
    const articleInstances = await db.Article.findAll({
      order: [['id', 'DESC']],
      limit,
    });
    const articles = await db.Article.serializeArray(articleInstances, complete);
    return articles;
  } catch (err) {
    process.stderr.write(err.toString() + '\n');
  }
};

module.exports = {
  getLatestArticles,
};