let XBX = require('../../../../exchanges/xbx');
let GDAX = require('../../../../exchanges/gdax');
let GEMINI = require('../../../../exchanges/gemini');
let STAMP = require('../../../../exchanges/stamp');
let KRAKEN = require('../../../../exchanges/kraken');
var FINEX = require('../../../../exchanges/finex');
var BITTREX = require('../../../../exchanges/bittrex');
var BINANCE = require('../../../../exchanges/binance');
let gdax = new GDAX();
let gemini = new GEMINI();
let stamp = new STAMP();
let kraken = new KRAKEN();
let finex = new FINEX();
let bittrex = new BITTREX();
let binance = new BINANCE();
let xbx = new XBX([gemini, gdax, stamp, kraken, finex, bittrex, binance]);


class ExchangeService {
    constructor() { }

    getRates(req, res) {
        res.json({
            markets: [gemini, gdax, stamp, kraken, finex, bittrex, binance],
            idx: xbx.idx,
        });
    }
}

module.exports = new ExchangeService();