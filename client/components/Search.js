import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import GooglePlacesInput from './GooglePlacesInput';
import { withNavigation } from 'react-navigation';

class Search extends Component {
  render() {
    const { navigation } = this.props;
    const groupName = navigation.getParam('groupName');
    const members = navigation.getParam('members');
    console.log('SEARCH GROUP', members);
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
