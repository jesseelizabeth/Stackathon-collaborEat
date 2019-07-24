import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { addFriend } from '../store/reducers/auth';
import Friend from './Friend';

class AddFriends extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { user, add } = this.props;
    add(this.state.username, user);
    this.setState({ username: '' });
  }
  render() {
    const { friends } = this.props.user;
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Add Friends </Text>
        <View style={styles.input}>
          <TextInput
            placeholder="username"
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleClick}
        >
          <Text style={styles.buttonText}>ADD FRIEND</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Friends:</Text>
        {friends.length > 0
          ? friends.map((friend, index) => (
              <Friend key={index} username={friend} />
            ))
          : null}
      </View>
    );
  }
}

const mapState = state => ({
  user: state.auth.user,
});

const mapDispatch = dispatch => ({
  add: (friend, user) => dispatch(addFriend(friend, user)),
});

export default connect(
  mapState,
  mapDispatch
)(AddFriends);

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
  text: {
    fontSize: 20,
    paddingBottom: 20,
  },
});
