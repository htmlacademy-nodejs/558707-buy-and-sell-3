"use strict";

const app = require(`./server`);
const {Command} = require(`../../../constants`);
const {logger} = require(`../../../utils`);

const DEFAULT_PORT = process.env.PORT || 3000;

module.exports = {
  name: Command.SERVER,
  run(port) {
    const formattedPort = parseInt(port, 10) || DEFAULT_PORT;

    app.listen(formattedPort, (err) => err ? logger.showError(`Ошибка при создании сервера`, err) : logger.showSuccess(`Ожидаю соединений на ${formattedPort}`));
  },
};
