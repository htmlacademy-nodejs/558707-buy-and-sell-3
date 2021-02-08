"use strict";

const Sequelize = require(`sequelize`);

const createModels = require(`./models`);
const pinoLogger = require(`../../pino-logger`);

const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
const models = createModels(sequelize);

const connect = async () => {
  pinoLogger.info(`Connection started`);

  try {
    await sequelize.authenticate();
    pinoLogger.info(`Connection is successful`);
  } catch (err) {
    pinoLogger.error(`Error: ${err}`);
  }
};

module.exports = {
  connect,
  sequelize,
};
