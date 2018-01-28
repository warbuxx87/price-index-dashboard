const https = require('https');

function STAMP() {
    this.bid = 0;
    this.ask = 0;
    this.last = 0;
    this.volume = 0;
    this.name = 'BitStamp';
    this.idx = 1;
    this.updated = new Date(2000, 1, 1);
    this.sell_make = 0;
    this.sell_take = 0;
    this.buy_make = 0;
    this.buy_take = 0;
    this.timeout = 3000;
    try {
        this.update();
    } catch (e) {
        console.log(e);
        setTimeout(this.update.bind(this), this.timeout);
    }
}

STAMP.prototype.update = function() {
    var self = this;
    var options = {
        host: 'www.bitstamp.net',
        path: '/api/ticker/',
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
            self.bid = parseFloat(data.bid);
            self.ask = parseFloat(data.ask);
            self.last = parseFloat(data.last);
            self.volume = parseFloat(data.volume);
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

module.exports = STAMP;
