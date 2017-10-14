/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

var Feed = require('./components/Feed');

var GitHubDashboard = React.createClass({
  render: function() {
    //******, paddingBottom: 50
    return (
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
    );
  }
});

const styles = StyleSheet.create({
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

AppRegistry.registerComponent('GitHubDashboard', () => GitHubDashboard);
