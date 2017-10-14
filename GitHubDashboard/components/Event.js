import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

const styles = require('../styles');

const EventDetails = require('./EventDetails');

var Event = React.createClass({
	showEvent: function() {
		this.props.navigator.push({
	        component: EventDetails,
	        titleTextColor: 'white',
	        title: 'Event',
	        passProps: {
	          event: this.props.event
	        }
	    });
	},
	render: function() {
		return (
			<View style={styles.buttonContainer}>
				<TouchableHighlight
					onPress={() => {
            			this.showEvent(this.props.event);
          			}}
          			underlayColor='transparent'
      			>
					<View style={{flexDirection: 'column'}}>
						<Text style={{marginBottom: 10, flexWrap: 'wrap'}}>
							<Text style={{fontWeight: 'bold'}}>Username: </Text>
							{this.props.event.actor.display_login}
						</Text>
						<Text style={{marginBottom: 10, flexWrap: 'wrap'}}>
							<Text style={{fontWeight: 'bold', flexWrap: 'wrap'}}>Event Type: </Text>
							{this.props.event.type}
						</Text>
						<Text style={{flexWrap: 'wrap'}}>
							<Text style={{fontWeight: 'bold', flexWrap: 'wrap'}}>Reposity: </Text>
							{this.props.event.repo.name}
						</Text>
					</View>
				</TouchableHighlight>
			</View>
		);
	}
});

module.exports = Event;