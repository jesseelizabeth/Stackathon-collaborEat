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
  async componentDidMount() {
    await this.props.getUser();
  }

  render() {
    const { username } = this.props.user;
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome back {username}!</Text>
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
