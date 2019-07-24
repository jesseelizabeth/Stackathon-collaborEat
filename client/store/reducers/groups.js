import firebase from 'firebase';

const initialState = {
  groups: [],
  loading: true,
};

// action type
const FETCH_GROUPS = 'FETCH_GROUPS';

// action creators
const gotGroups = groups => ({
  type: FETCH_GROUPS,
  groups,
});

// thunk
export const fetchGroups = userId => async dispatch => {
  let groupsArr = [];
  const groups = await firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('groups')
    .get();
  groups.docs.forEach(doc => {
    groupsArr.push(doc.data());
  });
  dispatch(gotGroups(groupsArr));
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_GROUPS:
      return { ...state, groups: action.groups, loading: false };
    default:
      return state;
  }
}
