import React, { Component } from 'react';
import {
  AlertIOS,
  AppRegistry,
  Image,
  Linking,
  ListView,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

const styles = require('../styles');

var EventDetails = React.createClass({
	getInitialState: function() {
		return {
			repoUrl: '',
			repoOwner: '',
			repoName: '',
			watchersCount: 0,
			openIssuesCount: 0,
			language: ''
		}
	},
	componentDidMount: function() {
		this.setState({downloading: true});

		function handleErrors(response) {
	      	if (!response.ok) {
	        	throw Error(response.statusText);
	      	}
	      	return response;
	    }

	    // Download repository information from the url passed in with the event object
    	fetch(this.props.event.repo.url)
      	.then(handleErrors)
      	.then((response) => response.json())
      	.then((responseJson) => {
      		
      		// Save repository information so that it can be displayed
      		this.setState({
      			repoUrl: responseJson.html_url,
      			repoOwner: responseJson.owner.login,
      			repoName: responseJson.full_name,
      			watchersCount: responseJson.watchers_count,
      			openIssuesCount: responseJson.open_issues_count,
      			language: responseJson.language
      		})

      	})
      	.catch((error) => {
        	this.setState({downloading: false});

          	AlertIOS.alert(
            	'Event details could not be downloaded',
            	'',
            	[
              		{text: 'OK'}
            	],
          	);

      	});
	},
	handleUrlPress: function() {

		var url = this.state.repoUrl;
    
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
			<View style={{flex: 1, marginLeft: 10}}>
				<View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
					<Image
						style={{marginTop: 10, width: 100, height: 100, borderColor: 'black', borderWidth: 1}}
			          	source={{uri: this.props.event.actor.avatar_url}} />

			        <View style={{flexDirection: 'column', marginLeft: 10}}>
				        <Text style={{fontSize: 20, flexWrap: 'wrap'}}>{this.props.event.type}</Text>
				        <Text style={{marginTop: 5}}>Event Actor: {this.props.event.actor.display_login}</Text>
				    </View>
			    </View>

		        <View style={{alignItems: 'center', borderRadius: 4, borderWidth: 2, borderColor: 'gray', marginRight: 10}}>
		         	<TouchableHighlight
						onPress={() => {
	            			this.handleUrlPress();
	          			}}
	          			underlayColor='transparent'
	      			>
		         		<Text style={{flexWrap: 'wrap', fontSize: 20, marginTop: 5, marginBottom: 5}}>View Repository Page</Text>
		         	</TouchableHighlight>
		        </View>

		        <View style={{marginTop: 10}}>
		        	<Text style={{fontSize: 25, marginBottom: 5}}>Repository Information</Text>
		        	<Text style={{fontSize: 15}}>Repository Owner: {this.state.repoOwner}</Text>
		        	<Text style={{fontSize: 15}}>Repository Name: {this.state.repoName}</Text>
		        	<Text style={{fontSize: 15}}>Watchers Count: {this.state.watchersCount}</Text>
		        	<Text style={{fontSize: 15}}>Open Issues Count: {this.state.openIssuesCount}</Text>
		        	<Text style={{fontSize: 15}}>Language: {this.state.language}</Text>
		       	</View>
		    </View>
		);
	}
});

module.exports = EventDetails;