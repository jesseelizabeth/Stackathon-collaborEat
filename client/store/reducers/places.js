import firebase from 'firebase';

const initialState = {
  places: [],
  loading: true,
};

// action type
const FETCH_PLACES = 'FETCH_PLACES';

// action creators
const gotPlaces = places => ({
  type: FETCH_PLACES,
  places,
});

// thunk
export const fetchPlaces = (userEmail, groupName) => async dispatch => {
  let placesArr = [];
  const places = await firebase
    .firestore()
    .collection('users')
    .doc(userEmail)
    .collection('groups')
    .doc(groupName)
    .collection('places')
    .get();
  places.docs.forEach(doc => {
    placesArr.push(doc.data());
  });
  dispatch(gotPlaces(placesArr));
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLACES:
      return { ...state, places: action.places, loading: false };
    default:
      return state;
  }
}
