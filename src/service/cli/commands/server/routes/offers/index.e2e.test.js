"use strict";

const request = require(`supertest`);

const server = require(`../../server`);
const {HttpCode, ApiRouteName} = require(`../../../../../../constants`);

let mockOffer;

beforeEach(() => {
  mockOffer = {
    title: `Mock offer`,
    picture: `Mock offer 1`,
    description: `Mock offer 2`,
    type: `Mock offer 3`,
    sum: `Mock offer 4`,
    category: [`Mock offer 5`],
  };
});

describe(`Offers`, () => {
  describe(`GET`, () => {
    test(`When get 'offers' status code should be 200`, async () => {
      const res = await request(server)
                .get(ApiRouteName.OFFERS);

      expect(res.statusCode).toBe(HttpCode.OK);
    });
  });

  describe(`POST`, () => {
    test(`Should retrieve offer with title 'Mock offer'`, async () => {
      const res = await request(server)
               .post(ApiRouteName.OFFERS)
               .send(mockOffer);

      const id = res.body.id;
      const offerResponse = await request(server)
               .get(`${ApiRouteName.OFFERS}/${id}`);

      expect(offerResponse.body.title).toBe(mockOffer.title);
    });

    test(`Should 400 because not all fields exists`, async () => {
      delete mockOffer.picture;

      const res = await request(server)
               .post(ApiRouteName.OFFERS)
               .send(mockOffer);

      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`PUT`, () => {
    test(`Should retrieve offer with title 'Mock offer put'`, async () => {
      const res = await request(server)
                .post(ApiRouteName.OFFERS)
                .send(mockOffer);

      mockOffer.title = `Mock offer put`;

      const id = res.body.id;

      const offerResponse = await request(server)
                .put(`${ApiRouteName.OFFERS}/${id}`)
                .send(mockOffer);

      expect(offerResponse.body.title).toBe(mockOffer.title);
    });

    test(`Should 400 because not all fields exists`, async () => {
      const res = await request(server)
                .post(ApiRouteName.OFFERS)
                .send(mockOffer);

      const id = res.body.id;

      const newMockDescription = {
        description: ``
      };

      const offerResponse = await request(server)
                .put(`${ApiRouteName.OFFERS}/${id}`)
                .send(newMockDescription);

      expect(offerResponse.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`DELETE`, () => {
    test(`When delete 'offer' status code should be 200`, async () => {
      const res = await request(server)
                .post(ApiRouteName.OFFERS)
                .send(mockOffer);

      const id = res.body.id;

      const offerResponse = await request(server)
                .delete(`${ApiRouteName.OFFERS}/${id}`);

      expect(offerResponse.statusCode).toBe(HttpCode.OK);
    });
  });
});
