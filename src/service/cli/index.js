"use strict";

const generate = require(`./commands/generate`);
const help = require(`./commands/help`);
const version = require(`./commands/version`);
const server = require(`./commands/server`);
const fill = require(`./commands/fill`);

const Cli = {
  [generate.name]: generate,
  [help.name]: help,
  [version.name]: version,
  [server.name]: server,
  [fill.name]: fill,
};

module.exports = {
  Cli,
};
