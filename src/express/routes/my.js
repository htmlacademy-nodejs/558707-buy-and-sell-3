"use strict";

const {Router} = require(`express`);

const {getMy, getMyComments} = require(`../controllers/my`);

const myRouter = new Router();

myRouter.get(`/`, getMy);
myRouter.get(`/comments`, getMyComments);

module.exports = myRouter;
