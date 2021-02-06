'use strict';

const {getRandomInt} = require(`../../../../../utils`);

const generateUsersOffers = (usersCount, offersCount) => Array(offersCount).fill({}).map((el, i) => ({
    UserId: getRandomInt(1, usersCount),
    OfferId: i + 1,
}));

module.exports = generateUsersOffers;
