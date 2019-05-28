const {Article, Tag} = require('../app/db');
const data = require('./data');

(async () => {
  for(let article of data.articleSetOne.concat(data.articleSetTwo)) {
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