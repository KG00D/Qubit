'use strict';
require('dotenv').config();
const db = require('../db/models');
const axios = require('axios');

const apiKey = 'bXSJUxjypggininnkMAGgNsf2utFs2YU';
const url = `https://api.polygon.io/v2/snapshot/locale/global/markets/crypto/tickers?apiKey=${apiKey}

`
const fetchAllTickersData = async () => {
    try {
        const response = await axios.get(url);
        if (response.data && response.data.tickers) {
            console.log(`Fetched data for all tickers.`);
            return response.data.tickers;
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return [];
    }
};

const updateStockPrices = async () => { 
    const tickersData = await fetchAllTickersData();
    if (tickersData.length > 0) {
        for (const tickerData of tickersData) {

            const { ticker, todaysChange, todaysChangePerc, day, min, prevDay } = tickerData;

            try {
                const insertData = {
                    ticker: ticker, 
                    todaysChangePerc: todaysChangePerc,
                    todaysChange: todaysChange,
                    updated: tickerData.updated, 
                    openingPrice: day?.o,
                    highPrice: day?.h,
                    lowPrice: day?.l,
                    closingPrice: day?.c,
                    volume: day?.v,
                    volumeWeighted: day?.vw,
                    minVolume: min?.v,
                    minNumberOfTrades: min?.n,
                    minOpeningPrice: min?.o,
                    minHighPrice: min?.h,
                    minLowPrice: min?.l,
                    minClosingPrice: min?.c,
                    minVolumeWeighted: min?.vw,
                    prevOpeningPrice: prevDay?.o,
                    prevHighPrice: prevDay?.h,
                    prevLowPrice: prevDay?.l,
                    prevClosingPrice: prevDay?.c,
                    prevVolume: prevDay?.v,
                    prevVolumeWeighted: prevDay?.vw,
                };
                await db.StockPrice.create(insertData);
                console.log(`Inserted new ticker entry for ${ticker}.`);
            } catch (dbError) {
                console.error(`Error inserting ticker ${ticker}:`, dbError.message);
            }
        }
    } else {
        console.log('No ticker data fetched. No new tickers were inserted.');
    }
};

updateStockPrices(); 
