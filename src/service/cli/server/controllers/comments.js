"use strict";

const {join} = require(`path`);

const handlers = require(`../utils`);
const {pinoLogger} = require(`../../../../utils`);
const {FILE_NAME, HttpCode} = require(`../../../../constants`);

const FILE_PATH = join(__dirname, `..`, `..`, `..`, `..`, `..`, FILE_NAME);
const COMMENTS_FIELDS_COUNT = 1;

const getComments = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const offer = handlers.getElementById(fileContent, req.params.offerId);

    res.status(HttpCode.OK).json(offer.comments);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
    pinoLogger.error(`Error: ${err.message}`);
  }
};

const deleteComment = async (req, res) => {
  try {
    const fileContent = await handlers.getContent(FILE_PATH);
    const offer = handlers.getElementById(fileContent, req.params.offerId);
    const comment = handlers.getElementById(offer.comments, req.params.commentId);
    handlers.removeElementFromContent(offer.comments, comment);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.status(HttpCode.OK).send(offer);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
    pinoLogger.error(`Error: ${err.message}`);
  }
};

const postComment = async (req, res) => {
  try {
    handlers.validateBodyRequest(req.body, COMMENTS_FIELDS_COUNT);
    const fileContent = await handlers.getContent(FILE_PATH);
    const offer = handlers.getElementById(fileContent, req.params.offerId);
    offer.comments = [];
    handlers.addElementToContent(offer.comments, req.body);
    await handlers.rewriteContent(FILE_NAME, fileContent);

    res.status(HttpCode.OK).send(offer);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
    pinoLogger.error(`Error: ${err.message}`);
  }
};

module.exports = {
  getComments,
  deleteComment,
  postComment,
};
