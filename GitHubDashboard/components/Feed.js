import React, { Component } from 'react';
import {
	ActivityIndicator,
	AlertIOS,
 	AppRegistry,
	ListView,
	Platform,
	RefreshControl,
	StyleSheet,
	Text,
	View
} from 'react-native';

const styles = require('../styles');

var Event = require('./Event');

var Feed = React.createClass({
	getInitialState: function() {
		var eventList = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
		var events = [''];

		eventList = eventList.cloneWithRows(events);

		return {
			eventList: eventList,
			events: events,
			downloading: true,
			refreshing: false
		}
	},
	componentDidMount: function() {
		this.setState({downloading: true});
		this.downloadEvents();
	},
	downloadEvents: function() {

	    function handleErrors(response) {
	      	if (!response.ok) {
	        	throw Error(response.statusText);
	      	}
	      	return response;
	    }

    	fetch('https://api.github.com/events')
      	.then(handleErrors)
      	.then((response) => response.json())
      	.then((responseJson) => {
      		var events = this.state.events.slice();

      		this.setState({
      			eventList: this.state.eventList.cloneWithRows(responseJson),
      			events: responseJson,
      			downloading: false,
      			refreshing: false
      		})

      	})
      	.catch((error) => {
        	this.setState({downloading: false});

        	console.log(error);
        
	        if (Platform.OS == 'ios') {
	          	AlertIOS.alert(
	            	'An error occurred',
	            	'',
	            	[
	              		{text: 'OK'}
	            	],
	          	);
	        }
	        else if (Platform.OS == 'android') {
	          	Alert.alert(
	            	'An error occurred',
	            	'',
	            	[
	              		{text: 'OK', onPress: () => console.log('OK pressed')},
	            	],
	            	{ cancelable: false }
	          	)
	        }

      	});
	},
	refreshEvents: function() {
		this.setState({refreshing: true});
		this.downloadEvents();
	},
	renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
		return (
			<Event event={rowData} navigator={this.props.navigator} />
		);
	},
	render: function() {
		if (this.state.downloading) {
	      	return (
	        	<ActivityIndicator
	          		animating={this.state.downloading}
	          		style={{alignItems: 'center', justifyContent: 'center', paddingTop: 50, paddingBottom: 20, height: 30}}
	          		size="large" />
	      	);
	    }
	    else {
			return (
				<View style={{flex: 1}}>
					<ListView
						refreshControl={
			              	<RefreshControl
			                	refreshing={this.state.refreshing}
			                	onRefresh={this.refreshEvents} />
			            }
						style={{flex: 1}}
						dataSource={this.state.eventList}
	            		renderRow={this.renderRow}
	            		enableEmptySections={true} />
				</View>
			);
		}
	}
});

module.exports = Feed;