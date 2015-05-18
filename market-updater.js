'use strict';
var React = require('react-native');
var MarketData = require('./market-data');

var {
  AlertIOS
} = React;

class MarketUpdater {
  constructor(component) {
    this.component = component;
    this.marketData = new MarketData();
  }
  update() {
    this.marketData.sortBy(this.component.state.sortBy)
      .then(markets => this.setMarketData(markets))
      .catch(error => AlertIOS.alert(error.message))
      .done();
  }
  setMarketData(markets) {
    var dataSource = this.component.state.dataSource;
    this.component.setState({
      markets: markets,
      dataSource: dataSource.cloneWithRows(markets),
      loading: false
    });
  }
  sortMarketsBy(name) {
    if (this.component.state.sortBy == name) { return; }
    this.component.setState({
      loading: true,
      sortBy: name
    });
    this.marketData.sortBy(name)
      .then(markets => this.setMarketData(markets))
      .catch(error => AlertIOS.alert(error.message))
      .done();
  }
  sortByLocation(name){
    this.component.setState({
      loading: true,
      sortBy: name
    });
    this.getLocation()
      .then(location => this.marketData.sortByLocation(location))
      .catch(error => AlertIOS.alert(`Unable to get location. ${error.message}`))
      .then(markets => this.setMarketData(markets))
      .done();
  }
  getLocation() {
    var executor = function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        (geoLocation) => resolve(geoLocation.coords),
        reject,
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    }
    return new Promise(executor);
  }
}

module.exports = MarketUpdater;

