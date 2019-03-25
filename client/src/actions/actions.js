import ActionsTypes from './../constants';

export const fetchProductsRequest = () => ({
  type: ActionsTypes.FETCH_PRODUCTS_REQUEST
})

export const fetchProductsSuccess = products => ({
  type: ActionsTypes.FETCH_PRODUCTS_SUCCESS,
  payload: {products}
})

export const fetchProductsFailure = error => ({
  type: ActionsTypes.FETCH_PRODUCTS_ERROR,
  payload: {error}
})

export const fetchPostsRequest = () => ({
  type: ActionsTypes.FETCH_POSTS_REQUEST
})

export const fetchPostsSuccess = posts => ({
  type: ActionsTypes.FETCH_POSTS_SUCCESS,
  payload: {posts}
})

export const fetchPostsFailure = error => ({
  type: ActionsTypes.FETCH_POSTS_ERROR,
  payload: {error}
})

export const fetchProductsFilter = searchValue => ({
  type: ActionsTypes.SEARCH,
  payload: searchValue,
})

export const fetchProductPriceFromHigh = () => ({
  type: ActionsTypes.SORT_PRICE_FROM_HIGH,
})

export const fetchProductPriceFromLow = () => ({
  type: ActionsTypes.SORT_PRICE_FROM_LOW,
})

export const fetchProductByPopularity = () => ({
  type: ActionsTypes.SORT_BY_POPULARITY,
})

export const fetchProductById = () => ({
  type: ActionsTypes.SORT_BY_ID,
})

export const fetchProductBySale = () => ({
  type: ActionsTypes.SORT_BY_SALE,
})

export const addToCart = (productId, productQuantity) => ({
  type: ActionsTypes.ADD_TO_CART,
  productId: productId,
  productQuantity: productQuantity,
})

export const addToCompare = (productId, product) => ({
  type: ActionsTypes.ADD_TO_COMPARE,
  productId: productId,
  product
})

export const removeFromCart = (productId, count) => ({
  type: ActionsTypes.REMOVE_FROM_CART,
  productId: productId,
  productCount: count,
})

export const removeFromCompare = (productId) => ({
  type: ActionsTypes.REMOVE_FROM_COMPARE,
  productId: productId,
})

export const clearCart = () => ({
  type: ActionsTypes.CLEAR_CART,
})

export const clearCompare = () => ({
  type: ActionsTypes.CLEAR_COMPARE,
})

export const toggle = (toggled) => ({
  type: ActionsTypes.CHANGE_VIEW,
  toggled
})

export const updateCartProductCount = (value, productId) => ({
  type: ActionsTypes.UPDATE_CART_PRODUCT_COUNT,
  newCountValue: value,
  productId: productId,
})

export const checkout = (ownProps) => {
  return dispatch => {
    dispatch(shoppingCheckout());
    ownProps.history.push('/checkout')
}
};

export const shoppingCheckout = () => ({
  type: ActionsTypes.CHECKOUT,
})

export const changeCurrency = (currencyName) => ({
  type: ActionsTypes.CHANGE_CURRENCY,
  currencyName: currencyName
})

export const confirmOrder = (order, ownProps) => {
  return dispatch => {
    console.log(order);
    dispatch(confirmOrderSuccess());
    ownProps.history.push('/cart');
    setTimeout(() => {
      dispatch(resetOrderSuccess())
    },10000)
  }
}

export const confirmOrderSuccess = () => ({
  type: ActionsTypes.CONFIRM_ORDER_SUCCESS 
})

export const resetOrderSuccess = () => ({
  type: ActionsTypes.RESET_ORDER_SUCCESS
})

export const confirmOrderFailure = () => ({
  type: ActionsTypes.CONFIRM_ORDER_FAILURE
})

export const setPromoCode = (promoCodeObject) => ({
  type: ActionsTypes.SET_PROMO_CODE,
  promoCode: promoCodeObject,
})




