import keyMirror from 'keymirror';

const ActionsTypes = keyMirror({
    FETCH_PRODUCTS_REQUEST: null,
    FETCH_PRODUCTS_SUCCESS: null,
    FETCH_PRODUCTS_ERROR: null,
    FETCH_POSTS_REQUEST: null,
    FETCH_POSTS_SUCCESS: null,
    FETCH_POSTS_ERROR: null,
    SEARCH: null,
    SORT_PRICE_FROM_HIGH: null,
    SORT_PRICE_FROM_LOW: null,
    SORT_BY_POPULARITY: null,
    SORT_BY_SALE: null,
    SORT_BY_ID: null,
    ADD_TO_CART: null,
    ADD_TO_COMPARE: null,
    REMOVE_FROM_CART: null,
    REMOVE_FROM_COMPARE: null,
    CLEAR_CART: null,
    CLEAR_COMPARE: null,
    UPDATE_CART_PRODUCT_COUNT: null,
    CHECKOUT: null,
    CONFIRM_ORDER_SUCCESS: null,
    CONFIRM_ORDER_FAILURE: null,
    RESET_ORDER_SUCCESS: null,
    SET_PROMO_CODE: null,
    CHANGE_VIEW: null,
    CHANGE_CURRENCY: null,
    CHANGE_COLOR: null,
    COMPARE_PRODUCT: null,
    GET_ERRORS: null,
    USER_LOADING: null,
    SET_CURRENT_USER: null,
})

export default ActionsTypes;