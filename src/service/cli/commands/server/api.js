"use strict";

const {Op} = require(`sequelize`);

const getCategories = (sequelize) => sequelize.models.Category.findAll({raw: true});

const getSearch = (req, sequelize) => sequelize.models.Offer.findAll({
    where: {
      title: {
        [Op.substring]: decodeURI(req.query.query).toLowerCase()
      }
    },
  });

const getOffers = (sequelize) => sequelize.models.Offer.findAll({raw: true});

const getOffer = (sequelize, offerId) => sequelize.models.Offer.findByPk(offerId);

const postOffer = async (sequelize, offerData) => {
    const offer = await sequelize.models.Offer.create(offerData);
    await offer.addCategories(offerData.categories);
    return offer.get();
};

const putOffer = (sequelize, offerData, offerId) => sequelize.models.Offer.update(offerData, {where: {offerId}});

const deleteOffer = (sequelize, offerId) => sequelize.models.Offer.destroy({where: {offerId}});

const getComments = (sequelize, offerId) => sequelize.models.Comment.findAll({where: {offerId}, raw: true});

const deleteComment = async (sequelize, commentId) => {
    const deletedRows = await sequelize.models.Comment.delete({
      where: {commentId}
    });
    return !!deletedRows;
};

const postComment = (sequelize, offerId, commentData) => sequelize.models.Comment.create({offerId, ...commentData});

module.exports = {
    getCategories,
    getSearch,
    getOffers,
    getOffer,
    postOffer,
    putOffer,
    deleteOffer,
    getComments,
    deleteComment,
    postComment,
};