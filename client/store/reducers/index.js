import { combineReducers } from 'redux';
import groups from './groups';
import places from './places';
import group from './group';
import auth from './auth';

const rootReducer = combineReducers({ groups, places, group, auth });

export default rootReducer;
