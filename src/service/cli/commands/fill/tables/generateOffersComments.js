'use strict';

const {createArray} = require(`../utils`);

const generateOffersComments = () => (
    () => createArray(USERS_COUNT).map((el, i) => ({
        offerId: offers[getRandomInt(0, offers.length - 1)].id,
        commentId: comments[i].id,
    }))
);

module.exports = generateOffersComments;
