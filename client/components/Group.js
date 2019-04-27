import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Button, Text } from 'react-native';
import GooglePlacesInput from './GooglePlacesInput';
import Search from './Search';

export default class Group extends Component {
  render() {
    const { navigation } = this.props;
    const group = navigation.getParam('group');
    return (
      <View style={styles.container}>
        <Text style={styles.groupName}>{group.groupName}</Text>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            onPress={() => this.props.navigation.navigate('Search')}
            style={styles.buttonText}
          >
            ADD A PLACE
          </Text>
        </TouchableOpacity>
        <View style={styles.search}>
          <GooglePlacesInput groupName={group.groupName} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  groupName: {
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 20,
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
  search: {
    height: 200,
  },
});
