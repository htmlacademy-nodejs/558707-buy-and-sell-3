"use strict";

const {Router} = require(`express`);

const {readFile} = require(`fs`).promises;
const {join} = require(`path`);

const {FILE_NAME, HttpCode} = require(`../../../../constants`);

const EMPTY_FILE_MESSAGE = [];

const offersRouter = new Router();

offersRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await readFile(join(__dirname, `..`, `..`, `..`, `..`, `..`, FILE_NAME), `utf-8`);

    res.json(fileContent || EMPTY_FILE_MESSAGE);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

module.exports = offersRouter;
