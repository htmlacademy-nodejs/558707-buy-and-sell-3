'use strict';

const {Cli} = require(`./cli`);

const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode: {SUCCESS},
} = require(`../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand, userArgvCount] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(SUCCESS);
}

Cli[userCommand].run(userArgvCount);
process.exit(SUCCESS);
