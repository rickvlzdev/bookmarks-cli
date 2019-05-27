const db = require('../db');

const addOneArticle = async (data, options) => {
  try {
    const {title, uniformResourceLocator} = data;
    const {all: complete = false} = options;
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
      throw new Error('Article already exists.\n')
    }
    const article = await db.Article.deserialize(data, complete);
    return [article];
  } catch (err) {
    process.stderr.write(err.toString());
  }
};

module.exports = {
  addOneArticle,
};
