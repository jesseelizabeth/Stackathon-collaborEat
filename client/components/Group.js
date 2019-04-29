import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchPlaces } from '../store/reducers/places';
import { fetchGroup } from '../store/reducers/group';

class Group extends Component {
  componentDidMount() {
    const user = firebase.auth().currentUser;
    const { navigation } = this.props;
    const group = navigation.getParam('group');
    this.props.fetchPlaces(user.email, group.groupName);
  }
  render() {
    const { places, loading } = this.props.places;
    const { navigation } = this.props;
    const group = navigation.getParam('group');
    console.log('GROUPPPPP', group);
    if (loading) {
      return <ActivityIndicator size="large" />;
    } else if (!loading && !places.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{group.groupName}</Text>
          <Text style={styles.text}>Members of this group: </Text>
          <Text style={styles.text}>{group.members.join(', ')}</Text>
          <Text style={styles.title}>No Places in this group yet</Text>
          <TouchableOpacity style={styles.addButtonContainer}>
            <Text
              onPress={() =>
                this.props.navigation.navigate('Search', {
                  members: [...group.members],
                  groupName: group.groupName,
                })
              }
              style={styles.addPlaceText}
            >
              ADD A PLACE
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ScrollView>
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
          <TouchableOpacity style={styles.addButtonContainer}>
            <Text
              style={styles.addPlaceText}
              onPress={() =>
                this.props.navigation.navigate('Search', {
                  groupName: group.groupName,
                  members: [...group.members],
                })
              }
            >
              ADD A PLACE
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: '#4834d4',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    // color: '#4834d4',
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
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  addPlaceText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
});

const mapState = state => ({
  places: state.places,
  group: state.group,
});

const mapDispatch = dispatch => ({
  fetchPlaces: (userEmail, groupName) =>
    dispatch(fetchPlaces(userEmail, groupName)),
  fetchGroup: (groupName, userEmail) =>
    dispatch(fetchGroup(groupName, userEmail)),
});

export default connect(
  mapState,
  mapDispatch
)(withNavigation(Group));
