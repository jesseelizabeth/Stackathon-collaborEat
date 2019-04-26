import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Login from './Login';
// import { Provider } from 'react-redux';
// import store from '../store';

export default class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return <Login />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
