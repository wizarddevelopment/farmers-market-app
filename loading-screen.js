'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  ActivityIndicatorIOS,
  Text
} = React;

var LoadingScreen = React.createClass({
  render: function(){
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicatorIOS
          animating={this.props.loading}
          size="large"
          color="#0000FF"
        />
        <Text style={styles.welcome}>
          Farmers Markets are the best!
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  loadingContainer: {
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

