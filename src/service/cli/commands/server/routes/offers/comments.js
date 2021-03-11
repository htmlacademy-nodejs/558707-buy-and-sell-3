"use strict";

const {Router} = require(`express`);

module.exports = (sequelize) => {
  const {getComments,
    deleteComment,
    postComment} = require(`../../controllers/comments`)(sequelize);
  
  const commentsRouter = new Router();
  
  commentsRouter.get(`/:offerId/comments`, getComments);
  
  commentsRouter.post(`/:offerId/comments`, postComment);
  
  commentsRouter.delete(`/:offerId/comments/:commentId`, deleteComment);

  return commentsRouter;
};
