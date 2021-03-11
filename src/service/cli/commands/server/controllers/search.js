"use strict";

const {getSearch} = require(`../api`);
const pinoLogger = require(`../../../../../pino-logger`);
const {HttpCode} = require(`../../../../../constants`);

const getIndex = (sequelize) => (async (req, res) => {
  try {
    const offers = await getSearch(req, sequelize);
    res.status(HttpCode.OK).json(offers);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
    pinoLogger.error(`Error: ${err.message}`);
  }
});

module.exports = getIndex;
