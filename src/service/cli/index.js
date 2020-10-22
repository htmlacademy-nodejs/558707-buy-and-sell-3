"use strict";

const generate = require(`./commands/generate`);
const help = require(`./commands/help`);
const version = require(`./commands/version`);
const server = require(`./commands/server`);

const Cli = {
  [generate.name]: generate,
  [help.name]: help,
  [version.name]: version,
  [server.name]: server,
};

module.exports = {
  Cli,
};
