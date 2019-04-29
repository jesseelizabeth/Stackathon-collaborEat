import firebase from 'firebase';

const initialState = {
  places: [],
  loading: true,
};

// action type
const FETCH_PLACES = 'FETCH_PLACES';
const FILTER_PLACES = 'FILTER_PLACES';

// action creators
const gotPlaces = places => ({
  type: FETCH_PLACES,
  places,
});

const filteredPlaces = places => ({
  type: FILTER_PLACES,
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

export const filterPlaces = (userEmail, groupName, tag) => async dispatch => {
  const results = [];
  const places = await firebase
    .firestore()
    .collection('users')
    .doc(userEmail)
    .collection('groups')
    .doc(groupName)
    .collection('places')
    .get();
  places.docs.forEach(place => {
    if (place.data().tags.includes(tag)) {
      results.push(place);
    }
  });
  dispatch(filteredPlaces(results));
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLACES:
      return { ...state, places: action.places, loading: false };
    case FILTER_PLACES:
      return { ...state, places: action.places, loading: false };
    default:
      return state;
  }
}
