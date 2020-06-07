"use strict";

const axios = require(`../../axios`);
const {HttpCode, API_URL, ApiRouteName} = require(`../../constants`);

const getOffersEdit = async (req, res) => {
    try {
        const apiResponseOffer = await axios.get(`${API_URL}${ApiRouteName.OFFERS}/${req.params.id}`);
        const offer = apiResponseOffer.data;
        const apiResponseCategories = await axios.get(API_URL + ApiRouteName.CATEGORIES);
        const categories = apiResponseCategories.data;

        res.status(HttpCode.OK).render(`ticket-edit`, {
            offer,
            categories
        });
    } catch(err) {
        res.status(HttpCode.BAD_REQUEST).send(err.message);
    }
};

const postOfferAdd = async (req, res) => {
    try {
        console.log(req.body);
    } catch(err) {
        res.status(HttpCode.BAD_REQUEST).send(err.message);
    }
};

module.exports = {
    getOffersEdit,
    postOfferAdd,
};
