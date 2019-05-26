const {Article, Tag, ArticleTag} = require('../app/db');
const {articleSetOne: data} = require('./data');

(async () => {
  for(let model of [ArticleTag, Article, Tag]) {
    await model.drop();
  }
  for(let model of [Article, Tag, ArticleTag]) {
    await model.sync({force: true});
  }
  for(let article of data) {
    const {title, uniformResourceLocator, tags} = article;
    const articleInstance = await Article.create({title, uniformResourceLocator});
    const tagInstances = [];
    for(let tag of tags) {
      const [tagInstance] = await Tag.findOrCreate({
        where: {
          keyword: tag,
        },
      });
      tagInstances.push(tagInstance);
    }
    await articleInstance.addTags(tagInstances);
  }
})();
