"use strict";

const {Router} = require(`express`);

module.exports = (sequelize) => {
    const getIndex = require(`../controllers/search`)(sequelize);

    const searchRouter = new Router();
    
    searchRouter.get(`/`, getIndex);

    return searchRouter;
};
