import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import firebase from 'firebase';

export default class Group extends Component {
  constructor() {
    super();
    this.state = {
      places: [],
      loading: true,
    };
  }
  componentDidMount() {
    const user = firebase.auth().currentUser;
    const { navigation } = this.props;
    const group = navigation.getParam('group');
    firebase
      .firestore()
      .collection('users')
      .doc(user.email)
      .collection('groups')
      .doc(group.groupName)
      .collection('places')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          // this.state.places.push(doc.data());
          this.setState(prevState => ({
            places: [doc.data(), ...prevState.places],
          }));
        });
        this.setState({ loading: false });
      });
  }
  render() {
    const { places, loading } = this.state;
    const { navigation } = this.props;
    const group = navigation.getParam('group');
    if (loading) {
      return <ActivityIndicator />;
    } else if (!loading && !places.length) {
      return (
        <View>
          <Text>No Places</Text>
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
        <Text style={styles.groupName}>{group.groupName}</Text>
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
    padding: 20,
  },
  groupName: {
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 20,
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
  search: {
    height: 200,
  },
  addButtonContainer: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
});
