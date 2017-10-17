import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  TabBarIOS,
  Text,
  View
} from 'react-native';

var Feed = require('./components/Feed');
var LoginModal = require('./components/LoginModal');
var Profile = require('./components/Profile');

var Buffer = require('buffer/').Buffer;

var GitHubDashboard = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false,
      selectedTab: 'Feed'
    }
  },
  login: function(email, password) {

    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    var authenticationString = Buffer.from(email + ':'+ password).toString('base64');

    fetch('https://api.github.com/user',{
      headers: {
        'Authorization' : 'Basic ' + authenticationString
      }
    })
    .then(handleErrors)
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        loggedIn: true,
        user: responseJson
      });

    })
    .catch((error) => {
    
      if (Platform.OS == 'ios') {
          AlertIOS.alert(
            'Unable to login user',
            '',
            [
                {text: 'OK'}
            ],
          );
      }
      else if (Platform.OS == 'android') {
          Alert.alert(
            'Unable to login user',
            '',
            [
                {text: 'OK', onPress: () => console.log('OK pressed')},
            ],
            { cancelable: false }
          )
      }

    });
  },
  render: function() {
    if (this.state.loggedIn) {
      return (
        <TabBarIOS
          selectedTab={this.state.selectedTab}
          unselectedTintColor="white"
          tintColor="white"
          barTintColor="#16BA81">

          <TabBarIOS.Item
            selected={this.state.selectedTab === 'Feed'}
            onPress={() => {
              this.setState({
                  selectedTab: 'Feed',
              });
            }}
          >
            <View style={{flex: 1}}>
              <NavigatorIOS
                ref='nav'
                barTintColor='#16BA81'
                tintColor='white'
                translucent={false}
                style={{flex: 1}}
                initialRoute={{
                  component: Feed,
                  title: 'GitHub Dashboard',
                  titleTextColor: 'white',
                }} />
            </View>
          </TabBarIOS.Item>

          <TabBarIOS.Item
            selected={this.state.selectedTab === 'Profile'}
            onPress={() => {
              this.setState({
                  selectedTab: 'Profile',
              });
            }}
          >
            <View style={{flex: 1}}>
              <NavigatorIOS
                ref='nav'
                barTintColor='#16BA81'
                tintColor='white'
                translucent={false}
                style={{flex: 1}}
                initialRoute={{
                  component: Profile,
                  title: 'My Profile',
                  titleTextColor: 'white',
                  passProps: {
                    user: this.state.user
                  },
                }} />
            </View>
          </TabBarIOS.Item>

        </TabBarIOS>
      );
    }
    else {
      return (
        <LoginModal login={this.login} />
      );
    }
  }
});

AppRegistry.registerComponent('GitHubDashboard', () => GitHubDashboard);