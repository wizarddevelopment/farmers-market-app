/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Text,
  View,
  AlertIOS
} = React;

var LoadingScreen = require('./loading-screen');
var MarketData = require('./market-data');
var MarketList = require('./market-list');

var FarmersMarketApp = React.createClass({
  getInitialState: function(){
    return { loading: true, markets: [] };
  },
  componentDidMount: function() {
    var marketData = new MarketData();
    marketData.data()
      .then(markets => this.setState({markets: markets, loading: false}))
      .catch(error => AlertIOS.alert(error.message))
      .done();
  },
  render: function() {
    var loading = this.state.loading;
    if (loading) { return <LoadingScreen /> }
    return (
      <MarketList markets={this.state.markets} />
    );
  }
});


AppRegistry.registerComponent('FarmersMarketApp', () => FarmersMarketApp);
