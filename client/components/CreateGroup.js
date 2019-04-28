import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import firebase from 'firebase';

export default class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      userEmail: '',
      friends: [],
    };
    this.addUser = this.addUser.bind(this);
    this.createGroup = this.createGroup.bind(this);
  }
  addUser(groupName) {
    firebase
      .firestore()
      .collection('users')
      .doc(this.state.userEmail)
      .collection('groups')
      .doc()
      .set({ groupName });
    this.state.friends.push(this.state.userEmail);
    this.setState({ userEmail: '' });
  }
  createGroup(groupName) {
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('users')
      .doc(user.email)
      .collection('groups')
      .doc()
      .set({ groupName });
    this.props.navigation.navigate('MyGroups');
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
            placeholder="Add a friend"
            onChangeText={userEmail => this.setState({ userEmail })}
            value={this.state.userEmail}
          />
        </View>
        {this.state.friends
          ? this.state.friends.map(friend => <Text>{friend}</Text>)
          : null}
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            onPress={() => this.addUser(this.state.groupName)}
            style={styles.buttonText}
          >
            add friend
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            onPress={() => this.createGroup(this.state.groupName)}
            style={styles.buttonText}
          >
            CREATE GROUP
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
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
  },
});
