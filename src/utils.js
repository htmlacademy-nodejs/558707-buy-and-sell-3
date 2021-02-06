'use strict';

const chalk = require(`chalk`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getRandomSubarray = (items) => {
  items = items.slice();
  let count = getRandomInt(1, items.length - 1);
  const result = [];
  while (count--) {
    result.push(
        ...items.splice(
            getRandomInt(0, items.length - 1), 1
        )
    );
  }
  return result;
};

const logger = {
  showError: (msg) => console.error(chalk.red(msg)),
  showSuccess: (msg) => console.info(chalk.green(msg)),
  showHelp: (msg) => console.info(chalk.grey(msg)),
  showVersion: (msg) => console.info(chalk.blue(msg)),
};

module.exports = {
  getRandomInt,
  shuffle,
  getRandomSubarray,
  logger,
};
