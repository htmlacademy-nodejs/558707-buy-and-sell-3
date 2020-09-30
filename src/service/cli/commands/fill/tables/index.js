'use strict';

const faker = require(`faker`);

const generateUsers = require(`generateUsers`)(faker);
const generateTypes = require(`generateTypes`);

module.exports = {
    generateUsers,
    generateTypes,
};
