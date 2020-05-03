"use strict";

const {join} = require(`path`);

const handlers = require(`../utils`);
const {FILE_NAME, HttpCode} = require(`../../../../constants`);

const FILE_PATH = join(__dirname, `..`, `..`, `..`, `..`, `..`, FILE_NAME);
const OFFERS_FIELDS_COUNT = 6;

const getOffers = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH, false);

    res.status(HttpCode.OK).json(fileContent);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

const getOffer = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const offer = handlers.getElementById(fileContent, req.params.offerId);

    res.json(offer);
  } catch (err) {
    res.send(err.message);
  }
};

const postOffer = async (req, res) => {
  try {
    handlers.validateBodyRequest(req.body, OFFERS_FIELDS_COUNT);
    const fileContent = await handlers.getContent(FILE_PATH);
    handlers.addElementToContent(fileContent, req.body);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.status(HttpCode.OK).send(req.body);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
  }
};

const putOffer = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const offer = handlers.getElementById(fileContent, req.params.offerId);
    handlers.updateElementContent(offer, req.body);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.status(HttpCode.OK).send(req.body);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
  }
};

const deleteOffer = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const offer = handlers.getElementById(fileContent, req.params.offerId);
    handlers.removeElementFromContent(fileContent, offer);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.status(HttpCode.OK).send(req.body);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
  }
};

module.exports = {
  getOffers,
  getOffer,
  postOffer,
  putOffer,
  deleteOffer,
};
