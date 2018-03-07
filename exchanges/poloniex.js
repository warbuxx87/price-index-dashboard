const https = require('https');

function POLONIEX() {
	this.name = 'Poloniex';
	this.fee = 0.002;
	this.timeout = 7000;
	this.idx = 1;
	try {
		this.update();
	} catch (e) {
		console.log(e);
		setTimeout(this.update.bind(this), this.timeout);
	}
}

POLONIEX.prototype.update = function() {
	var self = this;
	var options = {
		host: 'poloniex.com',
		path: '/public?command=returnTicker',
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
			self.bid = parseFloat(data.USDT_BTC.highestBid);
			self.ask = parseFloat(data.USDT_BTC.lowestAsk);
			self.last = parseFloat(data.USDT_BTC.last);
			self.volume = parseFloat(data.USDT_BTC.quoteVolume);
			self.buy_make = ((self.bid + 0.01) * 1.0015 - self.idx) / self.idx * 100;
			self.sell_make = ((self.ask - 0.01) / 1.0015 - self.idx2) / self.idx2 * 100;
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

module.exports = POLONIEX;
