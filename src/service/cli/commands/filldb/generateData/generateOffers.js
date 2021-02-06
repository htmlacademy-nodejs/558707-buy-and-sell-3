'use strict';

const {getRandomInt} = require(`../../../../../utils`);

const Prices = {
    MIN: 1000,
    MAX: 100000,
};

const PICTURES_COUNT = 16;

const generateOffers = (count, titles, announces, sentences, types) => {

    return Array(count).fill({}).map((el, i) => ({
        title: titles[getRandomInt(0, titles.length - 1)],
        announce: announces[i % announces.length],
        description: sentences[i % sentences.length],
        price: getRandomInt(Prices.MIN, Prices.MAX),
        picture: `/img/item${i % PICTURES_COUNT + 1 ? `${i % PICTURES_COUNT + 1}`.padStart(2, `0`) : ``}.jpg`,
        typeId: getRandomInt(1, types.length),
    }));
};

module.exports = generateOffers;
