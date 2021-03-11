"use strict";

require(`dotenv`).config();

const app = require(`./server`);
const {Command} = require(`../../../../constants`);
const Database = require(`../../../database/index`);

const DEFAULT_PORT = process.env.PORT || 3000;

module.exports = {
  name: Command.SERVER,
  run(port) {
    const formattedPort = parseInt(port, 10) || DEFAULT_PORT;

    Database.connect();
    
    app(Database.sequelize, formattedPort);
  },
};
