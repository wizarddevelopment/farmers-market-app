'use strict';
var React = require('react-native');
var LoadingScreen = require('./loading-screen');
var MarketUpdater = require('./market-updater');
var MarketView = require('./market-view');

var {
  ActivityIndicatorIOS,
  ListView,
  StyleSheet,
  SegmentedControlIOS,
  Text,
  TouchableHighlight,
  PixelRatio,
  View
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65
  },
  list: {
    // backgroundColor: 'blue'
  },
  tabs: {

  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
    borderColor: '#A0A0A0',
    borderWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 0
  }
});

var MarketList = React.createClass({
  getInitialState: function(){
    return {
      loading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id
      }),
      markets: [],
      tabs: ['Name', 'ID'],
      sortBy: 'name'
    };
  },
  componentWillMount: function() {
    this.marketUpdater = new MarketUpdater(this)
    this.marketUpdater.update();
  },
  onSelectTab: function(tab){
    this.marketUpdater.sortMarketsBy(tab.toLowerCase());
  },
  onRowSelect: function(rowData){
    this.props.navigator.push({
      title: rowData.name,
      component: MarketView,
      passProps: {... rowData}
    });
  },
  render: function() {
    var display = <LoadingScreen />;
    if (!this.state.loading) {
      display = <ListView
        ref="marketList"
        style={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        initialListSize={20}
      />;
    }
    return (
      <View style={styles.container}>
        {this.renderTabBar()}
        {display}
      </View>
    );
  },
  renderTabBar: function() {
    return (
      <SegmentedControlIOS
        values={this.state.tabs}
        selectedIndex={0}
        onValueChange={this.onSelectTab} />
    );
  },
  renderRow: function(rowData) {
    return(
      <TouchableHighlight onPress={this.onRowSelect.bind(null,rowData)}>
        <View style={styles.row} key={rowData.id}>
          <Text>{rowData.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
});

module.exports = MarketList;

