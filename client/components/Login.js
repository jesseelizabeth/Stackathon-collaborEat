import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      error: '',
    };
    this.login = this.login.bind(this);
  }
  login() {
    this.setState({ loading: true });
    const { email, password } = this.state;
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ error: '', loading: false });
          this.props.navigation.navigate('Welcome');
        });
    } catch (error) {
      this.setState({ error: 'Authentication failed', loading: false });
    }
  }
  render() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar />
        <TextInput
          placeholder="email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          returnKeyType="next"
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
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text onPress={this.login} style={styles.buttonText}>
            LOGIN
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    backgroundColor: '#eb4d4b',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default withNavigation(Login);
