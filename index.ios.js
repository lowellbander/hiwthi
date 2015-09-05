/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var base64icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';
var imageLink = 'https://pbs.twimg.com/profile_images/626930521365327873/sSJzUuI__400x400.jpg';
var Button = require('react-native-button');
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TabBarIOS,
} = React;

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

var OurTabBar = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0,
    };
  },
  _renderContent: function(color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  },

  render: function(){
    return(
        <TabBarIOS tintColor="white" barTintColor="darkslateblue">
          <TabBarIOS.Item title="Blue Tab" 
                          systemIcon="contacts"
                          selected={this.state.selectedTab === 'blueTab'}
                          onPress={() => {
                          this.setState({
                            selectedTab: 'blueTab',
                          });
                          }}>
          {this._renderContent('#414A8C', 'Blue Tab')}
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon="history"
            badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
                notifCount: this.state.notifCount + 1,
              });
            }}>
            {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
          </TabBarIOS.Item>
          <TabBarIOS.Item
            systemIcon="more"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
                presses: this.state.presses + 1
              });
            }}>
            {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
          </TabBarIOS.Item>
        </TabBarIOS>
      )
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
        <OurTabBar />
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
      padding: 4,

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
