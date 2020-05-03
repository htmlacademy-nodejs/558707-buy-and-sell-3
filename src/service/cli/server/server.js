"use strict";

const express = require(`express`);

const {HttpCode, ApiRouteName} = require(`../../../constants`);

const offersRoutes = require(`./routes/offers`);
const categoriesRoutes = require(`./routes/categories`);
const searchRoutes = require(`./routes/search`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(ApiRouteName.OFFERS, offersRoutes);
app.use(ApiRouteName.CATEGORIES, categoriesRoutes);
app.use(ApiRouteName.SEARCH, searchRoutes);

app.use((req, res) => res
    .status(HttpCode.NOT_FOUND)
    .send(`Not found`));

module.exports = app;
