const {Article, Tag, ArticleTag} = require('../app/db');

(async () => {
  for(let model of [ArticleTag, Article, Tag]) {
    await model.drop();
  }
  for(let model of [Article, Tag, ArticleTag]) {
    await model.sync({force: true});
  }
})();
