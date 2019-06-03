function log(e) {
	document.getElementById("log").textContent += e + "\n"
}
jQuery(document).ready(function() {
	function e() {
		$.getJSON("https://api.cbix.ca/v1/index", function(e) {
			function t(e, t) {
				return e.name < t.name ? -1 : e.name > t.name ? 1 : 0
			}
			var a = e.date_time + "+0000",
				n = moment(a).fromNow(),
				d = e.index.value,
				i = (e.index.change_24hour, e.index.change_percent_24hour),
				l = e.index.high_24hour,
				o = e.index.low_24hour,
				r = e.index.volume_24hour,
				s = e.index.usd_value;
			0 > i ? ($("#index-up-down").removeClass("grey-cascade"), $("#index-up-down").addClass("red"), $("#index-up-down").removeClass("green")) : 0 == i ? ($("#index-up-down").addClass("grey-cascade"), $("#index-up-down").removeClass("green"), $("#index-up-down").removeClass("red")) : ($("#index-up-down").removeClass("grey-cascade"), $("#index-up-down").addClass("green"), $("#index-up-down").removeClass("red")), $("#index-value").html("$" + s), $("#index-change").html(i + "%"), $("#index-updated").html("Last Updated: " + n), $("#index-volume").html(r + " BTC"), $("#index-high").html("24 Hour High: $" + l), $("#index-low").html("24 Hour Low: $" + o), document.title = "$" + d + " | Arbitrage Exchange Monitor v2";
			var c = e.exchanges,
				u = "",
				h = "",
				m = "",
				g = e.exchanges;
			g.sort(function(e, t) {
				return e.ask - t.ask
			}), lowest = g[0].ask, g.sort(function(e, t) {
				return e.bid - t.bid
			});
			var p = g.length - 1;
			highest = g[p].bid;
			var p = g.length - 1;
			highest = g[p].bid, g.sort(t), c.forEach(function(e) {
				var t = e.name,
					a = (e.link, e.bid),
					n = e.ask,
					d = e.last,
					i = e.volume_24hour;
				n === lowest && (h = "label label-success"), a === highest && (m = "label label-success"), u += "<tr><td>" + t + '</td><td><span class="' + m + '">$' + a + '</span></td><td><span class="' + h + '">$' + n + '</span><td class="hidden-480">$' + d + '</td><td class="hidden-480">' + i + " BTC</td></tr>", h = "", m = ""
			}), $("#exchange_table tbody").html(u), $("#index-value").toggleClick(function() {
				$("#index-value").html("$" + s + '<span class="usd">USD</span>')
			}, function() {
				$("#index-value").html("$" + d + '<span class="usd">CAD</span>')
			})
		})
	}

	function t(e) {
		return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	}
	Metronic.init(), Layout.init(), Index.initCharts(), e(),
		function() {
			$.getJSON("https://api.cbix.ca/v1/history?limit=14", function(e) {
				var t = e.data,
					a = "";
				t.forEach(function(e) {
					var t = e.date,
						n = (e.change, e.change_percent),
						d = e.close,
						i = e.volume,
						l = "";
					l = 0 > n ? "label-down" : 0 == n ? "label-none" : "label-up", a += "<tr><td>" + t + "</td><td>$" + d + '</td><td><span class="' + l + '">' + n + '%</span></td><td class="hidden-480">' + i + " BTC</td></tr>"
				}), $("#history_table tbody").html(a)
			})
		}(),
		function() {
			$.getJSON("https://api.cbix.ca/v1/summary", function(e) {
				var a = "",
					n = e.data.market_cap,
					d = e.data.high_52_week,
					i = e.data.low_52_week,
					l = e.data.percentage_return_52_week,
					o = e.data.percentage_return_year_to_date,
					r = e.data.volatility,
					s = 0 > l ? "label-down" : 0 == l ? "label-none" : "label-up",
					c = 0 > o ? "label-down" : 0 == o ? "label-none" : "label-up";
				a = "<tr><td width='50%'>Market Capitalization:</td><td>$" + t(n) + "</td></tr><tr><td>52-Week High:</td><td>$" + d.toFixed(2) + "</td></tr><tr><td>52-Week Low:</td><td>$" + i.toFixed(2) + "</td></tr><tr><td>Historical Volatility (30):</td><td>" + r.toFixed(2) + "%</td></tr><tr><td>52-Week Return:</td><td><span class='" + s + "'>" + l.toFixed(2) + "%</span></td></tr><tr><td>Year-to-Date Return:</td><td><span class='" + c + "'>" + o.toFixed(2) + "%</span></td></tr>", $("#market_table tbody").html(a)
			})
		}(), setInterval(function() {
			e()
		}, 15e3)
});
var ws = new WebSocket("wss://trade2.alkemi.ai:8889");
ws.onopen = function() {
	log("CONNECTED TO ALKEMI NETWORK")
}, ws.onclose = function() {
	log("DISCONNECT FROM ALKEMI NETWORK")
}, ws.onmessage = function(e) {
	var t = Math.floor(1e3 * Math.random() + 1);
	t -= 1, t = String(t);
	var a = String(e.data);
	if (a = a.replace("IEAB - ", ""), a = a.replace("SIMULATED", ""), a = a.replace("blocked", "node"), a = a.replace("-", ""), a = a.replace("Template", ""), a = a.replace("ac055696-cafd-42e9-90a8-fb7ff62c488c", "GDAX"), a = a.replace("ea529fcb-ad7a-4ede-b808-62aa2de0a268", "Poloniex"), a = a.replace("ae8941ca-f26c-48a6-a58c-d93f66464895", "Bitstamp"), a = a.replace("b34314bd-376b-47ce-b807-0d38885ed6e8", "Bitfinex"), a = a.replace("00944920-a28f-4366-b65d-d61e6bef27ee", "Bittrex"), a = a.replace("1fb3443b-33e9-4ab7-9cc4-2cdc088b8f49", "Kraken"), log("EVENT: " + a), e.data.includes("Executed")) {
		slim = e.data, slim = slim.replace("for", "   "), slim = slim.toString().slice(0, 111), e.date = e.data.toString().slice(0, 11), e.time = e.data.toString().slice(12, 19), e.time = e.time + ":" + t, e.amount = "1 BTC ", e.price = "8500", e.data.includes("buy") && (e.level = "success", e.order = "bought", e.exchange = slim.slice(102)), e.data.includes("sell") && (e.level = "error", e.order = "sold", e.exchange = slim.slice(103));
		var n = e.date + " UTC " + e.time,
			d = e.amount + e.order + " at " + e.exchange;
		toastr.options = {
			closeButton: !0,
			debug: !1,
			positionClass: "toast-bottom-left",
			onclick: null,
			showDuration: "1000",
			hideDuration: "1000",
			timeOut: "10000",
			extendedTimeOut: "1000",
			showEasing: "swing",
			hideEasing: "linear",
			showMethod: "fadeIn",
			hideMethod: "fadeOut"
		}, toastr[e.level](d, n)
	}
}, $.fn.toggleClick = function() {
	var e = arguments,
		t = 0;
	return this.click(function() {
		e[t].call(), t = (t + 1) % e.length
	})
};