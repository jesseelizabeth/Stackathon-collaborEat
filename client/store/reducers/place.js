import firebase from 'firebase';

// action type
const NEW_PLACE = 'NEW_PLACE';

// action creator
const newPlace = place => ({
  type: NEW_PLACE,
  place,
});

// thunk
export const addNewPlace = (
  groupName,
  userEmail,
  placeInfo
) => async dispatch => {
  const place = await firebase
    .firestore()
    .collection('users')
    .doc(userEmail)
    .collection('groups')
    .doc(groupName)
    .collection('places')
    .doc()
    .set(placeInfo);
  dispatch(newPlace(place));
};

const initialState = {
  place: {},
  loadig: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_PLACE:
      return { ...state, place: action.place, loading: false };
    default:
      return state;
  }
}
