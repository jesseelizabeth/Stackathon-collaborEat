import firebase from 'firebase';

// login
export const login = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

// signup
export const signup = (email, password, username) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res =>
      firebase
        .firestore()
        .collection('users')
        .doc(res.user.uid)
        .set({
          username,
          friends: [],
        })
    );

export const currentUser = () =>
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log('user signed in!', user);
    } else {
      console.log('No user signed in');
    }
  });
