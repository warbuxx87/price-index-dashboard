const https = require('https');

function QUAD() {
	this.name = 'QuadrigaCX';
	this.idx = 1;
	this.fee = 0.005;
	this.timeout = 3000;
	try {
		this.update();
	} catch (e) {
		console.log(e);
		setTimeout(this.update.bind(this), this.timeout);
	}
}

QUAD.prototype.update = function() {
	var self = this;
	var options = {
		host: 'api.quadrigacx.com',
		path: '/v2/ticker?book=btc_usd',
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
			self.buy_make = ((self.bid + 0.01) * 1.005 - self.idx) / self.idx * 100;
			self.sell_make = ((self.ask - 0.01) / 1.005 - self.idx) / self.idx * 100;
			self.buy_take = (self.ask * 1.005 - self.idx) / self.idx * 100;
			self.sell_take = (self.bid / 1.005 - self.idx) / self.idx * 100;
			self.updated = new Date();
		});
	}

	https.request(options, callback).end();

	setTimeout(function() {
		self.update();
	}, self.timeout);
};

module.exports = QUAD;
