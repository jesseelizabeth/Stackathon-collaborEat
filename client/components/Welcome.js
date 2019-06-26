/* eslint-disable no-use-before-define */
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getUser } from '../store/reducers/auth';

class Welcome extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#4834d4',
    },
    headerTintColor: '#fff',
  };
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const { username } = this.props.user;
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome back {username}!</Text>
        {/* MY GROUPS */}
        <View style={styles.view}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('MyGroups')}
          >
            <Text style={styles.text}>MY GROUPS</Text>
          </TouchableOpacity>
        </View>
        {/* CREATE A GROUP */}
        <View style={styles.view}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('CreateGroup')}
          >
            <Text style={styles.text}>CREATE A GROUP</Text>
          </TouchableOpacity>
        </View>
        {/* ADD FRIENDS */}
        <View style={styles.view}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('AddFriends')}
          >
            <Text style={styles.text}>ADD FRIENDS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapState = state => ({
  user: state.auth.user,
});

const mapDispatch = dispatch => ({
  getUser: () => dispatch(getUser()),
});

export default connect(
  mapState,
  mapDispatch
)(Welcome);

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4834d4',
    alignItems: 'center',
  },
  welcomeText: {
    alignItems: 'center',
    color: 'white',
    padding: 30,
    fontSize: 20,
  },
  buttonContainer: {
    backgroundColor: '#eb4d4b',
    padding: 20,
    borderRadius: 20,
    width: 300,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  view: {
    padding: 20,
  },
});
