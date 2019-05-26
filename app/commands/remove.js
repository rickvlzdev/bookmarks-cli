const db = require('../db');
const _ = require('lodash');
const removeOneArticle = async (nickname) => {
  try {
    const articleInstance = await db.Article.findOne({where: {nickname}});
    if (!articleInstance) {
      throw new Error('Article does not exist.');
    }
    const article = await articleInstance.serialize(true);
    await articleInstance.destroy();
    return article;
  } catch (err) {
    process.stderr.write(err.toString());
  }
};

module.exports = {
  removeOneArticle,
};
