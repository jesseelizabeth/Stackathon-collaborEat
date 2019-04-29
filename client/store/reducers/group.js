import firebase from 'firebase';

// action type
const CREATE_GROUP = 'CREATE_GROUP';
const ADD_MEMBERS = 'ADD_MEMBERS';
const FETCH_GROUP = 'FETCH_GROUP';

// action creator
const newGroup = group => ({
  type: CREATE_GROUP,
  group,
});

const addMembers = members => ({
  type: ADD_MEMBERS,
  members,
});

const gotGroup = group => ({
  type: FETCH_GROUP,
  group,
});

// thunk
export const createGroup = (groupName, members) => async dispatch => {
  const group = await members.forEach(member =>
    firebase
      .firestore()
      .collection('users')
      .doc(member)
      .collection('groups')
      .doc(groupName)
      .set({ groupName, members }, { merge: true })
  );
  // const group = await firebase
  //   .firestore()
  //   .collection('users')
  //   .doc(userEmail)
  //   .collection('groups')
  //   .doc()
  //   .set({ groupName });
  dispatch(newGroup(group));
};

export const fetchGroup = (groupName, user) => async dispatch => {
  const group = await firebase
    .firestore()
    .collection('users')
    .doc(user)
    .collection('groups')
    .doc(groupName)
    .get();
  dispatch(gotGroup(group));
};

export const addAllMembers = (members, groupName) => async dispatch => {
  await members.forEach(member =>
    firebase
      .firestore()
      .collection('users')
      .doc(member)
      .collection('groups')
      .doc(groupName)
      .set({ groupName, members }, { merge: true })
  );
  dispatch(addMembers(members));
};

const initialState = {
  group: {},
  members: [],
  loadig: true,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_GROUP:
      return { ...state, group: action.group, loading: false };
    case ADD_MEMBERS:
      return { ...state, members: action.members, loadig: false };
    default:
      return state;
  }
}
