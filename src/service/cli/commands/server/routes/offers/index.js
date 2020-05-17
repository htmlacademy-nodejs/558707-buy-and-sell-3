"use strict";

const {Router} = require(`express`);

const {getOffers,
  getOffer,
  postOffer,
  putOffer,
  deleteOffer} = require(`../../controllers/offers`);

const commentsRoute = require(`./comments`);

const offersRouter = new Router();

offersRouter.use(`/`, commentsRoute);

offersRouter.get(`/`, getOffers);

offersRouter.get(`/:offerId`, getOffer);

offersRouter.post(`/`, postOffer);

offersRouter.put(`/:offerId`, putOffer);

offersRouter.delete(`/:offerId`, deleteOffer);

module.exports = offersRouter;
