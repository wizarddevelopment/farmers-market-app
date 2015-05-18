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
  childContainer: {
    marginTop: 65,
  }
});

var FarmersMarketApp = React.createClass({
  render: function() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Market Finder',
          component: MarketList,
          passProps: { style: styles.childContainer }
        }} />
    );
  }
});


AppRegistry.registerComponent('FarmersMarketApp', () => FarmersMarketApp);
