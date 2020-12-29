import { combineReducers } from 'redux';
import { authReducer } from './Reducer';

const rootReducer = combineReducers({
  auth: authReducer
});


export default rootReducer;