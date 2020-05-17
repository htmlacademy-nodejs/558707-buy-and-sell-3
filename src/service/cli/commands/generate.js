'use strict';

const nanoid = require(`nanoid`);
const {writeFile, readFile} = require(`fs`).promises;

const {getRandomInt, shuffle, logger} = require(`../../../utils`);
const {ExitCode, Command, FILE_NAME} = require(`../../../constants`);

const OffersCount = {
  DEFAULT: 1,
  MAX: 1000,
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const FilePath = {
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
  CATEGORIES: `./data/categories.txt`,
  COMMENTS: `./data/comments.txt`,
};

const readContent = async (path) => {
  try {
    const content = await readFile(path, `utf-8`);
    return content.replace(/\r/g, ``).split(`\n`).slice(0, -1);
  } catch (err) {
    logger.showError(err);
    return [];
  }
};

const getPictureFileName = (number) => `item${`${number}`.padStart(2, `0`)}.jpg`;

const generateOffers = (count, titles, sentences, categories, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid.nanoid(5),
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    description: shuffle(sentences).slice(1, 5).join(` `),
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
    comments: Array(getRandomInt(1, 3)).fill({}).map(() => ({
      id: nanoid.nanoid(5),
      text: shuffle(comments).slice(1, 3).join(` `),
    })),
  }))
);

module.exports = {
  name: Command.GENERATE,
  async run(count) {
    const sentences = await readContent(FilePath.SENTENCES);
    const titles = await readContent(FilePath.TITLES);
    const categories = await readContent(FilePath.CATEGORIES);
    const comments = await readContent(FilePath.COMMENTS);

    const formattedCount = parseInt(count, 10) || OffersCount.DEFAULT;

    if (formattedCount > OffersCount.MAX) {
      logger.showError(`Не больше ${OffersCount.MAX} объявлений`);
      process.exit(ExitCode.ERROR);
    }

    const content = JSON.stringify(generateOffers(formattedCount, titles, sentences, categories, comments));

    try {
      await writeFile(FILE_NAME, content);
      logger.showSuccess(`Operation success. File created.`);
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      logger.showError(`Can't write data to file...`);
      process.exit(ExitCode.ERROR);
    }
  }
};
