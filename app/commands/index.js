const now = require('performance-now');
const list = require('./list');
const add = require('./add');
const remove = require('./remove');
const search = require('./search');
const print = require('../print');

module.exports = async (command, data, options) => {
  let start;
  let end;
  let articles;
  switch (command) {
    case 'list': {
      start = now();
      articles = await list.getLatestArticles(data, options);
      end = now();
      break;
    }
    case 'add': {
      start = now();
      articles = await add.addOneArticle(data, options);
      end = now();
      break;
    }
    case 'search': {
      start = now();
      const {title, uniformResourceLocator, nickname} = options;
      if (title || uniformResourceLocator || nickname) {
        articles = await search.searchByFields(data, options);
      } else {
        articles = await search.searchByTags(data, options);
      }
      end = now();
      break;
    }
    case 'remove': {
      start = now();
      articles = await remove.removeOneArticle(data, options);
      end = now();
      break;
    }
    default: {
      throw new Error('Command not found\n');
    }
  }
  const summary = print.summary(articles, ((end - start) / 1000).toFixed(3));
  const results = print.results(articles);
  return {
    summary,
    results,
  };
};
