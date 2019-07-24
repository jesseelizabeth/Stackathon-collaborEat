import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class NoGroups extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> You have no groups! </Text>
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
  title: {
    fontSize: 26,
    textAlign: 'center',
    padding: 20,
    fontWeight: 'bold',
  },
});

export default withNavigation(NoGroups);
