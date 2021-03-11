'use strict';

const {logger} = require(`../../../utils`);
const {ExitCode, Command} = require(`../../../constants`);

const message = `Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    server <command>

    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --filldb              заполняет базу данных
    --server <port>       запускает сервер на порту <port>`;

module.exports = {
  name: Command.HELP,
  run() {
    logger.showHelp(message);
    process.exit(ExitCode.SUCCESS);
  },
};
