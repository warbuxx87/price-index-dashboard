const https = require('https');

function Simulations() {
    this.bid = 0;
    this.ask = 0;
    this.last = 0;
    this.volume = 0;
    this.name = 'Simulations';
    this.idx2 = 1;
    this.updated = new Date(2000, 1, 1);
    this.sell_make = "";
    this.sell_take = "";
    this.buy_make = "";
    this.buy_take = "";
    this.timeout = 2000;
    try {
        this.update();
    } catch (e) {
        console.log(e);
        setTimeout(this.update.bind(this), this.timeout);
    }
}

Simulations.prototype.update = function() {
    var self = this;
    var options = {
        host: 'www.binance.com',
        path: '/api/v1/ticker/24hr?symbol=BTCUSDT',
        port: 443,
        method: 'GET'
    };

    callback = function(response) {
        var str = '';
        response.on('data', function(chunk) {
            str += chunk;
        });

        response.on('end', function() {
            var data = JSON.parse(str);
            self.bid = parseFloat(data.bidPrice);
            self.ask = parseFloat(data.askPrice);
            self.last = parseFloat(data.lastPrice);
            self.volume = parseFloat(data.volume);
            self.buy_make = ((self.bid + 0.01) * 1.001 - self.idx2) / self.idx2 * 100;
            self.sell_make = ((self.ask - 0.01) / 1.001 - self.idx2) / self.idx2 * 100;
            self.buy_take = (self.ask * 1.001 - self.idx2) / self.idx2 * 100;
            self.sell_take = (self.bid / 1.001 - self.idx2) / self.idx2 * 100;
            self.updated = new Date();
        });
    }

    https.request(options, callback).end();

    setTimeout(function() {
        self.update();
    }, self.timeout);
};

module.exports = Simulations;
