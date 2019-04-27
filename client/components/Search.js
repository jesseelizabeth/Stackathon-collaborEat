import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import GooglePlacesInput from './GooglePlacesInput';
import { withNavigation } from 'react-navigation';

class Search extends Component {
  render() {
    return (
      <View>
        <GooglePlacesInput />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default withNavigation(Search);
