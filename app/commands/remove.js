const db = require('../db');
const _ = require('lodash');
const removeOneArticle = async (data, options) => {
  try {
    const {nickname} = data;
    const {all: complete = false} = options;
    const articleInstance = await db.Article.findOne({where: {nickname}});
    if (!articleInstance) {
      throw new Error('Article does not exist.\n');
    }
    const article = await articleInstance.serialize(complete);
    await articleInstance.destroy();
    return [article];
  } catch (err) {
    process.stderr.write(err.toString());
  }
};

module.exports = {
  removeOneArticle,
};
