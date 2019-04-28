import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { createGroup, addAllMembers } from '../store/reducers/group';

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      userEmail: '',
      friends: [],
    };
    this.addUser = this.addUser.bind(this);
    this.create = this.create.bind(this);
  }
  addUser() {
    this.state.friends.push(this.state.userEmail);
    this.setState({ userEmail: '' });
  }
  create(groupName, friends) {
    const user = firebase.auth().currentUser;
    this.props.createGroup(groupName, user.email);
    friends.map(friend => this.props.createGroup(groupName, friend));
    this.props.addAllMembers(this.state.friends, groupName);
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
          ? this.state.friends.map((friend, index) => (
              <Text key={index}>{friend}</Text>
            ))
          : null}
        <TouchableOpacity style={styles.buttonContainer}>
          <Text onPress={() => this.addUser()} style={styles.buttonText}>
            add friend
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            onPress={() =>
              this.create(this.state.groupName, this.state.friends)
            }
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

const mapDispatch = dispatch => ({
  createGroup: (groupName, userEmail) =>
    dispatch(createGroup(groupName, userEmail)),
  addAllMembers: (members, groupName) =>
    dispatch(addAllMembers(members, groupName)),
});

export default connect(
  null,
  mapDispatch
)(CreateGroup);
