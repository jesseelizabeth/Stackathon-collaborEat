import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import GooglePlacesInput from './GooglePlacesInput';
import { withNavigation } from 'react-navigation';

class Search extends Component {
  render() {
    const { navigation } = this.props;
    const groupName = navigation.getParam('groupName');
    return (
      <View style={styles.container}>
        <GooglePlacesInput groupName={groupName} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 400,
  },
});

export default withNavigation(Search);
