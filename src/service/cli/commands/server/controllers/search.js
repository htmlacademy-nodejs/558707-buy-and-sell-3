"use strict";

const {Op} = require(`sequelize`);

const pinoLogger = require(`../../../../../pino-logger`);
const {HttpCode} = require(`../../../../../constants`);

const getIndex = (sequelize) => (async (req, res) => {
  try {
    const offers = await sequelize.models.Offer.findAll({
      where: {
        title: {
          [Op.substring]: decodeURI(req.query.query).toLowerCase()
        }
      },
    });

    res.status(HttpCode.OK).json(offers);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
    pinoLogger.error(`Error: ${err.message}`);
  }
});

module.exports = getIndex;
