import ActionsTypes from './../constants';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export default (state=initialState, action) => {
  switch (action.type) {
    case ActionsTypes.FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case ActionsTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload.posts,
      }
    case ActionsTypes.FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        posts: initialState.posts,
      }
    default:
      return state;
    }}