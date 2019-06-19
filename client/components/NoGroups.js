import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class NoGroups extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> You have no groups! </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate('CreateGroup')}
        >
          <Text style={styles.text}> Create a group </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: '#4834d4',
    padding: 20,
    borderRadius: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    width: 260,
    textAlign: 'center',
  },
});

export default withNavigation(NoGroups);
