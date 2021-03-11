'use strict';

const {getRandomSubarray} = require(`../../../../../utils`);

const generateOffersCategories = (categories, offersCount) => {
    const offersCategories = [];

    while (offersCount > 0) {
        const offerCategories = getRandomSubarray(categories);

        Array(offerCategories.length).fill().forEach((el, i) => offersCategories.push({
            OfferId: offersCount,
            CategoryId: i + 1,
        }));
        
        --offersCount;
    }

    return offersCategories;
};

module.exports = generateOffersCategories;
