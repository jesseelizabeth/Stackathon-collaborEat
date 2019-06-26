import firebase from 'firebase';

// action type
const GET_USER = 'GET_USER';

// action creator
const gotUser = user => ({
  type: GET_USER,
  user,
});

// thunk
export const getUser = () => async dispatch => {
  let currentUser = {};
  // get currently signed in user
  await firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser.email = user.email;
      currentUser.uid = user.uid;
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

const initialState = {
  user: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { user: action.user };
    default:
      return state;
  }
}
