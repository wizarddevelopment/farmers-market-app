'use strict';

var React = require('react-native');
var {
  // StyleSheet,
  ActivityIndicatorIOS
} = React;

var LoadingIndicator = React.createClass({
  render: function(){
    return (
      <ActivityIndicatorIOS
        animating={this.props.loading}
        size="large"
        color="#0000FF"
      />
    );
  }
});

module.exports = LoadingIndicator;

