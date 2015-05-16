'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} = React;

var LoadingIndicator = React.createClass({
  render: function(){
    return (
      <ActivityIndicatorIOS
        animating={this.props.animating}
        size="large"
        color="#0000ff"
      />
    );
  }
});

module.exports = LoadingIndicator;

