// services/fetchService.js
const fetch = require('node-fetch');
const { tiingoApiKey, newsApiKey } = require('../config/config');

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getTiingoData = (url) => {
    // const url = `https://api.tiingo.com/tiingo/${endpoint}&token=${tiingoApiKey}`;
    return fetchData(url);
};

const getNewsData = (url) => {
    // const url = `https://newsapi.org/v2/everything?apiKey=${newsApiKey}&q=${query}`;
    return fetchData(url);
};

module.exports = {
    getTiingoData,
    getNewsData
};
