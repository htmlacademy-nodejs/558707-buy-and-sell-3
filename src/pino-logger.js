"use strict";

const fs = require(`fs`);
const pino = require(`pino`);
const {resolve} = require(`path`);
const multistream = require(`pino-multi-stream`).multistream;

const serviceDirPath = resolve(__dirname, `service`);
const logsDirPath = resolve(serviceDirPath, `logs`);

if (!fs.existsSync(logsDirPath)) {
  fs.mkdirSync(logsDirPath);
}

const logsFilePath = resolve(logsDirPath, `logs.log`);
const options = {
  name: `pino-logger`,
  level: process.env.LOG_LEVEL || `info`,
};
const streams = [
  {
    stream: fs.createWriteStream(logsFilePath)
  },
  {
    stream: pino.destination(1)
  },
];

const pinoLogger = pino(options, multistream(streams));

module.exports = pinoLogger;
