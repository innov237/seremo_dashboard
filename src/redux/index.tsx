/*import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import AuthReducer from './Auth/Index'
import { composeWithDevTools } from 'redux-devtools-extension';
*/

import AuthReducer from './Auth/Index'
import { createStore, applyMiddleware } from 'redux';
import { CorsMiddleware } from '../Middlewares/Cors'


const createStoreWithMiddleware = applyMiddleware(
    CorsMiddleware,
  )(createStore);
  
  const store = createStoreWithMiddleware(AuthReducer);


  /*
const store = createStore(
    AuthReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);*/

export default store;