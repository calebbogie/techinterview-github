import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	buttonContainer: {
	    flexDirection: 'row',
	    padding: 10,
	    backgroundColor: '#FFFFFF',
	    borderColor: '#F6F6F6',
	    borderStyle: 'solid',
	    borderWidth: 2
	},
	navBarContainer: {
	    flex: 1,
	    flexDirection: 'row',
	    justifyContent: 'flex-end',
	    alignItems: 'center',
	    backgroundColor: '#66a3ff',
	    paddingTop: 20,
	}
});

module.exports = styles;