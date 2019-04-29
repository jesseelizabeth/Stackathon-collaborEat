/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

export default class Welcome extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#4834d4',
    },
    headerTintColor: '#fff',
  };
  render() {
    const user = firebase.auth().currentUser;
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome back {user.email}!</Text>
        <View style={styles.view}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text
              style={styles.text}
              onPress={() => this.props.navigation.navigate('CreateGroup')}
            >
              CREATE A GROUP
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text
              style={styles.text}
              onPress={() => this.props.navigation.navigate('MyGroups')}
            >
              MY GROUPS
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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
