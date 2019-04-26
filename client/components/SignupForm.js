// import React, { Component } from 'react';
// import {
//   Text,
//   StyleSheet,
//   View,
//   StatusBar,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';

// export default class SignupForm extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <StatusBar barStyle="light-content" />
//         <TextInput
//           placeholder="email"
//           placeholderTextColor="rgba(255,255,255,0.7)"
//           onChangeText={email => this.setState({ email })}
//           value={this.state.email}
//           returnKeyType="next"
//           onSubmitEditing={() => this.passwordInput.focus()}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           autoCorrect={false}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="password"
//           placeholderTextColor="rgba(255,255,255,0.7)"
//           onChangeText={password => this.setState({ password })}
//           value={this.state.password}
//           returnKeyType="go"
//           secureTextEntry
//           style={styles.input}
//           ref={input => (this.passwordInput = input)}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     marginBottom: 20,
//     color: '#FFF',
//     paddingHorizontal: 10,
//     fontSize: 16,
//   },
//   buttonContainer: {
//     backgroundColor: '#ff9f1a',
//     paddingVertical: 15,
//     marginBottom: 10,
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: '#FFFFFF',
//     fontWeight: '700',
//   },
// });
