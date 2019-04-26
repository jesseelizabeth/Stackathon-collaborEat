import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
    };
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder="Name your group"
          onChangeText={groupName => this.setState({ groupName })}
          value={this.state.groupName}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
