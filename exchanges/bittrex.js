const https = require('https');

function BITTREX() {
    this.bid = 0;
    this.ask = 0;
    this.last = 0;
    this.volume = 0;
    this.name = 'Bittrex';
    this.idx = 1;
    this.updated = new Date(2000, 1, 1);
    this.fee = 0.25;
    this.sell_make = 0;
    this.sell_take = 0;
    this.buy_make = 0;
    this.buy_take = 0;
    this.timeout = 6000;
    try {
        this.update();
    } catch (e) {
        console.log(e);
        setTimeout(this.update.bind(this), this.timeout);
    }
}

BITTREX.prototype.update = function() {
    var self = this;
    var options = {
        host: 'bittrex.com',
        path: '/api/v1.1/public/getmarketsummary?market=usdt-btc',
        port: 443,
        method: 'GET'
    };

    callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function(chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function() {
            var data = JSON.parse(str);
            self.bid = data.result[0].Bid;
            self.ask = data.result[0].Ask;
            self.last = data.result[0].Last;
            self.volume = data.result[0].Volume;
	          self.buy_make = ((self.bid + 0.01) * 1.0025 - self.idx) / self.idx * 100;
            self.sell_make = ((self.ask - 0.01) / 1.0025 - self.idx) / self.idx * 100;
            self.buy_take = (self.ask * 1.0025 - self.idx) / self.idx * 100;
            self.sell_take = (self.bid / 1.0025 - self.idx) / self.idx * 100;
            self.updated = new Date();
        });
    }

    https.request(options, callback).end();

    setTimeout(function() {
        self.update();
    }, self.timeout);
};

module.exports = BITTREX;
