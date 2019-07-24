import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Linking,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Communications from 'react-native-communications';
import { withNavigation } from 'react-navigation';

class PlaceDetails extends Component {
  render() {
    const { navigation } = this.props;
    const place = navigation.getParam('place');
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{place.name}</Text>
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
          <Text style={styles.title}>Description:</Text>
          <Text style={styles.text}>{place.description}</Text>
          <Text style={styles.title}>Good for:</Text>
          {place.tags
            ? place.tags.map((tag, index) => (
                <TouchableOpacity style={styles.tags} key={index}>
                  <Text style={styles.tag}>{tag}</Text>
                </TouchableOpacity>
              ))
            : null}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  text: {
    padding: 5,
    fontSize: 16,
    color: 'black',
  },
  tags: {
    backgroundColor: '#4834d4',
    marginTop: 20,
    borderRadius: 20,
    width: 200,
  },
  tag: {
    margin: 10,
    padding: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 40,
    color: '#eb4d4b',
    paddingBottom: 20,
    paddingTop: 20,
    fontWeight: 'bold',
  },
});

export default withNavigation(PlaceDetails);
