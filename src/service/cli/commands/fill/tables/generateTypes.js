'use strict';

const {createArray} = require(`../utils`);
const {TYPES} = require(`../constants`);

const generateTypes = () => createArray(TYPES.length).map((el, i) => ({
    id: ++i,
    name: TYPES[i],
}));

module.exports = generateTypes;
