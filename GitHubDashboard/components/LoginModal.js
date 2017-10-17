import React, { Component } from 'react';
import {
	ActivityIndicator,
    AppRegistry,
  	Modal,
  	NavigatorIOS,
  	StyleSheet,
  	TabBarIOS,
  	Text,
  	TextInput,
  	TouchableHighlight,
  	View
} from 'react-native';

const styles = require('../styles');

var LoginModal = React.createClass({
	getInitialState: function() {
		return {
			loggingIn: false,
			email: '',
			password: ''
		}
	},
	showActivityIndicator: function() {
	    if (this.state.loggingIn) {
	      	return (
	        	<View style={{alignItems: 'center'}}>
	          		<ActivityIndicator
	            		animating={this.state.loggingIn}
	            		style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 30, height: 30}}
	            		size="large" />
	          		<Text style={{fontSize: 18, color: 'gray', alignItems: 'center', justifyContent: 'center', paddingBottom: 20}}>Logging in...</Text>
	        	</View>
	      	);
	    }
	},
	login: function() {
		this.props.login(this.state.email, this.state.password)
	},
	render: function() {
		return (
			<Modal
	          	animationType={"slide"}
	          	transparent={false}
	          	visible={true}
	        >
	          	<View style={styles.navBarContainer}>

	            	<TouchableHighlight
	              		underlayColor={'transparent'}
	              		onPress={this.login}
	              		style={{marginLeft: 15}}
	              	>
	              		<Text style={{color: '#fff', fontSize: 16}}>Login</Text>
	            	</TouchableHighlight>

	          	</View>
	          	<View style={{marginTop: 22, flex: 13}}>

	            	{this.showActivityIndicator()}

	            	<TextInput
	            		placeholder="Email"
				        style={{marginLeft: 10, marginRight: 10, height: 40, borderColor: 'gray', borderWidth: 1}}
				        onChangeText={(email) => this.setState({email})}
				        value={this.state.email} />

				    <TextInput
	            		placeholder="Password"
	            		secureTextEntry={true}
				        style={{marginTop: 20, marginLeft: 10, marginRight: 10, height: 40, borderColor: 'gray', borderWidth: 1}}
				        onChangeText={(password) => this.setState({password})}
				        value={this.state.password} />
	        

	        	</View>
	        </Modal>
		);
	}
});

module.exports = LoginModal;