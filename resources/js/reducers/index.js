import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer'
import notifyReducer from './notifyReducer';
import postReducer from './postReducer';
import storeReducer from './storeReducer';
import customerReducer from './customerReducer';

export default combineReducers({
  loading: loadingReducer,
  notify: notifyReducer,
  posts: postReducer,
  stores: storeReducer,
  customers: customerReducer,
});
