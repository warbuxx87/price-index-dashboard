#!/bin/env node
var express = require('express');
var ccxt = require('ccxt');
var fs = require('fs');
var xbx = require('./exchanges/xbx');
var quadriga = require('./exchanges/quadriga');
var gemini = require('./exchanges/gemini');
var kraken = require('./exchanges/kraken');
var gdax = require('./exchanges/gdax');
var finex = require('./exchanges/finex');
var stamp = require('./exchanges/stamp');
var bittrex = require('./exchanges/bittrex');
var poloniex = require('./exchanges/poloniex');
var cex = require('./exchanges/cex');
var liqui = require('./exchanges/liqui');
var binance = require('./exchanges/binance');
var hitbtc = require('./exchanges/hitbtc');
var bitmex = require('./exchanges/bitmex');

/**
 *  Define the sample application.
 */
var SampleApp = function() {

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
        self.host = "btc.arbi.ninja"
	self.ipaddress = "159.203.44.213";
        self.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
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
            console.log('%s: Received %s - terminating sample app ...',
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
                markets: [self.quadriga, self.gemini, self.kraken, self.gdax, self.finex, self.stamp, self.bittrex, self.poloniex, self.cex, self.liqui, self.binance, self.hitbtc, self.bitmex ],
                idx: self.xbx.idx,
                idx2: self.xbx.idx2
            }));
        };

        self.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html'));
        };
    };

    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
        self.app = express.createServer();
        self.app.use(express.static('public'));
        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }
    };


    /**
     *  Initializes the sample application.
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
        //self.btce = new btce();
            self.quadriga = new quadriga();
	    self.gemini = new gemini();
            self.kraken = new kraken();
	    self.gdax = new gdax();
            self.finex = new finex();
            self.stamp = new stamp();
	    self.bittrex = new bittrex();
	    self.poloniex = new poloniex();
            self.cex = new cex();
	    self.liqui = new liqui();
            self.binance = new binance();
	    self.hitbtc = new hitbtc();
	    self.bitmex = new bitmex();
            self.xbx = new xbx([ self.quadriga, self.gemini, self.kraken, self.gdax, self.finex, self.stamp, self.bittrex, self.poloniex, self.cex, self.liqui, self.binance, self.hitbtc, self.bitmex ]);
    };

}; /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();
