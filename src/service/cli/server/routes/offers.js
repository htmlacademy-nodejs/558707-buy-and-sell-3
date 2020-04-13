"use strict";

const {Router} = require(`express`);

const {join} = require(`path`);

const handlers = require(`../utils`);
const {FILE_NAME, HttpCode} = require(`../../../../constants`);

const FILE_PATH = join(__dirname, `..`, `..`, `..`, `..`, `..`, FILE_NAME);
const OFFERS_FIELDS_COUNT = 6;
const COMMENTS_FIELDS_COUNT = 1;

const offersRouter = new Router();

offersRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);

    res.json(fileContent);
  } catch (err) {
    res.sendStatus(HttpCode.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

offersRouter.get(`/:offerId`, async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const offer = handlers.getElementById(fileContent, req.params.offerId);

    res.json(offer);
  } catch (err) {
    res.send(err.message);
  }
});

offersRouter.post(`/`, async (req, res) => {
  try {
    handlers.validateBodyRequest(req.body, OFFERS_FIELDS_COUNT);
    const fileContent = await handlers.getContent(FILE_PATH);
    handlers.addElementToContent(fileContent, req.body);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.sendStatus(HttpCode.OK);
  } catch (err) {
    res.send(err.message);
  }
});

offersRouter.put(`/:offerId`, async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const offer = handlers.getElementById(fileContent, req.params.offerId);
    handlers.updateElementContent(offer, req.body);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.sendStatus(HttpCode.OK);
  } catch (err) {
    res.send(err.message);
  }
});

offersRouter.delete(`/:offerId`, async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const offer = handlers.getElementById(fileContent, req.params.offerId);
    handlers.removeElementFromContent(fileContent, offer);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.sendStatus(HttpCode.OK);
  } catch (err) {
    res.send(err.message);
  }
});

offersRouter.get(`/:offerId/comments`, async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const offer = handlers.getElementById(fileContent, req.params.offerId);

    res.json(offer.comments);
  } catch (err) {
    res.send(err.message);
  }
});

offersRouter.delete(`/:offerId/comments/:commentId`, async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const offer = handlers.getElementById(fileContent, req.params.offerId);
    const comment = handlers.getElementById(offer.comments, req.params.commentId);
    handlers.removeElementFromContent(offer.comments, comment);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.sendStatus(HttpCode.OK);
  } catch (err) {
    res.send(err.message);
  }
});

offersRouter.post(`/:offerId/comments/`, async (req, res) => {
  try {
    handlers.validateBodyRequest(req.body, COMMENTS_FIELDS_COUNT);
    const fileContent = await handlers.getContent(FILE_PATH);
    const offer = handlers.getElementById(fileContent, req.params.offerId);
    handlers.addElementToContent(offer.comments, req.body);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.sendStatus(HttpCode.OK);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = offersRouter;
