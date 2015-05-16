# Farmers Market App

This is an open source NYC farmers market app and works with the JSONAPI provided by the [Farmers Market API](https://github.com/wizarddevelopment/farmers-market-api). The api is currently hosted [here](http://api.farmersmarketapp.nyc/api/markets).

# Build
```bash
npm install
gulp sass
# gulp watch is great too too
ionic platform add android # optional
ionic platform add ios # optional
ionic plugin add org.apache.cordova.geolocation
ionic serve
```

# Todo

 - [x] Navigation
 - [ ] Search
 - [ ] Update saved market data
 - [ ] Grow food?
