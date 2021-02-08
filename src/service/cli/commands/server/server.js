"use strict";

const express = require(`express`);

const {HttpCode, ApiRouteName} = require(`../../../../constants`);
const pinoLogger = require(`../../../../pino-logger`);

module.exports = (sequelize, formattedPort) => {
  const offersRoutes = require(`./routes/offers`);
  const categoriesRoutes = require(`./routes/categories`)(sequelize);
  const searchRoutes = require(`./routes/search`)(sequelize);

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({extended: false}));

  app.use(ApiRouteName.OFFERS, offersRoutes);
  app.use(ApiRouteName.CATEGORIES, categoriesRoutes);
  app.use(ApiRouteName.SEARCH, searchRoutes);

  app.use((req, res, next) => {
    res.status(HttpCode.NOT_FOUND).send(`Not found`);
    pinoLogger.error(`Error: ${res.statusMessage}`);
    next();
  });

  app.use((req, res, next) => {
    pinoLogger.debug(`Start request to url ${req.url}`);
    pinoLogger.info(`End request with status code ${res.statusCode}`);
    next();
  });

  app.listen(formattedPort, () => pinoLogger.info(`Server start on ${formattedPort}`))
        .on(`error`, (err) => pinoLogger.error(`Server can't start. Error: ${err}`));
};
