'use strict';

const {createArray} = require(`../utils`);

const USERS_COUNT = 2;

const generateUsers = (faker) => (
    () => createArray(USERS_COUNT).map((el, i) => ({
        id: ++i,
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        avatar: faker.image.avatar(),
    }))
);

module.exports = generateUsers;
