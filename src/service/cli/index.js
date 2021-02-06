"use strict";

const filldb = require(`./commands/filldb`);
const help = require(`./commands/help`);
const version = require(`./commands/version`);
const server = require(`./commands/server`);

const Cli = {
  [filldb.name]: filldb,
  [help.name]: help,
  [version.name]: version,
  [server.name]: server,
};

module.exports = {
  Cli,
};
