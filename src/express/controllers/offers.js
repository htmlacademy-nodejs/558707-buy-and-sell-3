"use strict";

const {unlink, rename} = require(`fs`).promises;
const mime = require(`mime/lite`);

const axios = require(`../../axios`);
const {validateBodyRequest} = require(`../../service/cli/commands/server/utils`);
const {HttpCode, API_URL, ApiRouteName} = require(`../../constants`);

const FIELDS_COUNT = 6;

const getIndexEdit = async (req, res) => {
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

const getIndexAdd = async (req, res) => {
    try {
        const apiResponseCategories = await axios.get(API_URL + ApiRouteName.CATEGORIES);
        const categories = apiResponseCategories.data;

        res.status(HttpCode.OK).render(`new-ticket`, {
            categories
        });
    } catch(err) {
        res.status(HttpCode.BAD_REQUEST).send(err.message);
    }
};

const postIndexAdd = async (req, res) => {
    const offer = req.body;

    try {
        offer.picture = req.file;
        validateBodyRequest(offer, FIELDS_COUNT);

        const {mimetype, size, path, filename} = req.file;
        const allowTypes = [`image/jpeg`, `image/png`];

        if (size === 0 || !allowTypes.includes(mimetype)) {
            delete offer.picture;
            unlink(path);
        }

        const newFilename = `${filename}.${mime.getExtension(mimetype)}`;
        const newPath = path.replace(filename, newFilename);
        offer.picture = newFilename;
        await rename(path, newPath);

        await axios.post(API_URL + ApiRouteName.OFFERS, offer);

        res.redirect(`/my`);
    } catch(err) {
        const apiResponseCategories = await axios.get(API_URL + ApiRouteName.CATEGORIES);
        const categories = apiResponseCategories.data;

        res.render(`new-ticket`, {
            offer,
            categories,
        });
    }
};

module.exports = {
    getIndexEdit,
    getIndexAdd,
    postIndexAdd,
};
