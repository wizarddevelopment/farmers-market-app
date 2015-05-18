'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;

var MarketList = require('./market-list');

var styles = React.StyleSheet.create({
  container: {
    flex: 1
  },
});

var FarmersMarketApp = React.createClass({
  render: function() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Markets',
          component: MarketList
        }} />
    );
  }
});


AppRegistry.registerComponent('FarmersMarketApp', () => FarmersMarketApp);
