import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Login from './Login';

export default class Home extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            collabor<Text style={styles.bold}>eat</Text>
          </Text>
          <Image
            style={styles.logo}
            source={require('../images/collaboreat.png')}
          />
        </View>
        <View style={styles.formContainer}>
          <Login n />
        </View>
        <Button
          color="white"
          onPress={() => this.props.navigation.navigate('Signup')}
          title="Sign Up"
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4834d4',
  },
  titleContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    opacity: 0.7,
    marginTop: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 40,
    color: '#FFF',
    textAlign: 'center',
  },
});
