'use strict';
const db = require('../db/models'); 
const axios = require('axios');

const apiKey = process.env.POLYGON_API_KEY;
// const apiKey = 'bXSJUxjypggininnkMAGgNsf2utFs2YU';
const ticker = 'AAPL';
const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${apiKey}`;

const fetchClosePrice = async () => {
    try {
        const response = await axios.get(url);
        if (response.data && response.data.results && response.data.results.length > 0) {
            const closePrice = response.data.results[0].c;
            console.log(`Close price for ${ticker}: $${closePrice}`);
            return closePrice;
        }
    } catch (error) {
        console.error('Error fetching close price:', error.message);
        return null;
    }
};

const updateCurrentValue = async () => {
    const closePrice = await fetchClosePrice();
    if (closePrice !== null) {
        try {
            const holdingsToUpdate = await db.accountHolding.findOne({
                where: { securityName: ticker }
            });

            if (holdingsToUpdate.length === 0) {
                console.log('No holdings found to update.');
                return;
            }

            for (let holding of holdingsToUpdate) {
                const currentValue = holding.quantity * closePrice;
                await holding.update({ currentValue });
                console.log(`Updated holding ${holding.id} with current value: $${currentValue}`);
            }
        } catch (dbError) {
            console.error('Error updating holdings:', dbError.message);
        }
    } else {
        console.log('Could not fetch close price. Holdings not updated.');
    }
};

updateCurrentValue();

