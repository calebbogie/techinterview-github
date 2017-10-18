import React, { Component } from 'react';
import {
	ActivityIndicator,
	AlertIOS,
 	AppRegistry,
	ListView,
	RefreshControl,
	StyleSheet,
	Text,
	View
} from 'react-native';

const styles = require('../styles');

var Event = require('./Event');

var Feed = React.createClass({
	getInitialState: function() {
		// Create listview
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
		// Set "downloading" to true so that the activity indicator will appear
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

	    // Issue https request to download public events
    	fetch('https://api.github.com/events')
      	.then(handleErrors)
      	.then((response) => response.json())
      	.then((responseJson) => {
      		var events = this.state.events.slice();

      		// Save public events and add them to the list view
      		this.setState({
      			eventList: this.state.eventList.cloneWithRows(responseJson),
      			events: responseJson,
      			downloading: false,
      			refreshing: false
      		})

      	})
      	.catch((error) => {
        	this.setState({downloading: false});

          	AlertIOS.alert(
            	'An error occurred',
            	'',
            	[
              		{text: 'OK'}
            	],
          	);

      	});
	},
	refreshEvents: function() {
		// Set "refreshing" to true so that the pull down activity indicator will appear
		this.setState({refreshing: true});
		this.downloadEvents();
	},
	renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
		// Render each event
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
				<View style={{flex: 1, paddingBottom: 60}}>
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