import sessionReducer from './session';
import selectedCircleReducer from './selectedCircle';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    SESSION: sessionReducer,
    SELECTED_CIRCLE: selectedCircleReducer
})

export default allReducers;
