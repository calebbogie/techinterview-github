import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Navigator,
  Platform,
  StyleSheet,
  TabBarIOS,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var Feed = require('./components/Feed');
var FeedTab = require('./components/android/FeedTab');
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
      console.log(error);
      Alert.alert(
        'Unable to login user',
        '',
        [
            {text: 'OK', onPress: () => console.log('OK pressed')},
        ],
        { cancelable: false }
      )

    });
  },
  renderTab: function(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    return (
      <TouchableHighlight
        key={`${name}_${page}`}
        onPress={() => onPressHandler(page)}
        onLayout={onLayoutHandler}
        underlayColor="transparent"
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        >
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>{name}</Text>
        </View>
      </TouchableHighlight>
    );
  },
  render: function() {
    if (this.state.loggedIn) {
      return (
        <View />
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
