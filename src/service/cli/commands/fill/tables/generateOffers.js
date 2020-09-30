'use strict';

const {createArray} = require(`../utils`);
const {getRandomInt} = require(`../../../../../utils`);

const OFFERS_COUNT = 5;

const generateOffers = (faker, types) => (
    () => createArray(OFFERS_COUNT).map((el, i) => ({
        id: ++i,
        title: faker.lorem.sentence(),
        announce: faker.lorem.sentences(),
        createdAt: faker.date.past(),
        description: faker.lorem.text(),
        typeId: types[getRandomInt(0, types.length - 1)].id,
        price: faker.commerce.price(),
        picture: faker.image.image(),
    }))
);

module.exports = generateOffers;
