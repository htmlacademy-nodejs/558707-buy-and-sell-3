"use strict";

const {Model, DataTypes} = require(`sequelize`);

const {createUserModel, createUserRelations} = require(`./user`);
const {createOfferModel, createOfferRelations} = require(`./offer`);
const {createCategoryModel, createCategoryRelations} = require(`./category`);
const {createCommentModel, createCommentRelations} = require(`./comment`);
const {createTypeModel, createTypeRelations} = require(`./type`);

const createModels = (sequelize) => {
    const User = createUserModel({Model, DataTypes}, sequelize);
    const Offer = createOfferModel({Model, DataTypes}, sequelize);
    const Category = createCategoryModel({Model, DataTypes}, sequelize);
    const Comment = createCommentModel({Model, DataTypes}, sequelize);
    const Type = createTypeModel({Model, DataTypes}, sequelize);

    class UserOffer extends Model {}
    UserOffer.init({}, {sequelize});

    class OfferCategory extends Model {}
    OfferCategory.init({}, {sequelize});

    createUserRelations({User, Comment, Offer, UserOffer});
    createOfferRelations({Offer, Comment, User, UserOffer, Category, Type, OfferCategory});
    createCategoryRelations({Category, Offer, OfferCategory});
    createCommentRelations({Comment, User, Offer});
    createTypeRelations({Type, Offer});

    return {User, Offer, Category, Comment, Type, UserOffer, OfferCategory};
};

module.exports = createModels;
