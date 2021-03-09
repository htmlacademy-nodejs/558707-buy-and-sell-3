"use strict";

const api = require(`../api`);
const pinoLogger = require(`../../../../../pino-logger`);
const {HttpCode} = require(`../../../../../constants`);

module.exports = (sequelize) => {
  const getComments = async (req, res) => {
    try {
      const comments = await api.getComments(sequelize, req.params.offerId);
      res.status(HttpCode.OK).json(comments);
    } catch (err) {
      res.status(HttpCode.BAD_REQUEST).send(err.message);
      pinoLogger.error(`Error: ${err.message}`);
    }
  };
  
  const deleteComment = async (req, res) => {
    try {
      const deletedRows = await api.deleteComment(sequelize, req.params.commentId);
      res.status(HttpCode.OK).send(deletedRows);
    } catch (err) {
      res.status(HttpCode.BAD_REQUEST).send(err.message);
      pinoLogger.error(`Error: ${err.message}`);
    }
  };
  
  const postComment = async (req, res) => {
    try {
      const comment = await api.postComment(sequelize, req.params.offerId, req.body);
      res.status(HttpCode.OK).send(comment);
    } catch (err) {
      res.status(HttpCode.BAD_REQUEST).send(err.message);
      pinoLogger.error(`Error: ${err.message}`);
    }
  };

  return {
    getComments,
    deleteComment,
    postComment,
  };
};
