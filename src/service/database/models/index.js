"use strict";

const {Model, DataTypes} = require(`sequelize`);

const Aliase = require(`./aliase`);

const createUser = require(`./user`);
const createOffer = require(`./offer`);
const createCategory = require(`./category`);
const createComment = require(`./comment`);
const createType = require(`./type`);

const createModels = (sequelize) => {
    const User = createUser({Model, DataTypes}, sequelize);
    const Offer = createOffer({Model, DataTypes}, sequelize);
    const Category = createCategory({Model, DataTypes}, sequelize);
    const Comment = createComment({Model, DataTypes}, sequelize);
    const Type = createType({Model, DataTypes}, sequelize);

    class UserOffer extends Model {}
    UserOffer.init({}, {sequelize});

    class OfferCategory extends Model {}
    OfferCategory.init({}, {sequelize});

    User.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `userId`});
    User.belongsToMany(Offer, {through: UserOffer, as: Aliase.OFFERS});

    Offer.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `offerId`});
    Offer.belongsToMany(User, {through: UserOffer, as: Aliase.USERS});
    Offer.hasMany(UserOffer, {as: Aliase.USERS_OFFERS});
    Offer.belongsToMany(Category, {through: OfferCategory, as: Aliase.CATEGORIES});
    Offer.belongsTo(Type, {foreignKey: `typeId`});

    Category.belongsToMany(Offer, {through: OfferCategory, as: Aliase.OFFERS});
    Category.hasMany(OfferCategory, {as: Aliase.OFFER_CATEGORIES});

    Comment.belongsTo(User, {foreignKey: `userId`});
    Comment.belongsTo(Offer, {foreignKey: `offerId`});

    Type.hasMany(Offer, {as: Aliase.OFFERS, foreignKey: `typeId`});

    return {User, Offer, Category, Comment, Type, UserOffer, OfferCategory};
};

module.exports = createModels;
