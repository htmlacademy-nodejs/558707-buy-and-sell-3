"use strict";

const request = require(`supertest`);

const server = require(`../server`);
const {HttpCode, ApiRouteName} = require(`../../../../constants`);

describe(`Search`, () => {
    test(`When get '${ApiRouteName.CATEGORIES}' status code should be ${HttpCode.OK}`, async () => {
        const res = await request(server).get(ApiRouteName.SEARCH);
        expect(res.statusCode).toBe(HttpCode.OK);
    });
});
