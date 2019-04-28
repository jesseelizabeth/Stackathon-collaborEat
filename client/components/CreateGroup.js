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
    const user = firebase.auth().currentUser;
    this.state = {
      groupName: '',
      userEmail: '',
      friends: [user.email],
    };
    this.addUser = this.addUser.bind(this);
    this.create = this.create.bind(this);
  }
  addUser() {
    this.state.friends.push(this.state.userEmail);
    this.setState({ userEmail: '' });
  }
  create(groupName, friends) {
    this.props.createGroup(groupName, this.state.friends);
    // friends.map(friend => this.props.createGroup(groupName, friend));
    // this.props.addAllMembers(this.state.friends, groupName);
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
        <TouchableOpacity style={styles.addButton}>
          <Text onPress={() => this.addUser()} style={styles.buttonText}>
            add friend
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}>Friends currently in group:</Text>
        {this.state.friends
          ? this.state.friends.map((friend, index) => (
              <Text style={styles.subText} key={index}>
                {friend}
              </Text>
            ))
          : null}

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
    backgroundColor: '#eb4d4b',
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
  },
  addButton: {
    width: 140,
    backgroundColor: '#eb4d4b',
    marginBottom: 20,
    marginTop: 20,
    padding: 5,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    paddingBottom: 20,
  },
  subText: {
    paddingBottom: 10,
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
