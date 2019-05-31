jQuery(document).ready(function() {
	function t() {
		$.getJSON("https://api.cbix.ca/v1/index", function(t) {
			function e(t, e) {
				return t.name < e.name ? -1 : t.name > e.name ? 1 : 0
			}
			var n = t.date_time + "+0000",
				a = moment(n).fromNow(),
				d = t.index.value,
				i = (t.index.change_24hour, t.index.change_percent_24hour),
				o = t.index.high_24hour,
				s = t.index.low_24hour,
				r = t.index.volume_24hour,
				l = t.index.usd_value;
			0 > i ? ($("#index-up-down").removeClass("grey-cascade"), $("#index-up-down").addClass("red"), $("#index-up-down").removeClass("green")) : 0 == i ? ($("#index-up-down").addClass("grey-cascade"), $("#index-up-down").removeClass("green"), $("#index-up-down").removeClass("red")) : ($("#index-up-down").removeClass("grey-cascade"), $("#index-up-down").addClass("green"), $("#index-up-down").removeClass("red")), $("#index-value").html("$" + l), $("#index-change").html(i + "%"), $("#index-updated").html("Last Updated: " + a), $("#index-volume").html(r + " BTC"), $("#index-high").html("24 Hour High: $" + o), $("#index-low").html("24 Hour Low: $" + s), document.title = "$" + d + " | Arbitrage Exchange Monitor v2";
			var u = t.exchanges,
				c = "",
				h = "",
				p = "",
				g = t.exchanges;
			g.sort(function(t, e) {
				return t.ask - e.ask
			}), lowest = g[0].ask, g.sort(function(t, e) {
				return t.bid - e.bid
			});
			var m = g.length - 1;
			highest = g[m].bid;
			var m = g.length - 1;
			highest = g[m].bid, g.sort(e), u.forEach(function(t) {
				var e = t.name,
					n = t.link,
					a = t.bid,
					d = t.ask,
					i = t.last,
					o = t.volume_24hour;
				d === lowest && (h = "label label-success"), a === highest && (p = "label label-success"), c += '<tr><td>' + e + '</td><td><span class="' + p + '">$' + a + '</span></td><td><span class="' + h + '">$' + d + '</span><td class="hidden-480">$' + i + '</td><td class="hidden-480">' + o + " BTC</td></tr>", h = "", p = ""
			}), $("#exchange_table tbody").html(c), $("#index-value").toggleClick(function() {
				$("#index-value").html("$" + l + '<span class="usd">USD</span>')
			}, function() {
				$("#index-value").html("$" + d + '<span class="usd">CAD</span>')
			})
		})
	}

	function e() {
		$.getJSON("https://api.cbix.ca/v1/history?limit=14", function(t) {
			var e = t.data,
				n = "";
			e.forEach(function(t) {
				var e = t.date,
					a = (t.change, t.change_percent),
					d = t.close,
					i = t.volume,
					o = "";
				o = 0 > a ? "label-down" : 0 == a ? "label-none" : "label-up", n += "<tr><td>" + e + "</td><td>$" + d + '</td><td><span class="' + o + '">' + a + '%</span></td><td class="hidden-480">' + i + " BTC</td></tr>"
			}), $("#history_table tbody").html(n)
		})
	}

	function n() {
		$.getJSON("https://api.cbix.ca/v1/summary", function(t) {
			var e = "",
				n = t.data.market_cap,
				d = t.data.high_52_week,
				i = t.data.low_52_week,
				o = t.data.percentage_return_52_week,
				s = t.data.percentage_return_year_to_date,
				r = t.data.volatility,
				l = 0 > o ? "label-down" : 0 == o ? "label-none" : "label-up",
				u = 0 > s ? "label-down" : 0 == s ? "label-none" : "label-up";
			e = "<tr><td width='50%'>Market Capitalization:</td><td>$" + a(n) + "</td></tr><tr><td>52-Week High:</td><td>$" + d.toFixed(2) + "</td></tr><tr><td>52-Week Low:</td><td>$" + i.toFixed(2) + "</td></tr><tr><td>Historical Volatility (30):</td><td>" + r.toFixed(2) + "%</td></tr><tr><td>52-Week Return:</td><td><span class='" + l + "'>" + o.toFixed(2) + "%</span></td></tr><tr><td>Year-to-Date Return:</td><td><span class='" + u + "'>" + s.toFixed(2) + "%</span></td></tr>", $("#market_table tbody").html(e)
		})
	}

	function a(t) {
		return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	}
	Metronic.init(), Layout.init(), Index.initCharts(), t(), e(), n(), setInterval(function() {
		t()
	}, 15e3)
});
var ws = new WebSocket("ws://trade2.alkemi.ai:1234");
ws.onopen = function() {
	log('CONNECT');
};
ws.onclose = function() {
	log('DISCONNECT');
};
ws.onmessage = function(t) {
log('MESSAGE: ' + t.data);
var e = "New Trade from " + t.data,
	n = t.volume + " BTC traded at $" + t.price + " for $" + t.value;
toastr.options = {
	closeButton: !0,
	debug: !1,
	positionClass: "toast-bottom-right",
	onclick: null,
	showDuration: "1000",
	hideDuration: "1000",
	timeOut: "10000",
	extendedTimeOut: "1000",
	showEasing: "swing",
	hideEasing: "linear",
	showMethod: "fadeIn",
	hideMethod: "fadeOut"
};
toastr[t.level](n, e)
}), $.fn.toggleClick = function() {
	var t = arguments,
		e = 0;
	return this.click(function() {
		t[e].call(), e = (e + 1) % t.length
	})
};