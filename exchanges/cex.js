const https = require('https');

function CEX() {
	this.name = 'CEX.io';
	this.idx = 1;
	this.fee = 0.002;
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

CEX.prototype.update = function() {
	var self = this;

	var options = {
		host: 'cex.io',
		path: '/api/ticker/BTC/USD',
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
			self.buy_make = ((self.bid + 0.01) * 1.00 - self.idx) / self.idx * 100;
			self.sell_make = ((self.ask - 0.01) / 1.00 - self.idx) / self.idx * 100;
			self.buy_take = (self.ask * 1.002 - self.idx) / self.idx * 100;
			self.sell_take = (self.bid / 1.002 - self.idx) / self.idx * 100;
			self.updated = new Date();
		});
	}

	var req = https.request(options, callback);
	req.end();

	setTimeout(function() {
		self.update();
	}, self.timeout);
};

module.exports = CEX;