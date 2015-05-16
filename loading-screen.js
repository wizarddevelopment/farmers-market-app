'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  ActivityIndicatorIOS,
  Text
} = React;
var LoadingIndicator = require('./loading-indicator');

var LoadingScreen = React.createClass({
  render: function(){
    return (
      <View style={styles.container}>
        <LoadingIndicator loading={this.props.loading}/>
        <Text style={styles.welcome}>
          NYC Farmers Markets are the best!
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});


module.exports = LoadingScreen;

