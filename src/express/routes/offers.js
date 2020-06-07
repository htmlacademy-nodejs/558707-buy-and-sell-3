"use strict";

const {Router} = require(`express`);

const {getOffersEdit, postOfferAdd} = require(`../controllers/offers`);

const offersRouter = new Router();

offersRouter.get(`/edit/:id`, getOffersEdit);

offersRouter.get(`/category/:id`, (req, res) => res.render(`category`));

offersRouter.get(`/add`, (req, res) => res.render(`new-ticket`));

offersRouter.post(`/add`, postOfferAdd);

offersRouter.get(`/:id`, (req, res) => res.render(`ticket`));

module.exports = offersRouter;
