// import React, { Component } from 'react';
// import { StyleSheet, View, Button } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';

// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//     };
//   }
//   handleSubmit() {}
//   render() {
//     return (
//       <View style={styles.container}>
//         <TextInput
//           placeholder="username"
//           onChangeText={username => this.setState({ username })}
//           value={this.state.username}
//         />
//         <TextInput
//           placeholder="password"
//           onChangeText={password => this.setState({ password })}
//           value={this.state.password}
//         />
//         <Button onPress={this.handleSubmit} title="Login" />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   bold: {
//     fontWeight: 'bold',
//   },
//   thin: {
//     fontWeight: 'normal',
//   },
// });
