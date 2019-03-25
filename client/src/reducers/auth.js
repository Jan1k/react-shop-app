import ActionsTypes from './../constants';

const isEmpty = require('is-empty');

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case ActionsTypes.USER_LOADING:
      return {
        ...state,
        loading: true,
      }  
  
    default:
      return state;
  }
}