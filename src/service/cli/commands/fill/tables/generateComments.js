'use strict';

const {createArray} = require(`../utils`);
const {getRandomInt} = require(`../../../../../utils`);

const generateComments = (faker) => (
    () => createArray(users.length * offers.length).map((el, i) => ({
        id: ++i,
        text: faker.lorem.sentences(),
        userId: users[getRandomInt(0, users.length - 1)].id,
    }))
);

module.exports = generateComments;
