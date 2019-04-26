/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';

export default class Welcome extends React.Component {
  render() {
    const user = firebase.auth().currentUser;
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome back {user.email}!</Text>
        <Button
          title="CREATE A GROUP"
          onPress={() => this.props.navigation.navigate('CreateGroup')}
        />
        <Button
          title="VIEW YOUR GROUPS"
          onPress={() => this.props.navigation.navigate('MyGroups')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffaf40',
  },
  welcomeText: {
    alignItems: 'center',
  },
});
