const https = require('https');

function OKC() {
	this.name = 'OKCoin';
	this.idx = 1;
	this.fee = 0.002;
	this.timeout = 3000;
	self.updated = new Date();
	try {
		this.update();
	} catch (e) {
		console.log(e);
		this.timeout = 7000;
		setTimeout(this.update.bind(this), this.timeout);
	}
}

OKC.prototype.update = function() {
	var self = this;
	var options = {
		host: 'www.okcoin.com',
		path: '/api/v1/ticker.do?symbol=btc_usd',
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
			self.bid = parseFloat(data.ticker.buy);
			self.ask = parseFloat(data.ticker.sell);
			self.buy_make = ((self.bid + 0.01) - self.idx) / self.idx * 100;
			self.sell_make = ((self.ask - 0.01) - self.idx) / self.idx * 100;
			self.buy_take = (self.ask * 1.002 - self.idx) / self.idx * 100;
			self.sell_take = (self.bid / 1.002 - self.idx) / self.idx * 100;
			self.updated = new Date();
		});
	}

	https.request(options, callback).end();

	setTimeout(function() {
		self.update();
	}, self.timeout);
};

module.exports = OKC;
