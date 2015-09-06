/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var imageLink = 'https://pbs.twimg.com/profile_images/626930521365327873/sSJzUuI__400x400.jpg';
var Camera = require('react-native-camera');

var {
  AppRegistry,
  CameraRoll,
  Image,
  StyleSheet,
  TabBarIOS,
  Text,
  TouchableHighlight,
  View,
} = React;

var MOMENTS = [
  {
    homed: "Lowell Bander",
    homeless: "Joe Schmo",
    story: "I met Joe near the froyo shop in the 310.",
  },
  {
    homed: "Natalie Ethell",
    homeless: "Elenore Schmo",
    story: "I met Elenore near the smore shop in the 314."
  }
];

var MOCK_IMG = null;

var hiwthi = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'feed'
    }
  },

  render: function() {
    return (
      <TabBarIOS tint="white" barTintColor="ghostwhite">
        <TabBarIOS.Item
          title="Moments"
          icon={ require('image!feed') }
          onPress={ () => this._changeTab('feed') }
          selected={ this.state.selectedTab === 'feed' }>
          <FeedView />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Me"
          icon={ require('image!user') }
          onPress={ () => this._changeTab('me') }
          selected={ this.state.selectedTab === 'me' }>
          <MeView />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Map"
          icon={ require('image!map') }
          onPress={ () => this._changeTab('map') }
          selected={ this.state.selectedTab === 'map' }>
          <MapView />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Add"
          icon={ require('image!plus') }
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
  getInitialState: function() {
    return {
      moments: MOMENTS,
    }
  },
  render: function() {
    return (
      <View style={ styles.pageView }>
        <Text>THIS IS THE FEED VIEW</Text>
        {this.state.moments.map(function (moment) {
          return (
          <View>
            <Text>{moment.homed}</Text>
            <Text>{moment.homeless}</Text>
            <Text>{moment.story}</Text>
            <Image source={MOCK_IMG} />
          </View>
          );
        })}
      </View>
    );
  },
});

var Avatar = React.createClass({
  render: function(){
    return(
        <Image
            source={{uri: imageLink}}
            style= {styles.profilePhoto}/>
      )

  }
})

var Header = React.createClass({
  render: function(){
    return(
      <View style={styles.headerContainer}>
          <Avatar />
          <View style={styles.infoContainer}>
            <Text style={styles.nameText}>
            Nat Doe
            </Text>
            <Text style={styles.xMomentsText}>
            19 Moments
            </Text>
            <Button style={styles.button} onPress={this._handlePress}>
              Follow
            </Button>
          </View>
      </View>
    );
  }
})

var MeView = React.createClass({
  render: function() {
    return (
      <View style={ styles.pageView }>
        <Header />
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
  getInitialState() {
    return {
      cameraType: Camera.constants.Type.back
    }
  },
  render() {

    return (
      <Camera
        ref="cam"
        style={styles.container}
        onBarCodeRead={this._onBarCodeRead}
        type={this.state.cameraType}
      >
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js{'\n'}
          Press Cmd+R to reload
        </Text>
        <TouchableHighlight onPress={this._switchCamera}>
          <Text>The old switcheroo</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._takePicture}>
          <Text>Take Picture</Text>
        </TouchableHighlight>
      </Camera>
    );
  },
  _takePicture() {
   this.refs.cam.capture(function(err, data) {
     console.log(err, data);
     CameraRoll.getPhotos(
       {first:1},
       (data) => {
         console.log('success: ', data);
         //var uri =
         MOCK_IMG = data.edges[0].node.image;
       },
       (error) => {
         console.log('error: ', error);
       }
     );
   });
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
  headerContainer: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  profilePhoto: {
      flex: 3,
      width: 100,
      height: 100,
      borderRadius: 50,
      margin: 20,
  },
  infoContainer: {
    flex:7,
  },
  nameText: {
      fontSize: 32,
      fontFamily: 'Avenir',
      marginBottom: -5,
  },
  xMomentsText: {
      fontSize: 18,
      color: '#A2A2A2',
  },
  button:{
      flex:1,
      width: 85,
      marginTop: 10,
      color: '#007AFF',
      fontSize: 18,
      textAlign:'center',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#007Aff',
      padding: 4,

  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

AppRegistry.registerComponent('hiwthi', () => hiwthi);
