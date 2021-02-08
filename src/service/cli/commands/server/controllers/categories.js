"use strict";

const handlers = require(`../utils`);
const pinoLogger = require(`../../../../../pino-logger`);
const {HttpCode} = require(`../../../../../constants`);

const getIndex = (sequelize) => (async (req, res) => {
  try {
    const categories = await sequelize.models.Category.findAll({raw: true});
    res.status(HttpCode.OK).json(categories);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
    pinoLogger.error(`Error: ${err.message}`);
  }
});

module.exports = getIndex;
