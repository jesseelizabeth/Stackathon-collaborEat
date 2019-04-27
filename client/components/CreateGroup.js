import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'firebase';

export default class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.state = {
      groupName: '',
      userEmail: '',
      friends: [],
    };
    // this.addUser = this.addUser.bind(this);
    this.createGroup = this.createGroup.bind(this);
  }
  // addUser() {
  //   this.ref.get({ email: this.state.userEmail });
  // }
  createGroup(groupName, userEmail) {
    firebase
      .firestore()
      .collection('groups')
      .doc()
      .set({ groupName, userEmail });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            placeholder="Name your group"
            onChangeText={groupName => this.setState({ groupName })}
            value={this.state.groupName}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Add friends"
            onChangeText={userEmail => this.setState({ userEmail })}
            value={this.state.userEmail}
          />
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            onPress={() =>
              this.createGroup(this.state.groupName, this.state.userEmail)
            }
            style={styles.buttonText}
          >
            ADD
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: '#ff9f1a',
    paddingVertical: 15,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
