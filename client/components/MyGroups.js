import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Group from './Group';
import firebase from 'firebase';

export default class MyGroups extends Component {
  constructor() {
    super();
    const user = firebase.auth().currentUser;
    console.log(user);
    this.listGroups = this.listGroups.bind(this);
  }
  componentDidMount() {
    this.listGroups();
  }
  async listGroups() {
    const groupsRef = firebase.firestore().collection('groups');
    const groups = await groupsRef.get();
    groups.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Group />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
