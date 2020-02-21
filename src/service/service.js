'use strict';

const {Cli} = require(`./cli`);

const {
  MAX_MOCK_COUNT,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode
} = require(`../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;
const userMocksCount = userArguments.slice(1);

if (userCommand === `--generate` && userMocksCount > MAX_MOCK_COUNT) {
  console.info(`Не больше ${MAX_MOCK_COUNT} объявлений`);
  process.exit(ExitCode.error);
}

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[userCommand].run(userMocksCount);
