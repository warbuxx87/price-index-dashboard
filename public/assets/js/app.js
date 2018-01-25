var app = angular.module('proview', []);

app.filter('ceil', function() {
  return function(input) {
    return Math.ceil(input);
  };
});

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

  var upd_bot2 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot2.json')
      .then(function(response) {
        $scope.bot2 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot2.profits = profits;
        $scope.bot2.trades = trades;
        $scope.bot2.roi = roi;
        $scope.bot2.fees = fees;
        $scope.bot2.avg_earn = avg_earn;
        $scope.bot2.name = name;
        setTimeout(upd_bot2, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot2, 10000);
      });
  };

  var upd_bot3 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot3.json')
      .then(function(response) {
        $scope.bot3 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot3.profits = profits;
        $scope.bot3.trades = trades;
        $scope.bot3.roi = roi;
        $scope.bot3.fees = fees;
        $scope.bot3.avg_earn = avg_earn;
        $scope.bot3.name = name;
        setTimeout(upd_bot3, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot3, 10000);
      });
  };

  var upd_bot4 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot4.json')
      .then(function(response) {
        $scope.bot4 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot4.profits = profits;
        $scope.bot4.trades = trades;
        $scope.bot4.roi = roi;
        $scope.bot4.fees = fees;
        $scope.bot4.avg_earn = avg_earn;
        $scope.bot4.name = name;
        setTimeout(upd_bot4, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot4, 10000);
      });
  };

  var upd_bot5 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot5.json')
      .then(function(response) {
        $scope.bot5 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot5.profits = profits;
        $scope.bot5.trades = trades;
        $scope.bot5.roi = roi;
        $scope.bot5.fees = fees;
        $scope.bot5.avg_earn = avg_earn;
        $scope.bot5.name = name;
        setTimeout(upd_bot5, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot5, 10000);
      });
  };

  var upd_bot6 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot6.json')
      .then(function(response) {
        $scope.bot6 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot6.profits = profits;
        $scope.bot6.trades = trades;
        $scope.bot6.roi = roi;
        $scope.bot6.fees = fees;
        $scope.bot6.avg_earn = avg_earn;
        $scope.bot6.name = name;
        setTimeout(upd_bot6, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot6, 10000);
      });
  };

  var upd_bot7 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot7.json')
      .then(function(response) {
        $scope.bot7 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot7.profits = profits;
        $scope.bot7.trades = trades;
        $scope.bot7.roi = roi;
        $scope.bot7.fees = fees;
        $scope.bot7.avg_earn = avg_earn;
        $scope.bot7.name = name;
        setTimeout(upd_bot7, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot7, 10000);
      });
  };

  var upd_bot8 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot8.json')
      .then(function(response) {
        $scope.bot8 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot8.profits = profits;
        $scope.bot8.trades = trades;
        $scope.bot8.roi = roi;
        $scope.bot8.fees = fees;
        $scope.bot8.avg_earn = avg_earn;
        $scope.bot8.name = name;
        setTimeout(upd_bot8, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot8, 10000);
      });
  };

  var upd_bot9 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot9.json')
      .then(function(response) {
        $scope.bot9 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot9.profits = profits;
        $scope.bot9.trades = trades;
        $scope.bot9.roi = roi;
        $scope.bot9.fees = fees;
        $scope.bot9.avg_earn = avg_earn;
        $scope.bot9.name = name;
        setTimeout(upd_bot9, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot9, 10000);
      });
  };

  var upd_bot10 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot10.json')
      .then(function(response) {
        $scope.bot10 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot10.profits = profits;
        $scope.bot10.trades = trades;
        $scope.bot10.roi = roi;
        $scope.bot10.fees = fees;
        $scope.bot10.avg_earn = avg_earn;
        $scope.bot10.name = name;
        setTimeout(upd_bot10, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot10, 10000);
      });
  };

  var upd_bot11 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot11.json')
      .then(function(response) {
        $scope.bot11 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot11.profits = profits;
        $scope.bot11.trades = trades;
        $scope.bot11.roi = roi;
        $scope.bot11.fees = fees;
        $scope.bot11.avg_earn = avg_earn;
        $scope.bot11.name = name;
        setTimeout(upd_bot11, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot11, 10000);
      });
  };

  var upd_bot12 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot12.json')
      .then(function(response) {
        $scope.bot12 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot12.profits = profits;
        $scope.bot12.trades = trades;
        $scope.bot12.roi = roi;
        $scope.bot12.fees = fees;
        $scope.bot12.avg_earn = avg_earn;
        $scope.bot12.name = name;
        setTimeout(upd_bot12, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot12, 10000);
      });
  };

  var upd_bot13 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot13.json')
      .then(function(response) {
        $scope.bot13 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot13.profits = profits;
        $scope.bot13.trades = trades;
        $scope.bot13.roi = roi;
        $scope.bot13.fees = fees;
        $scope.bot13.avg_earn = avg_earn;
        $scope.bot13.name = name;
        setTimeout(upd_bot13, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot13, 10000);
      });
  };

  var upd_bot14 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot14.json')
      .then(function(response) {
        $scope.bot14 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot14.profits = profits;
        $scope.bot14.trades = trades;
        $scope.bot14.roi = roi;
        $scope.bot14.fees = fees;
        $scope.bot14.avg_earn = avg_earn;
        $scope.bot14.name = name;
        setTimeout(upd_bot14, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot14, 10000);
      });
  };

  var upd_bot15 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot15.json')
      .then(function(response) {
        $scope.bot15 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot15.profits = profits;
        $scope.bot15.trades = trades;
        $scope.bot15.roi = roi;
        $scope.bot15.fees = fees;
        $scope.bot15.avg_earn = avg_earn;
        $scope.bot15.name = name;
        setTimeout(upd_bot15, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot15, 10000);
      });
  };

  var upd_bot16 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot16.json')
      .then(function(response) {
        $scope.bot16 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot16.profits = profits;
        $scope.bot16.trades = trades;
        $scope.bot16.roi = roi;
        $scope.bot16.fees = fees;
        $scope.bot16.avg_earn = avg_earn;
        $scope.bot16.name = name;
        setTimeout(upd_bot16, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot16, 10000);
      });
  };

  var upd_bot17 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot17.json')
      .then(function(response) {
        $scope.bot17 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot17.profits = profits;
        $scope.bot17.trades = trades;
        $scope.bot17.roi = roi;
        $scope.bot17.fees = fees;
        $scope.bot17.avg_earn = avg_earn;
        $scope.bot17.name = name;
        setTimeout(upd_bot17, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot17, 10000);
      });
  };

  var upd_bot18 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot18.json')
      .then(function(response) {
        $scope.bot18 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot18.profits = profits;
        $scope.bot18.trades = trades;
        $scope.bot18.roi = roi;
        $scope.bot18.fees = fees;
        $scope.bot18.avg_earn = avg_earn;
        $scope.bot18.name = name;
        setTimeout(upd_bot18, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot18, 10000);
      });
  };

  var upd_bot19 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot19.json')
      .then(function(response) {
        $scope.bot19 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot19.profits = profits;
        $scope.bot19.trades = trades;
        $scope.bot19.roi = roi;
        $scope.bot19.fees = fees;
        $scope.bot19.avg_earn = avg_earn;
        $scope.bot19.name = name;
        setTimeout(upd_bot19, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot19, 10000);
      });
  };

  var upd_bot20 = function() {
    $http.get('https://data.alkemi.ai/CustomBots/bot20.json')
      .then(function(response) {
        $scope.bot20 = response.data;
        var profits = response.data.InterExchangeArbitrageBot.TotalProfits;
        var trades = response.data.InterExchangeArbitrageBot.CompletedOrders.BaseOrder.length;
        var avg_earn = profits / trades;
        var roi = response.data.InterExchangeArbitrageBot.ROI;
        var fees = response.data.InterExchangeArbitrageBot.TotalFeeCosts;
        var name = response.data.InterExchangeArbitrageBot.Name;
        $scope.bot20.profits = profits;
        $scope.bot20.trades = trades;
        $scope.bot20.roi = roi;
        $scope.bot20.fees = fees;
        $scope.bot20.avg_earn = avg_earn;
        $scope.bot20.name = name;
        setTimeout(upd_bot20, 10000);
      })
      .catch(function() {
        setTimeout(upd_bot20, 10000);
      });
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
  upd_bot2();
  upd_bot3();
  upd_bot4();
  upd_bot5();
  upd_bot6();
  upd_bot7();
  upd_bot8();
  upd_bot9();
  upd_bot10();
  upd_bot11();
  upd_bot12();
  upd_bot13();
  upd_bot14();
  upd_bot15();
  upd_bot16();
  upd_bot17();
  upd_bot18();
  upd_bot19();
  upd_bot20()
}]);
