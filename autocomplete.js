// routes/autocomplete.js
const express = require('express');
const router = express.Router();
const { getTiingoData } = require('../services/fetchService');

router.get('/', async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const urlAutocomplete = 'https://api.tiingo.com/tiingo/utilities/search?query='+keyword+'&token=dba09041d3f74d6661a2e620087813c35682f331'

        const data = await getTiingoData(urlAutocomplete);
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching autocomplete data');
    }
});

module.exports = router;
