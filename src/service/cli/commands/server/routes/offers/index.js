"use strict";

const {Router} = require(`express`);

module.exports = (sequelize) => {
  const {getOffers,
    getOffer,
    postOffer,
    putOffer,
    deleteOffer} = require(`../../controllers/offers`)(sequelize);

  const commentsRoute = require(`./comments`)(sequelize);
  
  const offersRouter = new Router();
  
  offersRouter.use(`/`, commentsRoute);
  
  offersRouter.get(`/`, getOffers);
  
  offersRouter.get(`/:offerId`, getOffer);
  
  offersRouter.post(`/`, postOffer);
  
  offersRouter.put(`/:offerId`, putOffer);
  
  offersRouter.delete(`/:offerId`, deleteOffer);

  return offersRouter;
};
