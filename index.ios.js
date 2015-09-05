/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var imageLink = 'https://pbs.twimg.com/profile_images/626930521365327873/sSJzUuI__400x400.jpg';
var Button = require('react-native-button');
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
} = React;

var Header = React.createClass({
  render: function(){
    return(
      <View style={styles.headerContainer}>
          <Image 
            source={{uri: imageLink}}
            style= {styles.profilePhoto}/>
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
var hiwthi = React.createClass({
  render: function() {
    var tabBar = <View style={styles.tabContainer}>
          <View style={styles.momentsTab}>
            <Text>Moments</Text>
          </View>
          <View style={styles.needsTab}>
            <Text>Needs</Text>
          </View>
        </View>
    if (true) {
      tabBar = null;
    }
    return (
      <View style={styles.frameContainer}>
        <View style={styles.statusBarContainer}>

        </View>
        <View style={styles.headerContainer}>
            <Header/>
        </View>
        {tabBar}
        <View style={styles.feedContainer}>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  
  frameContainer: {
    flex:1,
    backgroundColor:'#F7F7F7'
  },
  statusBarContainer: {
    flex:1,
    backgroundColor:'#00FFFF',
  },
  headerContainer: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabContainer: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#FFFF00',
  },
  feedContainer: {
    flex:20,
    backgroundColor:'#A2A2A2'
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
      padding: 6,

  },
  momentsTab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  needsTab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },

});

AppRegistry.registerComponent('hiwthi', () => hiwthi);
