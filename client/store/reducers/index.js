import { combineReducers } from 'redux';
import groups from './groups';
import places from './places';
import group from './group';

const rootReducer = combineReducers({ groups, places, group });

export default rootReducer;
