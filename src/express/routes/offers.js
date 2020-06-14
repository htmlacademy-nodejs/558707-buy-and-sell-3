"use strict";

const {Router} = require(`express`);
const multer = require(`multer`);

const {getIndexEdit, getIndexAdd, postIndexAdd} = require(`../controllers/offers`);

const offersRouter = new Router();
const upload = multer({ dest: `src/express/public/img` });

offersRouter.get(`/edit/:id`, getIndexEdit);

offersRouter.get(`/category/:id`, (req, res) => res.render(`category`));

offersRouter.get(`/add`, getIndexAdd);

offersRouter.post(`/add`, upload.single(`avatar`), postIndexAdd);

offersRouter.get(`/:id`, (req, res) => res.render(`ticket`));

module.exports = offersRouter;
