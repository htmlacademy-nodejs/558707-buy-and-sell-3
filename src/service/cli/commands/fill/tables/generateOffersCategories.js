'use strict';

const {createArray} = require(`../utils`);

const generateOffersCategories = () => createArray(USERS_COUNT).map((el, i) => ({
    offerId: offers[i % 3].id,
    categoryId: categories[i % categories.length].id,
}));

module.exports = generateOffersCategories;
