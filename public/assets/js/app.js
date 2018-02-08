var app = angular.module('proview', ['tandibar/ng-rollbar']);

app.filter('ceil', function() {
  return function(input) {
    return Math.ceil(input);
  };
});

app.controller('MainCtrl', ['$http', '$scope', function($http, $scope) {
  $scope.btc = []

  var upd_btc = function() {
    $http.get('updates')
      .then(function(response) {
        $scope.btc = response.data;
        var buy_market = response.data.markets[0];
        var sell_market = response.data.markets[0];
        var total_volume = 0;
        for (var i = 1; i < response.data.markets.length; i++) {
          if (response.data.markets[i].buy_take < buy_market.buy_take)
            buy_market = response.data.markets[i];
          if (response.data.markets[i].sell_take > sell_market.sell_take)
            sell_market = response.data.markets[i];
        }
        for (var i = 0; i < response.data.markets.length; i++) {
            total_volume = total_volume + response.data.markets[i].volume;
        }
        $scope.btc.buy_market = buy_market;
        $scope.btc.sell_market = sell_market;
        $scope.btc.total_volume = total_volume;
        $scope.btc.margin = 0;
        if (buy_market.buy_take < sell_market.sell_take)
          $scope.btc.margin = sell_market.sell_take - buy_market.buy_take;
        setTimeout(upd_btc, 1500);
      })
      .catch(function() {
        setTimeout(upd_btc, 1500);
      });
  };


  var upd_trades = function() {
    $http.get('https://api.alkemi.ai')
      .then(function(response) {
        $scope.trades = response.data;
        var total_profit = 0;
        var total_trades = 0;
        for (var i = 0; i < response.data.bots.length; i++) {
            total_profit = total_profit + response.data.bots[i].profits;
        }
        for (var i = 0; i < response.data.exchanges.length; i++) {
            total_trades = total_trades + response.data.exchanges[i].total;
        }
        $scope.trades.total_profit = total_profit;
        $scope.trades.total_trades = total_trades;
        setTimeout(upd_trades, 10000);
      })
      .catch(function() {
        setTimeout(upd_trades, 10000);
      });
  };

  $scope.getClass = function(value) {
    if ((typeof value) == "string") return "";
    if (value == 0) return "";
    return value > 0 ? 'green' : 'red';
  };

  upd_btc();
  upd_trades();

  proview.config(['RollbarProvider', function(RollbarProvider) {
  RollbarProvider.init({
    accessToken: "***REMOVED***",
    captureUncaught: true,
    payload: {
      environment: 'production'
    }
  });
}]);
}]);
