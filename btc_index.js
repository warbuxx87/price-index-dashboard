#!/bin/env node

var toobusy = require('toobusy-js');
var express = require('express');
var Rollbar = require('rollbar');
var rollbar = new Rollbar('eb365d727579462395dbbc4e18ac0275');
var fs = require('fs');
var xbx = require('./exchanges/xbx');
var gdax = require('./exchanges/gdax');
var gemini = require('./exchanges/gemini');
var stamp = require('./exchanges/stamp');
var kraken = require('./exchanges/kraken');
//var quoine = require('./exchanges/quoine');
//var quadriga = require('./exchanges/quadriga');
//var cex = require('./exchanges/cex');

// USDT exchanges
var finex = require('./exchanges/finex');
var bittrex = require('./exchanges/bittrex');
//var poloniex = require('./exchanges/poloniex');
//var liqui = require('./exchanges/liqui');
var binance = require('./exchanges/binance');
//var hitbtc = require('./exchanges/hitbtc');
//var bitmex = require('./exchanges/bitmex');



/**
 *  Define the application.
 */
var BtcMonitor = function() {

	//  Scope.
	var self = this;


	/*  ================================================================  */
	/*  Helper functions.                                                 */
	/*  ================================================================  */

	/**
	 *  Set up server IP address and port # using env variables/defaults.
	 */
	self.setupVariables = function() {
		//  Set the environment variables we need.
		self.host = "btc.alkemi.ai"
		self.ipaddress = "0.0.0.0";
		self.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

		if (typeof self.ipaddress === "undefined") {
			//  Log errors but continue w/ 127.0.0.1 - this
			//  allows us to run/test the app locally.
			console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
			self.ipaddress = "127.0.0.1";
		};
	};


	/**
	 *  Populate the cache.
	 */
	self.populateCache = function() {
		if (typeof self.zcache === "undefined") {
			self.zcache = {
				'index.html': ''
			};
		}

		//  Local cache for static content.
		self.zcache['index.html'] = fs.readFileSync('./public/index.html');
	};


	/**
	 *  Retrieve entry (content) from cache.
	 *  @param {string} key  Key identifying content to retrieve from cache.
	 */
	self.cache_get = function(key) {
		return self.zcache[key];
	};


	/**
	 *  terminator === the termination handler
	 *  Terminate server on receipt of the specified signal.
	 *  @param {string} sig  Signal to terminate on.
	 */
	self.terminator = function(sig) {
		if (typeof sig === "string") {
			console.log('%s: Received %s - terminating app ...',
				Date(Date.now()), sig);
			process.exit(1);
		}
		console.log('%s: Node server stopped.', Date(Date.now()));
	};


	/**
	 *  Setup termination handlers (for exit and a list of signals).
	 */
	self.setupTerminationHandlers = function() {
		//  Process on exit and signals.
		process.on('exit', function() {
			self.terminator();
		});

		// Removed 'SIGPIPE' from the list - bugz 852598.
		['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
			'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
		].forEach(function(element, index, array) {
			process.on(element, function() {
				self.terminator(element);
			});
		});
	};

	/*  ================================================================  */
	/*  App server functions (main app logic here).                       */
	/*  ================================================================  */

	/**
	 *  Create the routing table entries + handlers for the application.
	 */
	self.createRoutes = function() {
		self.routes = {};

		self.routes['/updates'] = function(req, res) {
			res.setHeader('Content-Type', 'application/json');
			res.setHeader('Cache-Control', 'no-cache, no-store');
			res.end(JSON.stringify({
				markets: [self.gemini, self.gdax, self.stamp, self.kraken, self.finex, self.bittrex, self.binance],
				idx: self.xbx.idx,
			}));
		};

		self.routes['/'] = function(req, res) {
			res.setHeader('Content-Type', 'text/html');
			res.send(self.cache_get('index.html'));
		};
	};

	// Add headers
	self.app.use(function(req, res, next) {

		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', '*');

		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', true);

		// Pass to next layer of middleware
		next();
	});

	/**
	 *  Initialize the server (express) and create the routes and register
	 *  the handlers.
	 */
	self.initializeServer = function() {
		self.createRoutes();
		self.app = express();
		// Use the rollbar error handler to send exceptions to your rollbar account
		self.app.use(rollbar.errorHandler());

		self.app.listen(6943);

		self.app.use(express.static('public'));




		//  Add handlers for the app (from the routes).
		for (var r in self.routes) {
			self.app.get(r, self.routes[r]);

		}
	};






	/**
	 *  Initializes the application.
	 */
	self.initialize = function() {
		self.setupVariables();
		self.populateCache();
		self.setupTerminationHandlers();

		// Create the express server and routes.
		self.initializeServer();
	};


	/**
	 *  Start the server (starts up the sample application).
	 */
	self.start = function() {
		//  Start the app on the specific interface (and port).
		self.app.listen(self.port, self.ipaddress, function() {
			console.log('%s: Node server started on %s:%d ...',
				Date(Date.now()), self.ipaddress, self.port);
		});

		self.gdax = new gdax();
		self.gemini = new gemini();
		self.stamp = new stamp();
		self.kraken = new kraken();
		//self.quoine = new quoine();
		//self.cex = new cex();
		//self.quadriga = new quadriga();
		self.finex = new finex();
		self.bittrex = new bittrex();
		// self.poloniex = new poloniex();
		//self.liqui = new liqui();
		self.binance = new binance();

		//self.hitbtc = new hitbtc();
		//self.bitmex = new bitmex();
		self.xbx = new xbx([self.gemini, self.gdax, self.stamp, self.kraken, self.finex, self.bittrex, self.binance]);
	};

}; /*  BTC INDEX ARBITRAGE.  */



/**
 *  main():  Main code.
 */
var zapp = new BtcMonitor();
zapp.initialize();
zapp.start();
