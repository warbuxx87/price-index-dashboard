const https = require('https');

function HITBTC() {
	this.name = 'HitBTC';
	this.idx = 1;
	this.fee = 0.001;
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

HITBTC.prototype.update = function() {
	var self = this;
	var options = {
		host: 'api.hitbtc.com',
		path: '/api/1/public/BTCUSD/ticker',
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
			self.bid = parseFloat(data.bid);
			self.ask = parseFloat(data.ask);
			self.last = parseFloat(data.last);
			self.volume = parseFloat(data.volume);
			self.buy_make = ((self.bid + 0.01) * 1.0009 - self.idx) / self.idx * 100;
			self.sell_make = ((self.ask - 0.01) / 1.0009 - self.idx) / self.idx * 100;
			self.buy_take = (self.ask * 1.001 - self.idx) / self.idx * 100;
			self.sell_take = (self.bid / 1.001 - self.idx) / self.idx * 100;
			self.updated = new Date();
		});
	}

	https.request(options, callback).end();

	setTimeout(function() {
		self.update();
	}, self.timeout);
};

module.exports = HITBTC;
