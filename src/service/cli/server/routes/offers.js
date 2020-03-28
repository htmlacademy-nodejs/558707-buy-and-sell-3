"use strict";

const {Router} = require(`express`);

const {readFile} = require(`fs`).promises;

const {FILE_NAME} = require(`../../../../constants`);

const NOT_FOUND_MESSAGE = [];

const offersRouter = new Router();

offersRouter.get(`/`, async (req, res) => {
    try {
        const fileContent = await readFile(FILE_NAME);

        res.send(fileContent.toString());
    } catch (err) {
        res.send(NOT_FOUND_MESSAGE);
    }
});

module.exports = offersRouter;
