/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var defaultProfile = {
  uri: 'https://pbs.twimg.com/profile_images/626930521365327873/sSJzUuI__400x400.jpg'
};
var Camera = require('react-native-camera');

var {
  AppRegistry,
  CameraRoll,
  Modal,
  MapView,
  Image,
  ListView,
  ScrollView,
  SegmentedControlIOS,
  StyleSheet,
  TabBarIOS,
  Text,
  TouchableHighlight,
  View,
} = React;

var HOMELESS_NAMES = [
  'Joe Schmo',
  'Edward Blake',
  'Elenore Foster',
  'Jane Weatherly',
];

var LOCATIONS = [
  'Folkstowne, Virginia',
  'Narnia, Conneticut',
  'Blakesville, Florida',
  'Chicago, Illinois',
];

var STORIES = [
  'We met on the corner of 5th and Allensway this afternoon. They had been through a lot these past several years and were very happy to have someone to talk to. I bought them some fruit from the corner store.',
  'They caught my eye on my way home from work. I built up the courage to approach them and am happy I did, because they had a very interesting story to tell. They were deeply appreciative of the ineraction.',
  'I\'m moving out of my apartment next weekend, so I have a lot of stuff to give away. I was just about to just give it to a local charity, but instead felt as though this person might more deeply appreicate the donation.',
];

var markers = [
  {
    latitude: 34.07,
    longitude: -118.44,
    title: 'Jan Smithers',
    subtitle: 'Westwood'
  },
  {
    latitude: 34.07,
    longitude: -118.34,
    title: 'Gilbert White',
    subtitle: 'Downtown'
  },
  {
    latitude: 34.17,
    longitude: -118.34,
    title: 'Stacy Phillips',
    subtitle: 'Glendale'
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

var NEEDS = [
  'food',
  'soap',
  'blankets',
  'socks & underwear',
  'soft foods',
  'bottled water',
  'backpack',
];

var hiwthi = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'feed'
    }
  },

  returnToFeed: function() {
    this._changeTab('feed');
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
          <MeView isUser={true}/>
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
          <AddView whenDone={this.returnToFeed}/>
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
        <TouchableHighlight onPress={this._handlePressHomed}>
          <Text style={styles.momentNameText}>
            {moment.homed}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._handlePressHomeless}>
          <Text style={styles.momentNameText}>
            with {moment.homeless}
          </Text>
        </TouchableHighlight>
        <Text style={styles.momentLocationText}>{moment.location}</Text>
        <Image source={moment.image} style={styles.momentPhoto} />
        <Text style={styles.momentStoryText}>{moment.story}</Text>
      </View>
    );
  },
  _handlePressHomed: function() {
    this.props.handlePress(
      true,
      this.props.moment.image,
      this.props.moment.homed,
    );
  },
  _handlePressHomeless: function() {
    this.props.handlePress(
      true,
      this.props.moment.image,
      this.props.moment.homeless,
    );
  },
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

var Onboarding = React.createClass({
  componentDidMount: function() {
    var that = this;
    setTimeout(function(){that.setState({onboardingVisible:true})}, 1);
  },
  getInitialState: function() {
    return {
      modalTransparent: false,
      animated: true,
      onboardingVisible: false,
      transparent: false,
    }
  },
  render: function() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;
    return (
      <View>
      <Modal
        animated={this.state.animated}
        transparent={this.state.transparent}
        visible={this.state.onboardingVisible}>
        <View style={[styles.container, modalBackgroundStyle]}>
          <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
            <Text style={styles.title}>Where the Heart is</Text>
            <Text style={styles.welcome}>Many who live on the streets battle the feeling that they’re inadequate or nonexistent to the rest of the world.</Text>
            <Text style={styles.welcome}>We believe that fostering meaningful interactions between homed and homeless individuals vitalizes community health.</Text>
            <View style={styles.startButton}>
            <Button
              style={styles.welcomeButton}
              onPress={this._close}
            >
              Lets Get Started
            </Button>
            </View>
          </View>
        </View>
      </Modal>
      </View>
    );
  },
  _close: function() {
    this.setState({onboardingVisible: false});
  },
});

var FeedView = React.createClass({
  getInitialState: function() {
    return {
      moments: MOMENTS,
      modalTransparent: false,
      animated: true,
      modalVisible: false,
      transparent: false,
    }
  },

  render: function() {
    var that = this;
    var moments = this.state.moments.map(function (moment) {
      return <Moment
        moment={moment}
        handlePress={that.toggleModal}
      />;
    })
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;
    return(
      <ScrollView>
        <Onboarding />
        <StatusBarBox />
        {moments}
        <Modal
          animated={this.state.animated}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}>
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <MeView
                profile={this.state.profile}
                name={this.state.name}
                inModal={true}
              />
              <Button
                onPress={this.toggleModal.bind(this, false)}
                style={styles.modalButton}>
                Close
              </Button>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  },
  toggleModal: function(visible, profile, name) {
    this.setState({
      modalVisible: visible,
      profile: profile,
      name: name,
    });
  },
})
var Avatar = React.createClass({
  render: function(){
    return(
        <Image
            source={this.props.profile}
            style= {styles.profilePhoto}/>
      )

  }
})

var Header = React.createClass({
  render: function(){
  var needs = <Button
    style={styles.button}
    onPress={this._showNeeds}
  >
    Needs
  </Button>;
  if (this.props.inModal || this.props.hideNeedsButton) {
    needs = null;
  }
    return(
      <View style={styles.headerContainer}>
          <Avatar profile={this.props.profile} />
          <View style={styles.infoContainer}>
            <Text style={styles.nameText}>
              {this.props.name}
            </Text>
            <Text style={styles.xMomentsText}>
            19 Moments
            </Text>
            <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={this._handlePress}>
              Follow
            </Button>
            {needs}
            </View>
          </View>
      </View>
    );
  },
  _showNeeds: function() {
    this.props.showNeeds();
  }
})

var Grid = React.createClass({
  render(){
    var moments = MOMENTS.map(function(moment) {
    return(
        <Image source={moment.image} style={styles.grid}/>
      )
    })
    return <ScrollView style={styles.scrollGridContainer}><View style={styles.gridContainer}>{moments}</View></ScrollView>
  }
})

var MeView = React.createClass({
  getInitialState: function() {
    return {
      modalVisible: false,
    }
  },
  render: function() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;
    var grid = <Grid />;
    if (this.props.inModal) {
      grid = <Needs />;
    }
    console.log(this.props);
    return (
      <View style={ styles.pageView }>
        <StatusBarBox />
        <Header
          profile={this.props.profile || defaultProfile}
          name={this.props.name || 'John Doe'}
          showNeeds={this.showNeeds}
          inModal={this.props.inModal}
          hideNeedsButton={this.props.isUser}
        />
      {grid}
      <Modal
        animated={true}
        transparent={true}
        visible={this.state.modalVisible}>
        <View style={[styles.container, modalBackgroundStyle]}>
          <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
            <Needs />
            <Button
              style={styles.welcomeButton}
              onPress={this.hideNeeds}
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </View>
    );
  },
  showNeeds: function() {
    this.setState({modalVisible: true});
  },
  hideNeeds: function() {
    this.setState({modalVisible: false});
  },
});

var MomentsNeedsControl = React.createClass({
  getInitialState(){
    return {
      values:['Moments', 'Needs'],
      value: 'Moments',
      selectedIndex: 0
    };
  },

  render() {
    return (
      <View style={styles.segmentedControl}>
        <SegmentedControlIOS
          values={this.state.values}
          selectedIndex={this.state.selectedIndex}
          onChange={this._onChange}
          onValueChange={this._onValueChange} />
        <Text style={styles.text} >
          Value: {this.state.value}
        </Text>

      </View>
    );
  },

  _onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  },

  _onValueChange(value) {
    this.setState({
      value: value,
    });
  }
});


var Needs = React.createClass({
  render: function() {
    var needs = (NEEDS.map(function(need) {
      return (
        <Need need={need} />
      );
    }));
    return (
      <View>
        {needs}
      </View>
    );
  }
});

var Need = React.createClass({
  render: function() {
    return (
      <Text> [ ] {this.props.need}</Text>
    );
  }
});

var MapView1 = React.createClass({
  getInitialState() {
    return {
      mapRegion: {
        latitude: 34.07,
        longitude: -118.44,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
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
      cameraType: Camera.constants.Type.front
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
        <TouchableHighlight onPress={this._takePicture}>
          <Image source={require('image!Circled-50')} />
        </TouchableHighlight>
      </Camera>
    );
  },
  _takePicture() {
   var that = this;
   this.refs.cam.capture(function(err, data) {
     console.log(err, data);
     CameraRoll.getPhotos(
       {first:1},
       (data) => {
         console.log('success: ', data);
         var img = data.edges[0].node.image;
         var random = Math.random();
         var moment = {
           homed: "Lowell Bander",
           homeless: HOMELESS_NAMES[Math.floor(random*HOMELESS_NAMES.length)],
           location: LOCATIONS[Math.floor(random*LOCATIONS.length)],
           image: img,
           story: STORIES[Math.floor(random*STORIES.length)],
         };
         MOMENTS.unshift(moment);
         that.props.whenDone();
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
  title: {
    fontSize: 30,
    marginBottom: 50,
    textAlign: 'center',
  },
  welcome: {
    fontSize: 15,
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
  },
  welcomeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#333333',
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
      width: 80,
      marginTop: 10,
      marginRight: 10,
      color: '#007AFF',
      fontSize: 18,
      textAlign:'center',
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#007Aff',
      padding: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
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
    marginBottom: 25,
    // shadowColor: '#000000',
    // shadowOpacity: 0.50,
    // shadowRadius: 1,
    // shadowOffset: {
    //   height: 0,
    //   width: 1
    // },
    // backgroundColor:'#FFFFFF',
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
      margin: 15,
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
  segmentedControl: {
    margin: 10,
  },
  grid: {
    backgroundColor: '#0000FF',
    height: 120,
    width: 120,
  },
  gridContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  scrollGridContainer: {
    height:1000,
  },
  startButton: {
    alignSelf: 'center',
  },
});

AppRegistry.registerComponent('hiwthi', () => hiwthi);
