const db = require('../db');

const addOneArticle = async (plainObj) => {
  try {
    const {title, uniformResourceLocator} = plainObj;
    const count = await db.Article.count({
      where: {
        [db.Op.or]: [
          {
            title,
          },
          {
            uniformResourceLocator,
          },
        ],
      },
    });
    if (count > 0) {
      throw new Error('Article already exists.')
    }
    const article = await db.Article.deserialize(plainObj);
    return article;
  } catch (err) {
    process.stderr.write(err.toString());
  }
};

module.exports = {
  addOneArticle,
};
