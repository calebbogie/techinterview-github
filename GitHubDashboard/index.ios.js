import React, { Component } from 'react';
import {
  AlertIOS,
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
  // Set the initial state of this view
  getInitialState: function() {
    return {
      loggedIn: false,
      selectedTab: 'Feed'
    }
  },
  login: function(email, password) {

    // Error handler helper
    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    // Put email and password into base64 string
    var authenticationString = Buffer.from(email + ':'+ password).toString('base64');

    // Issue login http request
    fetch('https://api.github.com/user',{
      headers: {
        'Authorization' : 'Basic ' + authenticationString
      }
    })
    .then(handleErrors)
    .then((response) => response.json())
    .then((responseJson) => {

      // Set login state to true and save user information
      this.setState({
        loggedIn: true,
        user: responseJson
      });

    })
    .catch((error) => {
        AlertIOS.alert(
          'Unable to login user',
          '',
          [
              {text: 'OK'}
          ],
        );
    });
  },
  render: function() {
    //The user has logged in, so let's show the feed
    if (this.state.loggedIn) {
      return (
        <TabBarIOS
          selectedTab={this.state.selectedTab}
          unselectedTintColor="white"
          tintColor="white"
          barTintColor="#66a3ff">

          <TabBarIOS.Item
            title="Feed"
            selected={this.state.selectedTab === 'Feed'}
            onPress={() => {
              this.setState({
                  selectedTab: 'Feed',
              });
            }}
          >
            <View style={{flex: 1, paddingBottom: 50}}>
              <NavigatorIOS
                ref='nav'
                barTintColor='#66a3ff'
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
            title="My Profile"
            selected={this.state.selectedTab === 'Profile'}
            onPress={() => {
              this.setState({
                  selectedTab: 'Profile',
              });
            }}
          >
            <View style={{flex: 1, paddingBottom: 50}}>
              <NavigatorIOS
                ref='nav'
                barTintColor='#66a3ff'
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
    // If the user hasn't logged in yet, present the login modal
    else {
      return (
        <LoginModal login={this.login} />
      );
    }
  }
});

AppRegistry.registerComponent('GitHubDashboard', () => GitHubDashboard);