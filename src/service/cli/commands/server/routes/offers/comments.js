"use strict";

const {Router} = require(`express`);

const {getComments,
  deleteComment,
  postComment} = require(`../../controllers/comments`);

const commentsRouter = new Router();

commentsRouter.get(`/:offerId/comments`, getComments);

commentsRouter.post(`/:offerId/comments`, postComment);

commentsRouter.delete(`/:offerId/comments/:commentId`, deleteComment);

module.exports = commentsRouter;
