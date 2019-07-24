import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchGroups } from '../store/reducers/groups';
import NoGroups from './NoGroups';

class MyGroups extends Component {
  componentDidMount() {
    const { user } = this.props;
    this.props.fetchGroups(user.uid);
  }
  render() {
    const { groups, loading } = this.props.groups;
    if (loading) {
      return <ActivityIndicator size="large" />;
    } else if (!loading && !groups.length) {
      return <NoGroups />;
    }
    return (
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Groups:</Text>
        </View>
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

const mapState = state => ({
  groups: state.groups,
  user: state.auth.user,
});

const mapDispatch = dispatch => ({
  fetchGroups: userId => dispatch(fetchGroups(userId)),
});
export default connect(
  mapState,
  mapDispatch
)(MyGroups);

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  groupContainer: {
    backgroundColor: '#4834d4',
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
    padding: 15,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    padding: 20,
    fontWeight: 'bold',
  },
});
