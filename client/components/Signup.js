import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.state = {
      loading: false,
      email: '',
      password: '',
      error: '',
    };
    this.signup = this.signup.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.singUpAndSaveUser = this.singUpAndSaveUser.bind(this);
  }
  signup() {
    this.setState({ loading: true });
    const { email, password } = this.state;
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ error: '', loading: false });
          this.props.navigation.navigate('Welcome');
        });
    } catch (error) {
      this.setState({ error: 'Authentication failed', loading: false });
    }
  }
  saveUser() {
    this.ref.add({ email: this.state.email });
  }
  singUpAndSaveUser() {
    this.saveUser();
    this.signup();
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    }
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TextInput
          placeholder="email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
          ref={input => (this.passwordInput = input)}
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text onPress={this.singUpAndSaveUser} style={styles.buttonText}>
            SIGN UP
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffaf40',
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: '#ff9f1a',
    paddingVertical: 15,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
