import * as action from './actions';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import ActionsTypes from './../constants/index';
import setAuthToken from '../utils/setAuthToken';

export function fetchProducts() {
  return dispatch => {
    dispatch(action.fetchProductsRequest());
    return axios.get("/products").then(response => Promise.all([response, response.data]))
    .then(([response, data]) => {
      if(response.status === 200) {
        dispatch(action.fetchProductsSuccess(data))}
      else {
        dispatch(action.fetchProductsFailure())
    }
    })
  }
}

export function fetchPosts() {
  return dispatch => {
    dispatch(action.fetchPostsRequest());
    return axios.get("/posts").then(response => Promise.all([response, response.data]))
    .then(([response, data]) => {
      if(response.status === 200) {
        dispatch(action.fetchPostsSuccess(data))}
      else {
        dispatch(action.fetchPostsFailure())
    }
    })
  }
}

export const registerUser = (userData, history) => dispatch => {
  axios.post("/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => 
      dispatch({
        type: ActionsTypes.GET_ERRORS,
        payload: err.response.data
      }));
};

export const loginUser = userData => dispatch => {
  axios.post("/users/login", userData)
    .then(res => {
      const {token} = res.data;
      localStorage.setItem("jwtToken",token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => 
      dispatch({
        type: ActionsTypes.GET_ERRORS,
        payload: err.response.data
      }))
  }

export const setCurrentUser = decoded => {
  return {
    type: ActionsTypes.SET_CURRENT_USER,
    payload: decoded
  }
}

export const setUserLoading = () => {
  return {
    type: ActionsTypes.USER_LOADING
  }
}

export const resetPassword = userData => dispatch => {
  axios.post("/users/reset", userData)
  console.log(userData)
  .then(res => res.data)
  .catch(err => 
    dispatch({
      type: ActionsTypes.GET_ERRORS,
      payload: err.response.data
    }))
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}



