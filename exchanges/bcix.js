const https = require('https');

function BCIX() {
	this.name = 'BCIX';
	this.idx = 1;
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

BCIX.prototype.update = function() {
	var self = this;
	var options = {
		host: 'api.cbix.ca',
		path: '/v1/orderbook?limit=10',
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
		});
	}

	https.request(options, callback).end();

	setTimeout(function() {
		self.update();
	}, self.timeout);
};

module.exports = BCIX;