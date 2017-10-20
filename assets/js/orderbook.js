var Index = function() {

    return {

        initCharts: function(bids, asks) {
            if (!jQuery.plot) {
                return;
            }

            var askData = [];
            var bidData = [];

            function showChartTooltip(x, y, xValue, yValue) {
                $('<div id="tooltip" class="chart-tooltip">' + '$' + xValue + ' | ' + yValue + '<\/div>').css({
                    position: 'absolute',
                    display: 'none',
                    top: y - 40,
                    left: x - 40,
                    border: '0px solid #ccc',
                    padding: '2px 6px',
                    'background-color': '#fff'
                }).appendTo("body").fadeIn(200);
            }

            function pad(str, max) {
                str = str.toString();
                return str.length < max ? pad("0" + str, max) : str;
            }

            if (bids) {

                //Indicate that we are refreshing everything
                $('#webhook_refresh').show();

                //Websocket data
                asks = asks.slice(0, 100);
                bids = bids.slice(0, 100);
                //drawCharts(asks, bids, false);

                setTimeout(function (){
                    drawCharts(asks, bids, false)
                }, 1000);

            } else {
                //Load from REST API
                $.getJSON("https://api.cbix.ca/v1/orderbook?limit=100", function(data) {
                    //Set the ask and bid data
                    asks = data.data.asks;
                    bids = data.data.bids;
                    drawCharts(asks, bids, true);
                });
            }

            function drawCharts(asks, bids, setup) {

                $('#webhook_refresh').hide();

                asks.forEach(function(entry) {
                    dailyData = [parseFloat(entry.price), parseFloat(entry.cumulative)];
                    askData.push(dailyData);
                });

                bids.forEach(function(entry) {
                    dailyData = [parseFloat(entry.price), parseFloat(entry.cumulative)];
                    bidData.push(dailyData);
                });

                var indexData = [askData, bidData];

                //Need to determine the midpoint and constrain the x-axis
                var bidSpread = bidData[0][0] - bidData.slice(-1)[0][0];
                var askSpread = askData.slice(-1)[0][0] - askData[0][0];

                var max,
                    min;

                if (askSpread >= bidSpread) {
                    //curtail the asks at askData[0][0] + bidSpread
                    max = askData[0][0] + bidSpread;
                } else {
                    //curtail the asks at bidData[0][0] + askSpread
                    min = bidData[0][0] - askSpread;
                }

                //Now need to make the y-axis a bit neater
                var maxBid = bidData.slice(-1)[0][1];
                var maxAsk = askData.slice(-1)[0][1];

                var upperBound = Math.ceil(Math.max(maxBid, maxAsk)/50) * 50;

                if ($('#site_statistics').size() != 0) {

                    $('#site_statistics_loading').hide();
                    $('#site_statistics_content').show();

                    var plot_statistics = $.plot($("#site_statistics"), [{
                        data: indexData[0],
                        lines: {
                            fill: 0.6,
                            lineWidth: 0
                        },
                        color: ['#578ebe']
                    }, {
                        data: indexData[1],
                        lines: {
                            fill: 0.6,
                            lineWidth: 0
                        },
                        color: ['#cc2828']
                    }], {
                        xaxis: {
                            ticks: 10,
                            font: {
                                lineHeight: 14,
                                style: "normal",
                                variant: "small-caps",
                                color: "#6F7B8A"
                            },
                            min: min,
                            max: max
                        },
                        yaxis: {
                            ticks: 5,
                            tickDecimals: 0,
                            tickColor: "#eee",
                            min: 0,
                            max: upperBound,
                            font: {
                                lineHeight: 14,
                                style: "normal",
                                variant: "small-caps",
                                color: "#6F7B8A"
                            }
                        },
                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: "#eee",
                            borderColor: "#eee",
                            borderWidth: 1
                        }
                    });
                    var previousPoint = null;

                    $("#site_statistics").bind("plothover", function(event, pos, item) {
                        $("#x").text(pos.x.toFixed(2));
                        $("#y").text(pos.y.toFixed(2));
                        if (item) {
                            if (previousPoint != item.dataIndex) {
                                previousPoint = item.dataIndex;

                                $("#tooltip").remove();
                                var x = item.datapoint[0].toFixed(2),
                                    y = item.datapoint[1].toFixed(2);

                                showChartTooltip(item.pageX, item.pageY, item.datapoint[0], +item.datapoint[1].toFixed(2) + ' BTC');
                            }
                        } else {
                            $("#tooltip").remove();
                            previousPoint = null;
                        }
                    });
                }
            }
        }
    };
}();