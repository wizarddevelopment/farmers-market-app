var React = require('react-native');
var LoadingScreen = require('./loading-screen');
var MarketData = require('./market-data');

var {
  ActivityIndicatorIOS,
  AlertIOS,
  ListView,
  StyleSheet,
  SegmentedControlIOS,
  Text,
  View
} = React;

var styles = StyleSheet.create({
  stats: {
    fontSize: 15,
    textAlign: 'center',
    margin: 20,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
    // border: 1
  },
  listContainer: {
    flex: 1
  },
  tabBar: {
    // backgroundColor: '#FFFFFF',
    // flex: 1,
  },
  tab:{
    // flex: 1,
    // alignItems: 'center',
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
    this.marketData = new MarketData();
    this.marketData.sortBy(this.state.sortBy)
      .then(markets => this.setMarketData(markets))
      .catch(error => AlertIOS.alert(error.message))
      .done();
  },
  sortMarketsBy: function(name) {
    if (this.state.sortBy == name) { return; }
    console.log('sortBy', name);
    this.setState({
      loading: true,
      sortBy: name
    });
    this.marketData.sortBy(name)
      .then(markets => this.setMarketData(markets))
      .catch(error => AlertIOS.alert(error.message))
      .done();
  },
  setMarketData: function(markets) {
    var dataSource = this.state.dataSource;
    this.setState({
      markets: markets,
      dataSource: dataSource.cloneWithRows(markets),
      loading: false
    });
  },
  onSelectTab: function(tab){
    this.sortMarketsBy(tab.toLowerCase());
    console.log(this.refs.marketList);
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
      <View style={styles.listContainer}>
        <Text style={styles.stats} >There are {this.state.markets.length} markets</Text>
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
    return(<View style={styles.row} key={rowData.id}>
      <Text>{rowData.name}</Text>
    </View>);
  }
});

module.exports = MarketList;

