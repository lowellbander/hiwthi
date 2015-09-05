/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} = React;

var MOMENTS = [
  {
    homed: "Lowell Bander",
    homeless: "Joe Schmo",
    story: "I met Joe near the froyo shop in the 310.",
  },
  {
    homed: "Lowell Bander",
    homeless: "Joe Schmo",
    story: "I met Joe near the froyo shop in the 310."
  }
];

var hiwthi = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'feed'
    }
  },
  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Feed"
          //icon={ require('image!facemash') }
          onPress={ () => this._changeTab('feed') }
          selected={ this.state.selectedTab === 'feed' }>
          <FeedView />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Me"
          //icon={ require('image!facemash') }
          onPress={ () => this._changeTab('me') }
          selected={ this.state.selectedTab === 'me' }>
          <MeView />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Map"
          //icon={ require('image!facemash') }
          onPress={ () => this._changeTab('map') }
          selected={ this.state.selectedTab === 'map' }>
          <MapView />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="+"
          //icon={ require('image!facemash') }
          onPress={ () => this._changeTab('add') }
          selected={ this.state.selectedTab === 'add' }>
          <AddView />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
  _changeTab: function(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  },
});

var FeedView = React.createClass({
  render: function() {
    return (
      <View style={ styles.pageView }>
        <Text>THIS IS THE FEED VIEW</Text>
        <Text>{MOMENTS}</Text>
      </View>
    );
  },
});

var MeView = React.createClass({
  render: function() {
    return (
      <View style={ styles.pageView }>
        <Text>THIS IS THE ME VIEW</Text>
      </View>
    );
  },
});

var MapView = React.createClass({
  render: function() {
    return (
      <View style={ styles.pageView }>
        <Text>THIS IS THE MAP VIEW</Text>
      </View>
    );
  },
});

var AddView = React.createClass({
  render: function() {
    return (
      <View style={ styles.pageView }>
        <Text>THIS IS THE ADD VIEW</Text>
      </View>
    );
  },
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('hiwthi', () => hiwthi);
