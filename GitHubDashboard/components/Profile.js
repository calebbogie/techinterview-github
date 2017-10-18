import React, { Component } from 'react';
import {
	ActivityIndicator,
	AlertIOS,
 	AppRegistry,
 	Image,
 	Linking,
	ListView,
	RefreshControl,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';

const styles = require('../styles');

var Event = require('./Event');

var Profile = React.createClass({
	getInitialState: function() {
		var eventList = new ListView.DataSource({rowHasChanged: (r1, r2) => true});

		eventList = eventList.cloneWithRows([]);

		return {
			eventList: eventList,
			events: [],
			downloading: false,
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

	    // Issue https request to download user events
    	fetch('https://api.github.com/users/' + this.props.user.login + '/events')
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
	listView: function() {
		// Show activity indicator if the events are being downloaded
		if (this.state.downloading == true) {
			return (
				<ActivityIndicator
	          		animating={this.state.downloading}
	          		style={{alignItems: 'center', justifyContent: 'center', paddingTop: 50, paddingBottom: 20, height: 30}}
	          		size="large" />
			);
		}
		// Show list of events after the data has been downloaded
		else {
			return (
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
			);
		}
	},
	handleUrlPress: function() {

		var url = this.props.user.html_url;
    
    	// Prepend "https://" if the url doesn't already have it
	    if (!url.startsWith("https://")) {
	      	url = "https://" + url;
	    }

	    // Open URL in browser
	    Linking.canOpenURL(url).then(supported => {
	      	if (supported) {
	        	Linking.openURL(url).catch();
	      	} else {

	      	}
	    });
  	},
	render: function() {
		return (
			<View style={{flex: 1, marginLeft: 10, marginRight: 10, paddingBottom: 60}}>
				<View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
					<Image
						style={{marginTop: 10, width: 100, height: 100, borderColor: 'black', borderWidth: 1}}
			          	source={{uri: this.props.user.avatar_url}} />

			        <View style={{flexDirection: 'column', marginLeft: 15}}>
			        	<Text style={{fontSize: 25, flexWrap: 'wrap'}}>{this.props.user.login}</Text>
				    </View>
			    </View>

			    <View style={{alignItems: 'center', borderRadius: 4, borderWidth: 2, borderColor: 'gray', marginBottom: 10}}>
		         	<TouchableHighlight
						onPress={() => {
	            			this.handleUrlPress();
	          			}}
	          			underlayColor='transparent'
	      			>
		         		<Text style={{flexWrap: 'wrap', fontSize: 20, marginTop: 5, marginBottom: 5}}>View My GitHub</Text>
		         	</TouchableHighlight>
		        </View>

			    <View style={{flex: 1}}>
			    	{this.listView()}
			    </View>
		    </View>
		);
	}
});

module.exports = Profile;