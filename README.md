# Price Index Dashboard

> Real-time Bitcoin VWAP index aggregated live from 15+ exchanges, with a streaming web dashboard. Node.js · Express · Docker · AWS.

<p>
<img src="https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/AngularJS-E23237?style=flat-square&logo=angularjs&logoColor=white" alt="AngularJS" />
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazonwebservices&logoColor=white" alt="AWS" />
</p>

Pulls live market data from 15+ exchanges (Coinbase, Kraken, Bitstamp, Gemini, Binance, Bitfinex, Bittrex, Poloniex, OKCoin and others) and computes a **volume-weighted average price (VWAP) index** in real time, served to a live dashboard. It ran in production at `btc.alkemi.network`.

## How it works

- `exchanges/` has one adapter per exchange. Each one polls the exchange's public API and normalises price and volume into a common shape.
- `btc_index.js` aggregates the feeds, weights each venue by volume and publishes the VWAP index.
- `trades/` contains per-bot trade logic (`bot1`–`bot20`) that runs against the index feed.
- An Express API serves the data to an AngularJS dashboard with live updates and Rollbar error tracking.
- It's containerised with Docker and deployed to AWS Elastic Beanstalk through CI pipelines.

## Stack

Node.js, Express, AngularJS, Docker, AWS

## Running locally

```bash
npm install
node btc_index.js
```

## Credits

Built by me at Alkemi, 2017–2019 (494 commits).

---
<sub>Part of <a href="https://github.com/warbuxx87">Ryan Breen's</a> work · <a href="https://www.linkedin.com/in/breen-ryan/">LinkedIn</a></sub>
