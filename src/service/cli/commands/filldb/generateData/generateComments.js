'use strict';

const {getRandomInt} = require(`../../../../../utils`);

const CommentsCount = {
    MIN: 3,
    MAX: 5,
};

const generateComments = (commentsData, offersCount, usersCount) => {
    const comments = [];

    while (offersCount > 0) {
        Array(getRandomInt(CommentsCount.MIN, CommentsCount.MAX)).fill().forEach(() => comments.push({
            text: commentsData[getRandomInt(0, commentsData.length - 1)],
            offerId: offersCount,
            userId: getRandomInt(1, usersCount),
        }));
        
        --offersCount;
    }

    return comments;
};

module.exports = generateComments;
