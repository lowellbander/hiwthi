/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var Camera = require('react-native-camera');
var Button = require('react-native-button');

Parse.initialize("KmH7ODwbyoGVkE0i4OY6V3rvRDEnDMwyJtb3hYkJ", "WiHNVOfu7VDayMTBWpKYKWdhFFpTZmJRjqidUQih");

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var hiwthi = React.createClass({

  mixins: [ParseReact.Mixin],

  observe: function(props, state) {
    return {
      comments: (new Parse.Query('MyFirstParseClass'))
              };
  },

  getInitialState: function() {
    return {text: 'initial text'};
  },

  _handlePress(event) {
    console.log('Pressed!');
    ParseReact.Mutation.Create('MyFirstParseClass', {
  name: this.state.text
}).dispatch();
  },

  render: function() {


    return (
      <View style={styles.container}>
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
        <Button onPress={this._handlePress}>CLICK MEH</Button>
        <TextInput
   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
   onChangeText={(text) => this.setState({text})}
   value={this.state.text}
 />

        <Text style={styles.welcome}>
          Welcome to React Native!
          {this.data.comments}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions} onClick={this.onClick}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
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
