"use strict";

const {Router} = require(`express`);

module.exports = (sequelize) => {
    const getIndex = require(`../controllers/categories`)(sequelize);

    const categoriesRouter = new Router();

    categoriesRouter.get(`/`, getIndex);

    return categoriesRouter;
};
