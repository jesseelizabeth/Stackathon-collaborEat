import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Picker,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { filterPlaces } from '../store/reducers/places';
import firebase from 'firebase';

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      tag: '',
    };
  }
  render() {
    const { navigation } = this.props;
    const groupName = navigation.getParam('groupName');
    const { places, loading } = this.props.places;
    if (loading) {
      return <ActivityIndicator />;
    } else if (!loading && !places.places.length) {
      return <Text>No places with that tag</Text>;
    }
    return (
      <View>
        <Picker
          selectedValue={this.state.tag}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ tag: itemValue })
          }
        >
          <Picker.Item label="Filter by tag" value="filter by tag" />
          <Picker.Item label="Dates" value="Dates" />
          <Picker.Item label="Ambiance" value="Ambiance" />
          <Picker.Item label="Groups" value="Groups" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Drinks" value="Drinks" />
          <Picker.Item label="Casual" value="Casual" />
          <Picker.Item label="Fancy" value="Fancy" />
        </Picker>
        <TouchableOpacity>
          <Text
            onPress={this.props.filterPlaces(
              firebase.auth().currentUser.email,
              groupName,
              this.state.tag
            )}
          >
            Filter
          </Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.title}>{group.groupName}</Text>
          <Text style={styles.text}>Members of this group: </Text>
          <Text style={styles.text}>{group.members.join(', ')}</Text>
          {places.map((place, index) => (
            <View key={index}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text
                  onPress={() =>
                    this.props.navigation.navigate('PlaceDetails', { place })
                  }
                  style={styles.buttonText}
                >
                  {place.name}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapState = state => ({
  places: state.places,
});

const mapDispatch = dispatch => ({
  filterPlaces: (userEmail, groupName, tag) =>
    dispatch(filterPlaces(userEmail, groupName, tag)),
});

export default connect(
  mapState,
  mapDispatch
)(Filter);
