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
  MapView,
  Image,
  ListView,
  ScrollView,
  StyleSheet,
  TabBarIOS,
  Text,
  TouchableHighlight,
  View,
} = React;

var markers = [
  {
    latitude: 34.07,
    longitude: -118.44,
    title: 'UCLA',
    subtitle: 'Westwood'
  },
  {
    latitude: 39.9011,
    longitude: -75.1719,
    title: 'PennApps',
    subtitle: 'Philadelphia',
  },
];

var MOMENTS = [
  {
    homed: "Natalie Ethell",
    homeless: "Akshay Bakshi",
    location: "Dnipropetrovsk, Ukraine",
    image: {uri: "https://igcdn-photos-h-a.akamaihd.net/hphotos-ak-xaf1/t51.2885-15/e35/11848827_1491796057801111_1023068330_n.jpg"},
    story: "I met Akshay near the smore shop in the 314. He was shivering in the cold, matted hair and ragged robes. No one deserves to starve, whatever their past sins. So, I bought him multi-coloured pebble pyjamas and taught him to code so he could get free stuff at hackathons."
  },
  {
    homed: "Lowell Bander",
    homeless: "Joe Schmo",
    location: "Warsaw, Poland",
    image: {uri: "https://igcdn-photos-g-a.akamaihd.net/hphotos-ak-xaf1/t51.2885-15/e35/11427426_477276085785862_356093719_n.jpg"},
    story: "I met Joe near the froyo shop in the 310.",
  },
];

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
          <MapView1 />
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

var Moment = React.createClass({
  render: function(){
            var moment = this.props.moment;

    return(
        <View style={styles.moment}>
          <Text style={styles.momentNameText}>{moment.homed} x {moment.homeless}</Text>
          <Text style={styles.momentLocationText}>{moment.location}</Text>
          <Image source={moment.image} style={styles.momentPhoto} />
          <Text style={styles.momentStoryText}>{moment.story}</Text>
        </View>
    )
  }
})

var StatusBarBox = React.createClass({
  render: function(){
      return(
        <View style={styles.statusBarBox}>
        <Text> </Text>
        </View>
      )
  }
})

var FeedView = React.createClass({
  getInitialState: function() {
    return {
      moments: MOMENTS,
    }
  },

  render: function() {
      var moments = this.state.moments.map(function (moment) {
        return <Moment moment={moment} />;
      })
      return(
        <ScrollView>
          <StatusBarBox />
          {moments}
        </ScrollView>
      );
  },
})
    //       return (
    //         <Moment moment={moment} />
    //       )
  
    //     return <View> {moments}   
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
        <StatusBarBox />
        <Header />
      </View>
    );
  },
});

var MapView1 = React.createClass({
  getInitialState() {
    return {
      mapRegion: null,
      mapRegionInput: null,
      annotations: null,
      isFirstLoad: true,
    };
  },

  render: function() {
    return (
      <View style={styles.mapView}>
      <MapView 
      style={styles.map}
          onRegionChange={this._onRegionChange}
          onRegionChangeComplete={this._onRegionChangeComplete}
          region={this.state.mapRegion || undefined}
          annotations = {markers}
      />
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
      fontSize: 28,
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
  mapView: {
    flex: 1,
    alignItems: 'stretch'
  },
  map: {
    alignSelf: 'center',
    height: 625,
    width: 350,
    marginTop: 20,
    marginBottom: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#000000',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },

  moment: {
    flexDirection:'column',
  },
  momentPhoto: {
    flex:1,
    width: 400,
    height: 400,
  },
  statusBarBox: {
    height: 20,
    flex: 1,
  },
  momentNameText: {
      fontSize: 24,
      fontFamily: 'Avenir',
      margin:10,
      marginBottom: 0,
      textAlign: 'center',
  },
  momentStoryText: {
      fontSize: 16,
      fontFamily: 'Georgia',
      margin: 10,
  },
  momentLocationText: {
      margin: 0,
      marginTop: -3,
      marginBottom: 3,
      fontSize: 12,
      color: '#808080',
      fontFamily: 'Avenir',
      textAlign: 'center',
  },
});

AppRegistry.registerComponent('hiwthi', () => hiwthi);
