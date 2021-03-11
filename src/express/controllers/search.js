"use strict";

const axios = require(`../../axios`);
const {API_URL, ApiRouteName} = require(`../../constants`);

const getIndex = async (req, res) => {
  try {
    const apiSearchEncodedUri = encodeURI(`${API_URL + ApiRouteName.SEARCH}?query=${req.query.query}`);
    const apiResponseOffer = await axios.get(apiSearchEncodedUri);
    const offers = apiResponseOffer.data;

    res.render(`search-result`, {
      offers,
    });
  } catch (err) {
    res.render(`search-result`);
  }
};

module.exports = {
  getIndex,
};
