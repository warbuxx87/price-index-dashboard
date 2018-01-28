const https = require('https');

function KRAKEN() {
    this.bid = 0;
    this.ask = 0;
    this.last = 0;
    this.volume = 0;
    this.name = 'Kraken';
    this.idx = 1;
    this.updated = new Date(2000, 1, 1);
    this.sell_make = 0;
    this.sell_take = 0;
    this.buy_make = 0;
    this.buy_take = 0;
    try {
        this.update();
    } catch (e) {
        console.log(e);
        setTimeout(this.update.bind(this), this.timeout);
    }
}

KRAKEN.prototype.update = function() {
    var self = this;
    var options = {
        host: 'api.kraken.com',
        path: '/0/public/Ticker?pair=xbtusd',
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
            var res = data.result.XXBTZUSD;
            var bid = res.b[0];
            var ask = res.a[0];
            var last = res.c[0];
            var volume = res.v[0];
            self.bid = parseFloat(bid);
            self.ask = parseFloat(ask);
            self.last = parseFloat(last);
            self.volume = parseFloat(volume);
            self.buy_make = ((self.bid + 0.01) * 1.0016 - self.idx) / self.idx * 100;
            self.sell_make = ((self.ask - 0.01) / 1.0016 - self.idx) / self.idx * 100;
            self.buy_take = (self.ask * 1.0026 - self.idx) / self.idx * 100;
            self.sell_take = (self.bid / 1.0026 - self.idx) / self.idx * 100;
            self.updated = new Date();
        });
    }

    var req = https.request(options, callback);
    req.end();

    setTimeout(function() {
        self.update();
    }, self.timeout);
};

module.exports = KRAKEN;
