import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityInicator,
  TouchableOpacity,
} from 'react-native';
import Group from './Group';
import firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';

export default class MyGroups extends Component {
  constructor() {
    super();
    this.state = {
      groups: [],
    };
    // this.fetchGroups = this.fetchGroups.bind(this);
  }
  componentWillMount() {
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('users')
      .doc(user.email)
      .collection('groups')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.state.groups.push(doc.data());
        });
      });
  }
  render() {
    const groups = this.state.groups;
    if (!groups.length) {
      return <Text>No Groups</Text>;
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          {/* <Group /> */}
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
