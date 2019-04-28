import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { fetchPlaces } from '../store/reducers/places';

class Group extends Component {
  componentDidMount() {
    const user = firebase.auth().currentUser;
    const { navigation } = this.props;
    const group = navigation.getParam('group');
    this.props.fetchPlaces(user.email, group.groupName);
  }
  render() {
    console.log('MEMBERS', this.props.group.members);
    const { places, loading } = this.props.places;
    const { navigation } = this.props;
    const group = navigation.getParam('group');
    if (loading) {
      return <ActivityIndicator />;
    } else if (!loading && !places.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{group.groupName}</Text>
          <Text style={styles.text}>
            Members of this group: {this.props.group.members.join(', ')}
          </Text>
          <Text style={styles.title}>No Places in this group yet</Text>
          <TouchableOpacity style={styles.addButtonContainer}>
            <Text
              onPress={() =>
                this.props.navigation.navigate('Search', {
                  groupName: group.groupName,
                })
              }
              style={styles.buttonText}
            >
              ADD A PLACE
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{group.groupName}</Text>
        <Text style={styles.text}>
          Members of this group: {this.props.group.members.join(', ')}
        </Text>
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
        <TouchableOpacity style={styles.addButtonContainer}>
          <Text
            onPress={() =>
              this.props.navigation.navigate('Search', {
                groupName: group.groupName,
              })
            }
            style={styles.buttonText}
          >
            ADD A PLACE
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#4834d4',
  },
  title: {
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
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
  search: {
    height: 200,
  },
  addButtonContainer: {
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginBottom: 40,
  },
});

const mapState = state => ({
  places: state.places,
  group: state.group,
});

const mapDispatch = dispatch => ({
  fetchPlaces: (userEmail, groupName) =>
    dispatch(fetchPlaces(userEmail, groupName)),
});

export default connect(
  mapState,
  mapDispatch
)(Group);
