import {combineReducers} from 'redux';
import products from './products'
import posts from './posts';
import auth from './auth';
import errors from './errors';

export default combineReducers({
  products,
  posts,
  auth,
  errors,
})