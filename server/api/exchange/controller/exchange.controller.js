let express = require('express')
let ExchangeController = express.Router()
let exchangeService = require('../../../core/exchange/service/exchange.service');
ExchangeController.route('/')
        .get(exchangeService.getRates);

module.exports = ExchangeController;