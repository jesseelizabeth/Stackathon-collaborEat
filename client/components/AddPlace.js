import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';

export default class AddPlace extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const groupName = navigation.getParam('groupName');
    const name = navigation.getParam('name');
    const address = navigation.getParam('address');
    const priceLevel = navigation.getParam('priceLevel');
    const starRating = navigation.getParam('starRating');
    const website = navigation.getParam('website');
    const phone = navigation.getParam('phone');
    this.state = {
      groupName,
      name,
      address,
      priceLevel,
      starRating,
      website,
      phone,
      description: '',
      // tags: []
    };
    this.addPlace = this.addPlace.bind(this);
  }
  addPlace(name, address, priceLevel, starRating, website, phone) {
    const user = firebase.auth().currentUser;
    const placeRef = firebase
      .firestore()
      .collection('users')
      .doc(user.email)
      .collection('groups')
      .doc(this.state.groupName) // target specific group
      .collection('places')
      .doc();
    placeRef.set({
      name,
      address,
      priceLevel,
      starRating,
      website,
      phone,
      description: this.state.description,
    });
    return this.props.navigation.navigate('MyGroups');
  }
  render() {
    const {
      name,
      address,
      priceLevel,
      starRating,
      website,
      phone,
    } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{address}</Text>
        <Text style={styles.text}>Price Level: {priceLevel}</Text>
        <Text style={styles.text}>Star Rating: {starRating}</Text>
        <Text style={styles.text}>{website}</Text>
        <Text style={styles.text}>{phone}</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          onChangeText={description => this.setState({ description })}
          value={this.state.description}
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            style={styles.buttonText}
            onPress={() =>
              this.addPlace(
                name,
                address,
                priceLevel,
                starRating,
                website,
                phone
              )
            }
          >
            ADD
          </Text>
        </TouchableOpacity>
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
    fontSize: 16,
  },
  input: {
    padding: 5,
    height: 100,
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
});
