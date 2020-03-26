"use strict";

const express = require(`express`);

const {join} = require(`path`);

const indexRoutes = require(`./routes/index`);
const registerRoutes = require(`./routes/register`);
const loginRoutes = require(`./routes/login`);
const myRoutes = require(`./routes/my`);
const offersRoutes = require(`./routes/offers`);
const searchRoutes = require(`./routes/search`);

const DEFAULT_PORT = process.env.PORT || 8080;
const PUBLIC_DIR = `public`;

const app = express();


app.use(express.static(PUBLIC_DIR));
app.set(`view engine`, `pug`);
app.set(`views`, join(__dirname, `templates`));

app.use(`/`, indexRoutes);
app.use(`/register`, registerRoutes);
app.use(`/login`, loginRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);
app.use(`/search`, searchRoutes);

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
