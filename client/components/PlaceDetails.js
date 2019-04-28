import React, { Component } from 'react';
import { Text, StyleSheet, View, Linking } from 'react-native';
import Communications from 'react-native-communications';
import { withNavigation } from 'react-navigation';

class PlaceDetails extends Component {
  render() {
    const { navigation } = this.props;
    const place = navigation.getParam('place');
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{place.name}</Text>
        <Text style={styles.text}>{place.address}</Text>
        <Text style={styles.text}>Price Level: {place.priceLevel}</Text>
        <Text style={styles.text}>Star Rating: {place.starRating}</Text>
        <Text
          style={styles.text}
          onPress={() => Linking.openURL(place.website)}
        >
          {place.website}
        </Text>
        <Text
          style={styles.text}
          onPress={() => Communications.phonecall(place.phone, true)}
        >
          {' '}
          {place.phone}
        </Text>
        <Text style={styles.text}>{place.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    padding: 5,
    fontSize: 24,
    color: '#ffaf40',
  },
});

export default withNavigation(PlaceDetails);
