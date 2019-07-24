import firebase from 'firebase';
import { Alert } from 'react-native';

// action type
const GET_USER = 'GET_USER';
const ADD_FRIEND = 'ADD_FRIEND';

// action creator
const gotUser = user => ({
  type: GET_USER,
  user,
});
const addedFriend = username => ({
  type: ADD_FRIEND,
  username,
});

// thunk
export const getUser = () => async dispatch => {
  let currentUser = {};
  // get currently signed in user
  await firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser.email = user.email;
      currentUser.uid = user.uid;
      currentUser.friends = [];
    } else {
      currentUser = null;
    }
  });
  // get username
  const username = await firebase
    .firestore()
    .collection('users')
    .doc(currentUser.uid)
    .get();
  currentUser.username = username.data().username;

  dispatch(gotUser(currentUser));
};

export const addFriend = (friend, user) => async dispatch => {
  // check if user exists
  const userRef = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', friend.toLowerCase())
    .limit(1)
    .get();

  userRef.forEach(doc =>
    doc.id ? addToFirebase() : console.log('NO USER EXISTS')
  );

  async function addToFirebase() {
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        friends: firebase.firestore.FieldValue.arrayUnion(friend.toLowerCase()),
      });
    dispatch(addedFriend(friend));
  }
};

const initialState = {
  user: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { user: action.user };
    case ADD_FRIEND:
      const username = action.username.toLowerCase();
      if (state.user.friends.includes(username)) {
        return state;
      } else {
        return {
          ...state,
          user: {
            ...state.user,
            friends: [...state.user.friends, username],
          },
        };
      }
    default:
      return state;
  }
}
