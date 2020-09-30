'use strict';

const {createArray} = require(`../utils`);

const generateUsersOffers = () => (
    () => createArray(USERS_COUNT).map((el, i) => ({
        userId: users[getRandomInt(0, users.length - 1)].id,
        offerId: offers[i].id,
    }))
);

module.exports = generateUsersOffers;
