const program = require('commander');
const getCommand = require('./app/commands');

program.version('0.1.0');

program
  .command('list')
  .option('-l --limit <limit>', 'List the n most recent articles', 5)
  .option('-a --all', 'Show when article was created and updated')
  .action(async (cmd) => {
    try {
      const data = {};
      const options = {
        limit: cmd.limit,
        all: cmd.all,
      };
      const {summary, results} = await getCommand('list', data, options);
      process.stdout.write(summary);
      process.stdout.write(results);
    } catch (err) {
      process.stderr.write(err.toString() + '\n');
    }
  });

program
  .command('add <title> <url> [tags...]')
  .option('-a --all', 'Show when article was created and updated')
  .action(async (title, uniformResourceLocator, tags, cmd) => {
    try {
      const data = {
        title,
        uniformResourceLocator,
        tags,
      };
      const options = {
        all: cmd.all,
      };
      const {summary, results} = await getCommand('add', data, options);
      process.stdout.write(summary);
      process.stdout.write(results);
    } catch (err) {
      process.stderr.write(err.toString());
    }
  });

program
  .command('search <query...>')
  .option('-n --nickname', 'search by nickname')
  .option('-t --title', 'search by title')
  .option('-u --uniformResourceLocator', 'search by URL')
  .option('-b --backwards', 'order by oldest articles')
  .option('-l --limit <limit>', 'List the n most recent articles', 100)
  .option('-s --strict', 'retrieve articles that have all tags')
  .option('-a --all', 'Show when article was created and updated')
  .action(async (query, cmd) => {
    try {
      const data = {query};
      const options = {
        nickname: cmd.nickname,
        title: cmd.title,
        uniformResourceLocator: cmd.uniformResourceLocator,
        backwards: cmd.backwards,
        limit: cmd.limit,
        strict: cmd.strict,
        all: cmd.all,
      };
      const {summary, results} = await getCommand('search', data, options);
      process.stdout.write(summary);
      process.stdout.write(results);
    } catch (err) {
      process.stderr.write(err.toString() + '\n');
    }
  });

program
  .command('remove <nickname>')
  .option('-a --all', 'Show when article was created and updated')
  .action(async (nickname, cmd) => {
    try {
      const data = {
        nickname,
      };
      const options = {
        all: cmd.all,
      };
      const {summary, results} = await getCommand('remove', data, options);
      process.stdout.write(summary);
      process.stdout.write(results);
    } catch (err) {
      process.stderr.write(err.toString());
    }

  });
program.parse(process.argv);
