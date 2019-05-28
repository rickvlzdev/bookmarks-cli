const {Article, Tag} = require('../app/db');
const data = require('./data');

(async () => {
  for(let article of data.articleSetOne.concat(data.articleSetTwo)) {
    await Article.deserialize(article);
  }
})();