"use strict";

const api = require(`../api`);
const pinoLogger = require(`../../../../../pino-logger`);
const {HttpCode} = require(`../../../../../constants`);

module.exports = (sequelize) => {
  const getOffers = async (req, res) => {
    try {
      const offers = await api.getOffers(sequelize);
      res.status(HttpCode.OK).json(offers);
    } catch (err) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err.message);
      pinoLogger.error(`Error: ${err.message}`);
    }
  };
  
  const getOffer = async (req, res) => {
    try {
      const offer = await api.getOffer(sequelize, req.params.offerId);
      res.status(HttpCode.OK).json(offer);
    } catch (err) {
      res.status(HttpCode.BAD_REQUEST).send(err.message);
      pinoLogger.error(`Error: ${err.message}`);
    }
  };
  
  const postOffer = async (req, res) => {
    try {
      await api.postOffer(sequelize, req.body);
      res.status(HttpCode.OK).send(req.body);
    } catch (err) {
      res.status(HttpCode.BAD_REQUEST).send(err.message);
      pinoLogger.error(`Error: ${err.message}`);
    }
  };
  
  const putOffer = async (req, res) => {
    try {
      await api.putOffer(sequelize, req.body, req.params.offerId);
      res.status(HttpCode.OK).send(req.body);
    } catch (err) {
      res.status(HttpCode.BAD_REQUEST).send(err.message);
      pinoLogger.error(`Error: ${err.message}`);
    }
  };
  
  const deleteOffer = async (req, res) => {
    try {
      await api.deleteOffer(sequelize, req.params.offerId);
      res.status(HttpCode.OK).send(req.body);
    } catch (err) {
      res.status(HttpCode.BAD_REQUEST).send(err.message);
      pinoLogger.error(`Error: ${err.message}`);
    }
  };

  return {
    getOffers,
    getOffer,
    postOffer,
    putOffer,
    deleteOffer,
  };
};
