'use strict';

const faker = require(`faker`);
const {writeFile} = require(`fs`).promises;

const {logger, getRandomInt} = require(`../../../utils`);
const {ExitCode, Command} = require(`../../../constants`);

const FILE_NAME = `fill-db.sql`;
const TYPES = [`buy`, `sell`];
const CATEGORIES = [`Книги`, `Разное`, `Посуда`, `Игры`, `Животные`, `Журналы`, `Учение`, `Природа`];

const createInsertString = (data, dataName) => data.reduce((string, item, i) => `${string}(${Object.values(item).map((value) => typeof value === `string` ? `'${value}'` : value).join(`,`)})${i === data.length - 1 ? `;\n\n` : `,\n`}`, `INSERT INTO ${dataName} VALUES\n`);

const generateFillDb = (offersCount) => {
  const users = Array(getRandomInt(5, 10)).fill({}).map((el, i) => ({
    id: ++i,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    avatar: faker.image.avatar(),
  }));

  const types = Array(TYPES.length).fill({}).map((el, i) => ({
    id: i + 1,
    name: TYPES[i],
  }));

  const offers = Array(offersCount).fill({}).map((el, i) => ({
    id: ++i,
    title: faker.lorem.sentence(),
    announce: faker.lorem.sentences(),
    createdAt: faker.date.past(),
    description: faker.lorem.text(),
    typeId: types[getRandomInt(0, types.length - 1)].id,
    price: faker.commerce.price(),
    picture: faker.image.image(),
  }));

  const categories = Array(CATEGORIES.length).fill({}).map((el, i) => ({
    id: i + 1,
    name: CATEGORIES[i],
  }));

  const comments = Array(users.length * 3).fill({}).map((el, i) => ({
    id: ++i,
    text: faker.lorem.sentences(),
    userId: users[getRandomInt(0, users.length - 1)].id,
  }));

  const usersOffers = Array(offers.length).fill({}).map((el, i) => ({
    userId: users[getRandomInt(0, users.length - 1)].id,
    offerId: offers[i].id,
  }));

  const offersCategories = Array(offers.length * 3).fill({}).map((el, i) => ({
    offerId: offers[i % 3].id,
    categoryId: categories[i % categories.length].id,
  }));

  const offersComments = Array(comments.length).fill({}).map((el, i) => ({
    offerId: offers[getRandomInt(0, offers.length - 1)].id,
    commentId: comments[i].id,
  }));

  const insertUsers = createInsertString(users, `users`);
  const insertTypes = createInsertString(types, `types`);
  const insertOffers = createInsertString(offers, `offers`);
  const insertCategories = createInsertString(categories, `categories`);
  const insertComments = createInsertString(comments, `comments`);
  const insertUsersOffers = createInsertString(usersOffers, `users_offers`);
  const insertOffersCategories = createInsertString(offersCategories, `offers_categories`);
  const insertOffersComments = createInsertString(offersComments, `offers_comments`);

  return insertUsers + insertTypes + insertOffers + insertCategories + insertComments + insertUsersOffers + insertOffersCategories + insertOffersComments;
};

module.exports = {
  name: Command.FILL,
  async run(count) {
    const formattedCount = parseInt(count, 10) || 10;
    const content = generateFillDb(formattedCount);

    try {
      await writeFile(FILE_NAME, content);
      logger.showSuccess(`Operation success. File created.`);
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      logger.showError(`Can't write data to file...`);
      process.exit(ExitCode.ERROR);
    }
  },
};
