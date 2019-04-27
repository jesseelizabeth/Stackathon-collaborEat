import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Button } from 'react-native';
import { API_KEY } from '../../googlePlaces';
import firebase from 'firebase';
import GooglePlacesInput from './GooglePlacesInput';

export default class Group extends Component {
  constructor() {
    super();
    this.ref = firebase
      .firestore()
      .collection('places')
      .doc();
    this.state = {
      search: '',
      name: '',
      address: '',
    };
    // this.findPlace = this.findPlace.bind(this);
    // this.savePlace = this.savePlace.bind(this);
  }
  // async findPlace() {
  //   let { search } = this.state;
  //   search = search.split(' ');
  //   search = search.join('%20');
  //   const response = await fetch(
  //     `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${search}&inputtype=textquery&fields=formatted_address,name&key=${API_KEY}`
  //   );
  //   let data = await response.json();
  //   if (!data.candidates.length) {
  //     console.log('No restaurant found');
  //   } else {
  //     this.setState({
  //       name: data.candidates[0].name,
  //       address: data.candidates[0].formatted_address,
  //     });
  //     this.savePlace();
  //     console.log('NAME', this.state.name, 'ADDRESS', this.state.address);
  //   }
  // }
  // savePlace() {
  //   console.log('SAVEPLACE', this.state);
  //   this.ref.set({ name: this.state.name, address: this.state.address });
  // }
  render() {
    return (
      <View>
        <GooglePlacesInput />
        {/* <TextInput
          placeholder="Add a place"
          onChangeText={search => this.setState({ search })}
          value={this.state.search}
        />
        <Button title="ADD" onPress={this.findPlace} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
