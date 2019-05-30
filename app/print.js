const chalk = require('chalk');

const results = (articles = []) => {
  if (articles.length === 0) {
    return 'No articles found.\n';
  }
  let output = '';
  articles.forEach((article, index) => {
    let {
      title,
      uniformResourceLocator: url,
      nickname,
      createdAt = null,
      updatedAt = null,
    } = article;
    const tags = article.tags.map(tag => `'${chalk.bold(tag)}'`).join(', ');
    output = output.concat(
      `title ${chalk.bold(title)}\nurl ${chalk.bold(url)}\ntags ${tags}\nnickname ${chalk.bold.blue(nickname)}\n`
      );
    if (createdAt && updatedAt) {
      createdAt = createdAt.toLocaleString();
      updatedAt = updatedAt.toLocaleString();
      output = output.concat(`created on ${chalk.bold.magenta(createdAt)}\nupdated on ${chalk.bold.magenta(updatedAt)}\n`);
    }
    if (index < (articles.length - 1)) {
      output = output.concat('\n');
    }
  });
  return output;
};

const summary = (articles = [], time = '0.000') => {
  const items = articles.length;
  return chalk.bold.green(`results: ${items} item(s), time: ${time} seconds\n`);
};

const error = (err) => {
  return chalk.bold.red(err.toString() + '\n');
}

module.exports = {
  results,
  summary,
  error,
};
