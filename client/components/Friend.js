import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Friend = props => {
  const { username } = props;
  return (
    <View>
      <Text> {username} </Text>
    </View>
  );
};

export default Friend;

const styles = StyleSheet.create({});
