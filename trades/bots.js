const https = require('https');

var upd_bot1 = function() {
  $http.get('https://data.alkemi.ai/CustomBots/bot1.json')
    .then(function(response) {
      $scope.bot1 = response.data;
      var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
      var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
      var avg_earn = profits / trades;
      var roi = response.data.InterExchangeArbitrageBot.ROI;
      var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
      var name = response.data.InterExchangeArbitrageBot.Name;
      $scope.bot1.profits = profits;
      $scope.bot1.trades = trades;
      $scope.bot1.roi = roi;
      $scope.bot1.fees = fees;
      $scope.bot1.avg_earn = avg_earn;
      $scope.bot1.name = name;
      setTimeout(upd_bot1, 10000);
    })
    .catch(function() {
      setTimeout(upd_bot1, 10000);
    });
};
