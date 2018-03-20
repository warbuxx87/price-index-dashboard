const https = require('https');

function LIQUI() {
	this.name = 'Liqui.io';
	this.idx = 1;
	this.fee = 0.0025;
	this.timeout = 2000;
	this.updated = new Date();
	try {
		this.update();
	} catch (e) {
		console.log(e);
		this.timeout = 7000;
		setTimeout(this.update.bind(this), this.timeout);
	}
}

LIQUI.prototype.update = function() {
	var self = this;
	var options = {
		host: 'api.liqui.io',
		path: '/api/3/ticker/btc_usdt',
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
			self.bid = parseFloat(data.btc_usdt.buy);
			self.ask = parseFloat(data.btc_usdt.sell);
			self.last = parseFloat(data.btc_usdt.last);
			self.volume = parseFloat(data.btc_usdt.vol_cur);
			self.buy_make = ((self.bid + 0.01) * 1.001 - self.idx) / self.idx * 100;
			self.sell_make = ((self.ask - 0.01) / 1.001 - self.idx) / self.idx * 100;
			self.buy_take = (self.ask * 1.0025 - self.idx) / self.idx * 100;
			self.sell_take = (self.bid / 1.0025 - self.idx) / self.idx * 100;
			self.updated = new Date();
		});

		response.on("error", function(e) { //e is the error
			console.error(e.message);
		});
	}

	https.request(options, callback);

	setTimeout(function() {
		self.update();
	}, self.timeout);
};

module.exports = LIQUI;
