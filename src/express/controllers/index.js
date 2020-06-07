"use strict";

const axios = require(`../../axios`);
const {HttpCode, API_URL, ApiRouteName} = require(`../../constants`);

const getIndex = async (req, res) => {
    try {
        const apiResponseOffers = await axios.get(API_URL + ApiRouteName.OFFERS);
        const offers = JSON.parse(apiResponseOffers.data);
        const apiResponseCategories = await axios.get(API_URL + ApiRouteName.CATEGORIES);
        const categories = apiResponseCategories.data;

        res.status(HttpCode.OK).render(`index`, {
            offers,
            categories,
        });
    } catch(err) {
        res.status(HttpCode.BAD_REQUEST).send(err.message);
    }
}

module.exports = getIndex;
