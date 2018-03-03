const https = require('https');

function GDAX() {
	this.name = 'GDAX';
	this.idx = 1;
	this.updated = new Date(2000, 1, 1);
	this.timeout = 6000;
	try {
		this.update();
	} catch (e) {
		console.log(e);
		setTimeout(this.update.bind(this), this.timeout);
	}
}

GDAX.prototype.update = function() {
	var self = this;
	var options = {
		host: 'min-api.cryptocompare.com',
		path: '/data/pricemultifull?fsyms=BTC&tsyms=USD&e=Coinbase',
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
			var bid = parseFloat(data.RAW.BTC.USD.PRICE);
			var ask = parseFloat(data.RAW.BTC.USD.PRICE);
			var last = parseFloat(data.RAW.BTC.USD.PRICE);
			var volume = parseFloat(data.RAW.BTC.USD.VOLUME24HOUR);
			self.bid = ask - .01;
			self.ask = ask;
			self.last = last;
			self.volume = volume;
			self.buy_make = ((self.bid + 0.01) * 1.00 - self.idx) / self.idx * 100;
			self.sell_make = ((self.ask - 0.01) / 1.00 - self.idx) / self.idx * 100;
			self.buy_take = (self.ask * 1.0025 - self.idx) / self.idx * 100;
			self.sell_take = (self.bid / 1.0025 - self.idx) / self.idx * 100;
			self.updated = new Date();
		});
	}

	var req = https.request(options, callback);
	req.end();

	setTimeout(function() {
		self.update();
	}, self.timeout);
};

module.exports = GDAX;
