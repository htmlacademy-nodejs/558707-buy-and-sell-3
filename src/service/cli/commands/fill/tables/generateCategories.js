'use strict';

const {createArray} = require(`../utils`);
const {CATEGORIES} = require(`../constants`);

const generateCategories = () => createArray(CATEGORIES.length).map((el, i) => ({
    id: ++i,
    name: CATEGORIES[i],
}));

module.exports = generateCategories;
