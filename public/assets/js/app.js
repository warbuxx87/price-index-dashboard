var app = angular.module('proview', []);

app.controller('MainCtrl', ['$http', '$scope', function($http, $scope) {
    $scope.markets = []
    $scope.trades = []

    var upd_btc = function() {
        $http.get('updates')
            .then(function(response) {
                $scope.data = response.data;
                var buy_market = response.data.markets[0];
                var sell_market = response.data.markets[0];
                for (var i = 1; i < response.data.markets.length; i++) {
                    if (response.data.markets[i].buy_take < buy_market.buy_take)
                        buy_market = response.data.markets[i];
                    if (response.data.markets[i].sell_take > sell_market.sell_take)
                        sell_market = response.data.markets[i];
                }
                $scope.data.buy_market = buy_market;
                $scope.data.sell_market = sell_market;
                $scope.data.margin = 0;
                if (buy_market.buy_take < sell_market.sell_take)
                    $scope.data.margin = sell_market.sell_take - buy_market.buy_take;
                setTimeout(upd_btc, 1500);
            })
            .catch(function() {
                setTimeout(upd_btc, 1500);
            });
    };

    var upd_eth = function() {
        $http.get('https://eth.arbi.ninja/updates')
            .then(function(response) {
                $scope.data2 = response.data;
                var buy_market = response.data.markets[0];
                var sell_market = response.data.markets[0];
                for (var i = 1; i < response.data.markets.length; i++) {
                    if (response.data.markets[i].buy_take < buy_market.buy_take)
                        buy_market = response.data.markets[i];
                    if (response.data.markets[i].sell_take > sell_market.sell_take)
                        sell_market = response.data.markets[i];
                }
                $scope.data2.buy_market = buy_market;
                $scope.data2.sell_market = sell_market;
                $scope.data2.margin = 0;
                if (buy_market.buy_take < sell_market.sell_take)
                    $scope.data2.margin = sell_market.sell_take - buy_market.buy_take;
                setTimeout(upd_eth, 1500);
            })
            .catch(function() {
                setTimeout(upd_eth, 1500);
            });
    };

    var upd_nance = function() {
        $http.get('https://data.alkemi.ai/6882c6d8-26af-4b09-813a-87a39751149d_history.json')
            .then(function(response) {
                $scope.trades = response.data;
                setTimeout(upd_nance, 5000);
            })
            .catch(function() {
                setTimeout(upd_nance, 5000);
            });

    };

    var upd_finex = function() {
        $http.get('https://data.alkemi.ai/4ab7335e-8477-40d5-894e-24ed84edef56_history.json')
            .then(function(response) {
                $scope.trades2 = response.data;
                setTimeout(upd_finex, 5000);
            })
            .catch(function() {
                setTimeout(upd_finex, 5000);
            });
    };

    var upd_gem = function() {
        $http.get('https://data.alkemi.ai/cf328bf7-1423-4c48-b3b5-cf25d5871c09_history.json')
            .then(function(response) {
                $scope.trades3 = response.data;
                setTimeout(upd_gem, 5000);
            })
            .catch(function() {
                setTimeout(upd_gem, 5000);
            });
    };

    var upd_gdax = function() {
        $http.get('https://data.alkemi.ai/1e3919ae-0caf-4cfe-b424-00b05d3d81e7_history.json')
            .then(function(response) {
                $scope.trades4 = response.data;
                setTimeout(upd_gdax, 5000);
            })
            .catch(function() {
                setTimeout(upd_gdax, 5000);
            });
    };

    var upd_trex = function() {
        $http.get('https://data.alkemi.ai/b9191497-bd4d-4a66-b887-db506ef279f4_history.json')
            .then(function(response) {
                $scope.trades5 = response.data;
                setTimeout(upd_trex, 5000);
            })
            .catch(function() {
                setTimeout(upd_trex, 5000);
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
}]);
