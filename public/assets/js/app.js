var app = angular.module('proview', []);

app.controller('MainCtrl', ['$http', '$scope', function($http, $scope) {
    $scope.markets = []

    var upd_btc = function() {
        $http.get('updates')
            .then(function(response) {
                $scope.btc = response.data;
                var buy_market = response.data.markets[0];
                var sell_market = response.data.markets[0];
                for (var i = 1; i < response.data.markets.length; i++) {
                    if (response.data.markets[i].buy_take < buy_market.buy_take)
                        buy_market = response.data.markets[i];
                    if (response.data.markets[i].sell_take > sell_market.sell_take)
                        sell_market = response.data.markets[i];
                }
                $scope.btc.buy_market = buy_market;
                $scope.btc.sell_market = sell_market;
                $scope.btc.margin = 0;
                if (buy_market.buy_take < sell_market.sell_take)
                    $scope.btc.margin = sell_market.sell_take - buy_market.buy_take;
                setTimeout(upd_btc, 1500);
            })
            .catch(function() {
                setTimeout(upd_btc, 1500);
            });
    };

    var upd_eth = function() {
        $http.get('https://eth.arbi.ninja/updates')
            .then(function(response) {
                $scope.eth = response.data;
                var buy_market = response.data.markets[0];
                var sell_market = response.data.markets[0];
                for (var i = 1; i < response.data.markets.length; i++) {
                    if (response.data.markets[i].buy_take < buy_market.buy_take)
                        buy_market = response.data.markets[i];
                    if (response.data.markets[i].sell_take > sell_market.sell_take)
                        sell_market = response.data.markets[i];
                }
                $scope.eth.buy_market = buy_market;
                $scope.eth.sell_market = sell_market;
                $scope.eth.margin = 0;
                if (buy_market.buy_take < sell_market.sell_take)
                    $scope.eth.margin = sell_market.sell_take - buy_market.buy_take;
                setTimeout(upd_eth, 1500);
            })
            .catch(function() {
                setTimeout(upd_eth, 1500);
            });
    };

    var upd_nance = function() {
        $http.get('https://data.alkemi.ai/Simulations/6882c6d8-26af-4b09-813a-87a39751149d_history.json')
            .then(function(response) {
                $scope.binance = response.data;
                var total = response.data.SpotOrders.length;
                $scope.binance.total = total;
                setTimeout(upd_nance, 5000);
            })
            .catch(function() {
                setTimeout(upd_nance, 5000);
            });

    };

    var upd_finex = function() {
        $http.get('https://data.alkemi.ai/Simulations/4ab7335e-8477-40d5-894e-24ed84edef56_history.json')
            .then(function(response) {
                $scope.bitfinex = response.data;
                var total = response.data.SpotOrders.length;
                $scope.bitfinex.total = total;
                setTimeout(upd_finex, 5000);
            })
            .catch(function() {
                setTimeout(upd_finex, 5000);
            });
    };

    var upd_gem = function() {
        $http.get('https://data.alkemi.ai/Simulations/cf328bf7-1423-4c48-b3b5-cf25d5871c09_history.json')
            .then(function(response) {
                $scope.gemini = response.data;
                var total = response.data.SpotOrders.length;
                $scope.gemini.total = total;
                setTimeout(upd_gem, 5000);
            })
            .catch(function() {
                setTimeout(upd_gem, 5000);
            });
    };

    var upd_gdax = function() {
        $http.get('https://data.alkemi.ai/Simulations/1e3919ae-0caf-4cfe-b424-00b05d3d81e7_history.json')
            .then(function(response) {
                $scope.gdax = response.data;
                var total = response.data.SpotOrders.length;
                $scope.gdax.total = total;
                setTimeout(upd_gdax, 5000);
            })
            .catch(function() {
                setTimeout(upd_gdax, 5000);
            });
    };

    var upd_trex = function() {
        $http.get('https://data.alkemi.ai/Simulations/b9191497-bd4d-4a66-b887-db506ef279f4_history.json')
            .then(function(response) {
                $scope.bittrex = response.data;
                var total = response.data.SpotOrders.length;
                $scope.bittrex.total = total;
                setTimeout(upd_trex, 5000);
            })
            .catch(function() {
                setTimeout(upd_trex, 5000);
            });
    };

    var upd_krak = function() {
        $http.get('https://data.alkemi.ai/Simulations/c426ac25-d281-456f-b952-7c57c780fb59_history.json')
            .then(function(response) {
                $scope.kraken = response.data;
                var total = response.data.SpotOrders.length;
                $scope.kraken.total = total;
                setTimeout(upd_krak, 5000);
            })
            .catch(function() {
                setTimeout(upd_krak, 5000);
            });
    };

    var upd_stamp = function() {
        $http.get('https://data.alkemi.ai/Simulations/5b64b224-5b1d-4b18-aace-683260019487_history.json')
            .then(function(response) {
                $scope.bitstamp = response.data;
                var total = response.data.SpotOrders.length;
                $scope.bitstamp.total = total;
                setTimeout(upd_stamp, 5000);
            })
            .catch(function() {
                setTimeout(upd_stamp, 5000);
            });
    };

    var upd_bot1 = function() {
        $http.get('http://data.alkemi.ai:8060/bot1')
            .then(function(response) {
                $scope.bot13 = response.data;
                setTimeout(upd_bot1, 5000);
            })
            .catch(function() {
                setTimeout(upd_bot1, 5000);
            });
    };


    $scope.round10 = function(value, exp) {
        if ((typeof value) == "string") return value;
        return value.toFixed(exp);
    };

    $scope.getClass = function(value) {
        if ((typeof value) == "string") return "";
        if (value == 0) return "";
        return value > 0 ? 'green' : 'red';
    };

    upd_btc();
    upd_eth();
    upd_nance();
    upd_finex();
    upd_gem();
    upd_gdax();
    upd_trex();
    upd_krak();
    upd_stamp();
    upd_bot1();
}]);
