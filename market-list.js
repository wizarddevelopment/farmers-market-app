'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
  stats: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  }
});

var MarketList = React.createClass({
  getInitialState: function() {
    return ({
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id
      }).cloneWithRows(this.props.markets)
    });
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      dataSource: dataSource.cloneWithRows(nextProps.markets)
    });
  },

  render: function() {
    return (
      <View>
        <Text style={styles.stats} >There are {this.props.markets.length} markets</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          initialListSize={20}
        />
      </View>
    );
  },

  renderRow: function(rowData) {
    return(<View style={styles.row} key={rowData.id}>
      <Text>{rowData.name}</Text>
    </View>);
  }
});

module.exports = MarketList;

