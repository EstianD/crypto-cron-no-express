const axios = require('axios')
const Crypto = require('../models/crypto')
const dateFormat = require('dateformat');
const customFunction = require('./exchange')

// GET BTC:USD VALUE
const runCron = async () => {

   // DATE FUNCTION
   const timestamp = customFunction.getDateTimestamp()
   console.log(timestamp)

   // KRAKEN PRICE
   const krakenPrice = await customFunction.getKrakenPrice()
   console.log(krakenPrice)

   // BITSTAMP PRICE
   const bitstampPrice = await customFunction.getBitstampPrice()
   console.log(bitstampPrice)

   // LUNO PRICE
   const lunoPriceZar = await customFunction.getLunoPrice()
   console.log(lunoPriceZar)

   const exchangeRates = await customFunction.getExchangeRates()
   console.log(exchangeRates)

   // console.log(exchangeRates)

   const trade = new Crypto({
      timestamp: timestamp,
      exchangeRate: {
         "usd": exchangeRates.usd,
         "eur": exchangeRates.eur
      },
      luno: {
         price: lunoPriceZar,
         symbol: "zar"
      },
      kraken: {
         price: krakenPrice,
         symbol: "eur"
      },
      bitstamp: {
         price: bitstampPrice,
         symbol: "usd"
      }
   })

   console.log(trade)

   // const savedTrade = await trade.save()

   const savedTrade = await trade.save((err, trade) => {
      if (err) return console.error(err);
      console.log("Trade saved to collection.");
    });

   console.log(savedTrade)

   // console.log(savedTrade.toJSON())
}

module.exports = runCron