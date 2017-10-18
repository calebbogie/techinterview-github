import React, { Component } from 'react';
import {
	ActivityIndicator,
    AppRegistry,
  	Modal,
  	StyleSheet,
  	Text,
  	TextInput,
  	TouchableHighlight,
  	View
} from 'react-native';

const styles = require('../styles');

var LoginModal = React.createClass({
	getInitialState: function() {
		return {
			email: '',
			password: ''
		}
	},
	login: function() {
		// Call login function in parent component (GitHubDashboard)
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
	              		style={{marginRight: 15}}
	              	>
	              		<Text style={{color: '#fff', fontSize: 16}}>Login</Text>
	            	</TouchableHighlight>

	          	</View>
	          	<View style={{marginTop: 22, flex: 13}}>

	          		<Text style={{marginBottom: 15, fontSize: 25, alignSelf: 'center'}}>GitHub Login</Text>

	            	<TextInput
	            		placeholder=" Email"
				        style={{marginLeft: 10, marginRight: 10, height: 40, borderColor: 'gray', borderWidth: 1}}
				        onChangeText={(email) => this.setState({email})}
				        value={this.state.email} />

				    <TextInput
	            		placeholder=" Password"
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