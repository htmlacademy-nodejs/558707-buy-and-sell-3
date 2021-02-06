'use strict';

const generateUsers = require(`./generateUsers`);
const generateOffers = require(`./generateOffers`);
const generateTypes = require(`./generateTypes`);
const generateCategories = require(`./generateCategories`);
const generateComments = require(`./generateComments`);
const generateUsersOffers = require(`./generateUsersOffers`);
const generateOffersCategories = require(`./generateOffersCategories`);

module.exports = {
    generateUsers,
    generateOffers,
    generateTypes,
    generateCategories,
    generateComments,
    generateUsersOffers,
    generateOffersCategories,
};
