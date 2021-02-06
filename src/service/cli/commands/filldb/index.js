'use strict';

require(`dotenv`).config();

const Sequelize = require(`sequelize`);
const {readFile} = require(`fs`).promises;

const createModels = require(`../../../database/models`);
const {generateUsers, generateOffers, generateTypes, generateCategories, generateComments, generateUsersOffers, generateOffersCategories} = require(`./generateData`);
const pinoLogger = require(`../../../../pino-logger`);
const {ExitCode, Command} = require(`../../../../constants`);

const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME} = process.env;

const FilePath = {
  SENTENCES: `./data/sentences.txt`,
  ANNOUNCES: `./data/announces.txt`,
  TITLES: `./data/titles.txt`,
  CATEGORIES: `./data/categories.txt`,
  COMMENTS: `./data/comments.txt`,
  NAMES: `./data/names.txt`,
  TYPES: `./data/types.txt`,
};

const MIN_OFFERS_COUNT = 10;

const readContent = async (path) => {
  try {
    const content = await readFile(path, `utf-8`);
    return content.replace(/\r/g, ``).split(`\n`).slice(0, -1);
  } catch (err) {
    pinoLogger.error(err);
    return [];
  }
};

module.exports = {
  name: Command.FILLDB,
  async run(count) {
    const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
    const formattedCount = parseInt(count, 10) || MIN_OFFERS_COUNT;

    try {
      pinoLogger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
      pinoLogger.info(`Connection is successful`);
      const {User, Offer, Category, Comment, Type, UserOffer, OfferCategory} = createModels(sequelize);
      await sequelize.sync({force: true});

      const sentences = await readContent(FilePath.SENTENCES);
      const announces = await readContent(FilePath.ANNOUNCES);
      const titles = await readContent(FilePath.TITLES);
      const categories = await readContent(FilePath.CATEGORIES);
      const comments = await readContent(FilePath.COMMENTS);
      const names = await readContent(FilePath.NAMES);
      const types = await readContent(FilePath.TYPES);

      const userModels = await User.bulkCreate(generateUsers(names));
      const typeModels = await Type.bulkCreate(generateTypes(types));
      const offerModels = await Offer.bulkCreate(generateOffers(formattedCount, titles, announces, sentences, types));
      const categoryModels = await Category.bulkCreate(generateCategories(categories));
      const commentModels = await Comment.bulkCreate(generateComments(comments, formattedCount, names.length));
      const userOfferModels = await UserOffer.bulkCreate(generateUsersOffers(names.length, formattedCount));
      const offerCategoryModels = await OfferCategory.bulkCreate(generateOffersCategories(categories, formattedCount));

      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      pinoLogger.error(`An error occured: ${err.message}`);
      process.exit(ExitCode.ERROR);
    }
  }
};
