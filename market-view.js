'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  MapView,
  Text
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 75,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  map: {
    height: 150,
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 10
  }
});

var MarketView = React.createClass({
  getRegion: function(){
    return {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002
    };
  },
  getAnnotations: function(){
    var region = this.getRegion();
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: this.props.name,
    }];
  },

// "address": {
// "street": "St Marks Pl and Hyatt St",
// "zipcode": 10301,
// "city": "Staten Island",
// "state": "NY"
// },
// "links": {
// "web": "http://www.grownyc.org",
// "twitter": null
// },

  render: function(){
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.getRegion()}
          annotations={this.getAnnotations()}
          scrollEnabled={true}
          />
        <Text>{this.props.name}</Text>
        <Text>{this.props.location_description}</Text>
        <Text>{this.props.schedule_hours_description}</Text>
        <Text>{this.props.schedule_season_description}</Text>
      </View>
    );
  }
});

module.exports = MarketView;

