const db = require('../db');
const searchByFields = async (query, options) => {
  try {
    const filterFields = [
      'nickname',
      'title',
      'uniformResourceLocator',
    ]
    const filterOptions = [];
    filterFields.forEach((field) => {
      if (options[field]) {
        for(let subquery of query) {
          filterOptions.push({[field]: {[db.Op.substring]: `%${subquery}%`}});
        }
      }
    });
    const {backwards, limit} = options;
    const articleInstances = await db.Article.findAll({
      where: {
        [db.Op.or]: filterOptions,
      },
      order: [
        ['createdAt', backwards ? 'ASC' : 'DESC'],
      ],
      limit,
    });
    const articles = await db.Article.serializeArray(articleInstances);
    return articles;
  } catch (err) {
    process.stderr.write(err.toString())
  }
};

const searchByTags = async (query, options) => {
  try {
    const {strict, backwards, limit} = options;
    let articleInstances = await db.Article.findAll({
      order: [
        ['createdAt', backwards ? 'ASC' : 'DESC'],
      ],
      limit,
      include: [{
        model: db.Tag,
        where: {
          keyword:{
            [db.Op.in]: query,
          },
        },
      }],
    });
    if (strict) {
      // temporary solution to intersection search
      const tagsInstances = await db.Tag.findAll({
        where: {
          keyword: {
            [db.Op.in]: query,
          }
        },
      });
      // if a tag does not exist throw error and show which tags don't exist
      const nonExistingTags = query.filter((subquery) => {
        return !db.Tag.serializeArray(tagsInstances, {
          short: true,
        }).includes(subquery.toLowerCase());
      });
      if (nonExistingTags.length > 0) {
        const errorMessage = nonExistingTags.join(', ')
        throw new Error(`Following tags don't exist: ${errorMessage}\n`);
      }
      for(let articleInstance of articleInstances) {
        const hasAllTags = await articleInstance.hasTags(tagsInstances);
        // if the article does not have all tags remove from instances array
        if (!hasAllTags) {
          const index = articleInstances.indexOf(articleInstance);
          if (index > -1) articleInstances.splice(index, 1);
        }
      }
    }
    const articles = await db.Article.serializeArray(articleInstances);
    return articles;
  } catch (err) {
    process.stderr.write(err.toString());
  }
};

module.exports = {
  searchByFields,
  searchByTags,
};
