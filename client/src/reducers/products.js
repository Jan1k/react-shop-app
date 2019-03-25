import ActionsTypes from './../constants';

const initialState = {
  items: [],
  visibleProducts: [],
  cart: [],
  comparecart: [],
  compareTotal: 0,
  cartTotal: 0,
  vat: 16, // in %
  orderSuccess: false,
  loading: false,
  toggled: true,
  error: null,
  searchValue: '',
  promoCode: [
    {
      code: 'FIRSTPROMOCODE',
      percentage: 10
    },
    {
      code: 'SECONDPROMOCODE',
      percentage: 5             
    },  
    {
      code: 'THIRDPROMOCODE',
      percentage: 3
    }
  ],
  usedPromoCode: null,
  deliveryOptions: [
    {
      id: 1,
      name: 'Standart',
      duration: '24 - 72 hours',
      cost: 10
    },
    {
      id: 2,
      name: 'Fastest',
      duration: '1-24 hours',
      cost: 20
    }
  ],
  usedCurrency: {"BR": 2,"symbol":"Br "},
  exchangeRates: {
    "base": "Br ",
    "date": "2019-02-11",
    "rates": {
        "BR": 2,
        "USD": 1,
        "RUB": 1.6,
        "EUR": 1.1,
        
    }
  },
  currencySymbols: {
    "BR": 'Br ',
    "USD": '$ ',
    "RUB": '₽ ',
    "EUR": '€ ',
},
};

export default (state=initialState, action) => {
  switch (action.type) {
    case ActionsTypes.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case ActionsTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.products,
        visibleProducts: action.payload.products,
        searchValue: initialState.searchValue
      }
    case ActionsTypes.FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: initialState.items,
      }
  
    case ActionsTypes.SEARCH:
      const searchValue = action.payload;
      const searchValueLowercase = searchValue.toLowerCase();
      const visibleProducts = searchValue
        ? state.items.filter((p) => p.name.toLowerCase().includes(searchValueLowercase)) 
        : state.items;
        return {
          ...state,
          searchValue,
          visibleProducts
        }

    case ActionsTypes.SORT_PRICE_FROM_HIGH:
      const FilterListFromHigh = state.items.sort((a,b) => (b.price - a.price))
      return {
        ...state,
        visibleProducts: [...FilterListFromHigh],
        searchValue: initialState.searchValue
      }
    case ActionsTypes.SORT_PRICE_FROM_LOW:
      const FilterListFromLow = state.items.sort((a,b) => (a.price - b.price))
      return {
        ...state,
        visibleProducts: [...FilterListFromLow],
        searchValue: initialState.searchValue
      }
    case ActionsTypes.SORT_BY_POPULARITY:
      const FilterPopularityList = state.items.sort((a,b) => (b.rating - a.rating))
      return {
        ...state,
        visibleProducts: [...FilterPopularityList],
        searchValue: initialState.searchValue
      }

    case ActionsTypes.SORT_BY_ID:
      const FilterIdList = state.items.sort((a,b) => (a.id - b.id))
      return {
        ...state,
        visibleProducts: [...FilterIdList],
        searchValue: initialState.searchValue
      }
    case ActionsTypes.SORT_BY_SALE:
      const FilterSaleList = state.visibleProducts.filter((el) => el.sale !== false)
      return {
        ...state,
        visibleProducts: [...FilterSaleList],
        searchValue: initialState.searchValue
      }  

    case ActionsTypes.ADD_TO_CART:
        let newCart = state.cart;
        let newCartTotal = state.cartTotal;

          let chkProductInCart = state.cart.find(product => product.id === action.productId);
          if (chkProductInCart) {
              if (chkProductInCart.count < action.productQuantity) {
                  newCart = state.cart.map(
                      product => (product.id === action.productId ?
                              {...product, count: product.count + 1} : product
                      ));
                  newCartTotal = state.cartTotal + 1
              } 
              else {
                console.log('Sorry! This product is out of stock')
              }
            } 
          else {
              newCart = state.cart.concat({id: action.productId, count: 1});
              newCartTotal = state.cartTotal + 1
              }
          
          
        return {
          ...state,
          cartTotal: newCartTotal,
          cart: newCart,
        };

    case ActionsTypes.ADD_TO_COMPARE:
      let newCompareCart = state.comparecart;
      let newCompareTotal = state.compareTotal;
      let chkProductInCompareCart = state.comparecart.find(product => product.id === action.productId);
      if (chkProductInCompareCart) {
        newCompareCart = state.comparecart.map(
          product => (product.id === action.productId ?
            {...product, product: product, count: product.count + 1} : product
            ));
            newCompareTotal = state.compareTotal + 1
      }
      else {
        newCompareCart = state.comparecart.concat({id: action.productId, product: action.product, count: 1})
        newCompareTotal = state.compareTotal + 1
      }
      return {
        ...state,
        comparecart: newCompareCart,
        compareTotal: newCompareTotal,
      }    

    case ActionsTypes.REMOVE_FROM_CART:
      newCart = state.cart.filter(product => product.id !== action.productId)
      return {
        ...state,
        cart: newCart,
        cartTotal: state.cartTotal - action.productCount
      }

    case ActionsTypes.REMOVE_FROM_COMPARE:
      newCompareCart = state.comparecart.filter(product => product.id !== action.productId)
      return {
        ...state,
        comparecart: newCompareCart,
        compareTotal: state.compareTotal - 1
      }  

    case ActionsTypes.UPDATE_CART_PRODUCT_COUNT:
      let product = state.cart.find(product => product.id === action.productId);
      let cartTotal = state.cartTotal;
      newCart = state.cart;
      if(product) {
        cartTotal = state.cartTotal - (product.count - action.newCountValue);
        newCart = state.cart.map(
          product => product.id === action.productId ?
          {...product, count: action.newCountValue} : product
        );
      }

      return {
        ...state,
        cart: newCart,
        cartTotal: cartTotal
      }  

    case ActionsTypes.CLEAR_CART:
    case ActionsTypes.CHECKOUT:
      return {
        ...state,
        cartTotal: initialState.cartTotal,
        cart: initialState.cart,
      }
      
    case ActionsTypes.CLEAR_COMPARE:
      return {
        ...state,
        comparecart: initialState.comparecart,
        compareTotal: initialState.compareTotal,
      }  

    case ActionsTypes.CONFIRM_ORDER_SUCCESS:
      return {
        ...state,
        cart: initialState.cart,
        cartTotal: initialState.cartTotal,
        comparecart: initialState.comparecart,
        compareTotal: initialState.compareTotal,
        toggled:initialState.toggled,
        orderSuccess: true,
      }  

    case ActionsTypes.RESET_ORDER_SUCCESS:
      return {
        ...state,
        orderSuccess: initialState.orderSuccess,
      }

    case ActionsTypes.CONFIRM_ORDER_FAILURE:
      return {
        ...state,
      }

    case ActionsTypes.SET_PROMO_CODE:
      return {
        ...state,
        usedPromoCode: action.promoCode
      }   

    case ActionsTypes.CHANGE_VIEW:
      return {
        ...state,
        toggled: !state.toggled
      }

    case ActionsTypes.CHANGE_CURRENCY:
        let currencyName = null;
        let currencyValue = null;
        let currencyObj = {};
        let currencyNameSearch = Object.keys(state.exchangeRates.rates).filter(rate => (
            action.currencyName === rate
        ));
        if (currencyNameSearch) {
            currencyName = action.currencyName;
            currencyValue = state.exchangeRates.rates[currencyName];

            currencyObj[currencyName] = currencyValue;
            currencyObj['symbol'] = state.currencySymbols[currencyName]
        }
        return {
          ...state,
          usedCurrency: currencyNameSearch ? currencyObj : this.state.usedCurrency
        }

    default:
      return state;
  }
}
