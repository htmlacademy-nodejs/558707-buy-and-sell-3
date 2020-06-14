"use strict";

const axios = require(`../../axios`);
const {HttpCode, API_URL, ApiRouteName} = require(`../../constants`);

const getIndex = async (req, res) => {
    try {
        const apiResponseOffers = await axios.get(API_URL + ApiRouteName.OFFERS);
        const offers = JSON.parse(apiResponseOffers.data);

        res.status(HttpCode.OK).render(`my-tickets`, {
            offers,
        });
    } catch(err) {
        res.status(HttpCode.BAD_REQUEST).send(err.message);
    }
};

const getIndexComments = async (req, res) => {
    try {
        const apiResponseOffers = await axios.get(API_URL + ApiRouteName.OFFERS);
        const offers = JSON.parse(apiResponseOffers.data).slice(0, 3);

        res.status(HttpCode.OK).render(`comments`, {
            offers,
        });
    } catch(err) {
        res.status(HttpCode.BAD_REQUEST).send(err.message);
    }
};

module.exports = {
    getIndex,
    getIndexComments,
};
