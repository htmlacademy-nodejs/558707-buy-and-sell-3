"use strict";

const {getCategories} = require(`../api`);
const pinoLogger = require(`../../../../../pino-logger`);
const {HttpCode} = require(`../../../../../constants`);

const getIndex = (sequelize) => (async (req, res) => {
  try {
    const categories = await getCategories(sequelize);
    res.status(HttpCode.OK).json(categories);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
    pinoLogger.error(`Error: ${err.message}`);
  }
});

module.exports = getIndex;
