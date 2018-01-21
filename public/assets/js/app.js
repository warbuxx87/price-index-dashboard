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

    var upd_sim = function() {
        $http.get('https://data.alkemi.ai/6882c6d8-26af-4b09-813a-87a39751149d_history.json')
            .then(function(response) {
                $scope.trades = response.data.SpotOrders;
                var status = response.data.OrderStatusAsString[0];
                var exchange = response.data.Platform[0];
                var order = response.data.OrderTypeAsString[0];
                var price = response.data.Price[0];
                var amount = response.data.Amount[0];
                var origin = response.data.Origin[0];
                var updated = response.data.LastUpdate[0];

                $scope.trades.status = status;
                $scope.trades.exchange = exchange;
                $scope.trades.order = order;
                $scope.trades.price = price;
                $scope.trades.amount = amount;
                $scope.trades.origin = origin;
                $scope.trades.updated = updated;
                setTimeout(upd_sim, 5000);
            })
            .catch(function() {
                setTimeout(upd_sim, 5000);
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
    upd_sim();
}]);
