import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';

export default class MyGroups extends Component {
  constructor() {
    super();
    this.state = {
      groups: [],
      loading: true,
    };
  }
  componentDidMount() {
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('users')
      .doc(user.email)
      .collection('groups')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.setState(prevState => ({
            groups: [doc.data(), ...prevState.groups],
          }));
        });
        this.setState({ loading: false });
      });
  }
  render() {
    const { groups, loading } = this.state;
    if (loading) {
      return <ActivityIndicator />;
    } else if (!loading && !groups.length) {
      return <Text>No Groups</Text>;
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          {groups.map((group, index) => (
            <View key={index} style={styles.view}>
              <TouchableOpacity style={styles.groupContainer}>
                <Text
                  style={styles.group}
                  onPress={() =>
                    this.props.navigation.navigate('Group', { group })
                  }
                >
                  {group.groupName}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  groupContainer: {
    backgroundColor: '#ffaf40',
    padding: 20,
    borderRadius: 20,
  },
  group: {
    color: 'white',
    fontSize: 20,
    width: 260,
    textAlign: 'center',
  },
  view: {
    padding: 20,
  },
});
