const https = require('https');

function GEM() {
	this.name = 'Gemini';
	this.idx = 1;
	this.fee = 0.0025;
	this.timeout = 2000;
	try {
		this.update();
	} catch (e) {
		console.log(e);
		this.timeout = 7000;
		setTimeout(this.update.bind(this), this.timeout);
	}
}

GEM.prototype.update = function() {
	var self = this;
	var options = {
		host: 'api.gemini.com',
		path: '/v1/pubticker/btcusd',
		port: 443,
		method: 'GET'
	};

	callback = function(response) {
		var str = '';

		//another chunk of data has been recieved, so append it to `str`
		response.on('data', function(chunk) {
			str += chunk;
		});

		//creating an error event to catch errors from the var request.
		response.on("error", function(e) { //e is the error
			console.error(e.message);
		})

		response.on('end', function() {
			var data = JSON.parse(str);
			self.bid = parseFloat(data.bid);
			self.ask = parseFloat(data.ask);
			self.last = parseFloat(data.last);
			self.volume = parseFloat(data.volume.BTC);
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

module.exports = GEM;
