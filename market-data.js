module.exports = class MarketData {
  constructor(opt) {
    opt = opt || {};
    this.url = opt.url || 'http://api.farmersmarketapp.nyc/api/markets';
  }

  fetch() {
    return fetch(this.url).then(parseJson);
  }

  data() {
    return this.fetch();
  }
}

function parseJson(res) {
  var contentType = res.headers.get("content-type") || ""
  if(!contentType.match("application/json")) {
    throw new TypeError("Error Fetching Data");
  }
  return res.json().then(data => data.markets);
}

// function sortMarkets(markets) {
//   markets.sort((aMarket, bMarket) => {

//   });
// }
