import { addToCart, addToCompare, removeFromCompare, toggle } from '../../actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../../actions/actionsCreators';

import Catalog from './Catalog';

const mapStateToProps = ({ products }) => ({
  products: products.items,
  loading: products.loading,
  error: products.error,
  searchValue: products.searchValue,
  visibleProducts: products.visibleProducts,
  usedCurrencyProp:products.usedCurrency,
  cart: products.cart,
  compareTotalProp: products.compareTotal,
  compareCartProp: products.comparecart,
  toggled: products.toggled,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchProducts,
  addProductToCompareProp: (productId, product) => (addToCompare(productId, product)),
  removeProductFromCompareProp: (productId) => (removeFromCompare(productId)),
  changeview:(toggled) => (toggle(toggled)),
  addProductToCartProp: (productId, productQuantity) => (addToCart(productId, productQuantity)) 
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog);