"use strict";

const request = require(`supertest`);

const server = require(`../../server`);
const {HttpCode, ApiRouteName} = require(`../../../../../../constants`);

let mockOffer;
let mockComment;

beforeEach(() => {
  mockOffer = {
    title: `Mock offer`,
    picture: `Mock offer 1`,
    description: `Mock offer 2`,
    type: `Mock offer 3`,
    sum: `Mock offer 4`,
    category: [`Mock offer 5`],
  };

  mockComment = {
    text: `Mock comment`
  };
});

describe(`Comments`, () => {
  describe(`GET`, () => {
    test(`When get 'comments' status code should be 200`, async () => {
      const res = await request(server)
                .post(ApiRouteName.OFFERS)
                .send(mockOffer);

      const id = res.body.id;
      const offerResponse = await request(server)
                .get(`${ApiRouteName.OFFERS}/${id}/comments`);

      expect(offerResponse.statusCode).toBe(HttpCode.OK);
    });
  });

  describe(`POST`, () => {
    test(`When post 'comments' status code should be 200`, async () => {
      const res = await request(server)
                .post(ApiRouteName.OFFERS)
                .send(mockOffer);

      const id = res.body.id;

      const commentsResponse = await request(server)
                .post(`${ApiRouteName.OFFERS}/${id}/comments`)
                .send(mockComment);

      expect(commentsResponse.statusCode).toBe(HttpCode.OK);
    });

    test(`Offer should retrieve comment with text 'Mock comment'`, async () => {
      const res = await request(server)
                .post(ApiRouteName.OFFERS)
                .send(mockOffer);

      const id = res.body.id;

      const commentsResponse = await request(server)
                .post(`${ApiRouteName.OFFERS}/${id}/comments`)
                .send(mockComment);

      expect(commentsResponse.body.comments[0].text).toBe(mockComment.text);
    });
  });

  describe(`DELETE`, () => {
    test(`When delete 'comment' status code should be 200`, async () => {
      const res = await request(server)
                .post(ApiRouteName.OFFERS)
                .send(mockOffer);

      const id = res.body.id;

      const commentsResponse = await request(server)
                .post(`${ApiRouteName.OFFERS}/${id}/comments`)
                .send(mockComment);

      const deleteComment = await request(server)
                .delete(`${ApiRouteName.OFFERS}/${id}/comments/${commentsResponse.body.comments[0].id}`);

      expect(deleteComment.statusCode).toBe(HttpCode.OK);
    });
  });
});
