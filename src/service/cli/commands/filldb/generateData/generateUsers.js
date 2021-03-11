'use strict';

const faker = require(`faker`);

const AVATARS_COUNT = 5;

const generateUsers = (names) => names.map((item, i) => (
    {
        name: item, 
        email: faker.internet.email(), 
        password: faker.internet.password(), 
        avatar: `/img/avatar${i % AVATARS_COUNT ? `${i % AVATARS_COUNT}`.padStart(2, `0`) : ``}.jpg`,
    }
    ));

module.exports = generateUsers;
