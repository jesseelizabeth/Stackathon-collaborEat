import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { addNewPlace } from '../store/reducers/place';

class AddPlace extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      members: navigation.getParam('members'),
      groupName: navigation.getParam('groupName'),
      name: navigation.getParam('name'),
      address: navigation.getParam('address'),
      priceLevel: navigation.getParam('priceLevel'),
      starRating: navigation.getParam('starRating'),
      website: navigation.getParam('website'),
      phone: navigation.getParam('phone'),
      description: '',
      tags: [],
      tag: '',
    };
    this.addPlace = this.addPlace.bind(this);
    this.addTag = this.addTag.bind(this);
  }
  addPlace() {
    let {
      members,
      groupName,
      name,
      address,
      priceLevel,
      starRating,
      website,
      phone,
      description,
      tags,
    } = this.state;
    const user = firebase.auth().currentUser;
    if (priceLevel === undefined) {
      priceLevel = ' ';
    }
    this.props.addNewPlace(groupName, user.email, {
      name,
      address,
      priceLevel,
      starRating,
      website,
      phone,
      description,
      tags,
    });
    return this.props.navigation.navigate('MyGroups');
  }
  addTag() {
    this.state.tags.push(this.state.tag);
    this.setState({ tag: '' });
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
        {this.state.tags.length
          ? this.state.tags.map(tag => (
              <Text style={styles.text} key={tag}>
                {tag}
              </Text>
            ))
          : null}
        <Picker
          selectedValue={this.state.tag}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ tag: itemValue })
          }
        >
          <Picker.Item label="Add some tags" value="add some tags" />
          <Picker.Item label="Dates" value="Dates" />
          <Picker.Item label="Ambiance" value="Ambiance" />
          <Picker.Item label="Groups" value="Groups" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Drinks" value="Drinks" />
          <Picker.Item label="Casual" value="Casual" />
          <Picker.Item label="Fancy" value="Fancy" />
        </Picker>
        <View style={styles.center}>
          <TouchableOpacity style={styles.addTag}>
            <Text style={styles.addTagText} onPress={this.addTag}>
              Add Tag
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={() => this.addPlace()}>
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
    height: 40,
  },
  buttonContainer: {
    backgroundColor: '#eb4d4b',
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
  },
  addTag: {
    backgroundColor: '#4834d4',
    width: 140,
    padding: 10,
    borderRadius: 20,
  },
  addTagText: {
    color: 'white',
    textAlign: 'center',
  },
  center: {
    alignItems: 'center',
  },
});

const mapDispatch = dispatch => ({
  addNewPlace: (groupName, members, placeInfo) =>
    dispatch(addNewPlace(groupName, members, placeInfo)),
});

export default connect(
  null,
  mapDispatch
)(AddPlace);
