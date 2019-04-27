import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';
import firebase from 'firebase';

export default class AddPlace extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const name = navigation.getParam('name');
    const address = navigation.getParam('address');
    const priceLevel = navigation.getParam('priceLevel');
    const starRating = navigation.getParam('starRating');
    const website = navigation.getParam('website');
    const phone = navigation.getParam('phone');
    this.state = {
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
      .doc() // target specific group
      .collection('places')
      .doc();
    placeRef.set({ name, address, priceLevel, starRating, website, phone });
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
      <View>
        <Text>{name}</Text>
        <Text>{address}</Text>
        <Text>{priceLevel}</Text>
        <Text>{starRating}</Text>
        <Text>{website}</Text>
        <Text>{phone}</Text>
        <TextInput
          placeholder="Description"
          onChangeText={description => this.setState({ description })}
          value={this.state.description}
        />
        <Button
          title="ADD"
          onPress={() =>
            this.addPlace(name, address, priceLevel, starRating, website, phone)
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
