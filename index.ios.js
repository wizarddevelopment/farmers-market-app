/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry
} = React;

var MarketList = require('./market-list');

var FarmersMarketApp = React.createClass({
  render: function() {
    return (<MarketList />);
  }
});


AppRegistry.registerComponent('FarmersMarketApp', () => FarmersMarketApp);
