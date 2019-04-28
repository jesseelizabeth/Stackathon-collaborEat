import firebase from 'firebase';

// action type
const CREATE_GROUP = 'CREATE_GROUP';
const ADD_MEMBERS = 'ADD_MEMBERS';

// action creator
const newGroup = group => ({
  type: CREATE_GROUP,
  group,
});

const addMembers = members => ({
  type: ADD_MEMBERS,
  members,
});

// thunk
export const createGroup = (groupName, userEmail) => async dispatch => {
  const group = await firebase
    .firestore()
    .collection('users')
    .doc(userEmail)
    .collection('groups')
    .doc()
    .set({ groupName });
  dispatch(newGroup(group));
};

export const addAllMembers = (members, groupName) => async dispatch => {
  await members.forEach(member =>
    firebase
      .firestore()
      .collection('users')
      .doc(member)
      .collection('groups')
      .doc(groupName)
      .set({ members }, { merge: true })
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
      return { ...state, members: action.members };
    default:
      return state;
  }
}
