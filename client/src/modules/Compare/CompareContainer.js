import { removeFromCompare, clearCompare,addToCart } from '../../actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Compare from './Compare';

const mapStateToProps = ({products}) => ({
  comparecart: products.comparecart,
  compareTotal: products.compareTotal,
  cart: products.cart,
  currency:products.usedCurrency,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addToCart: (productId, productQuantity) => (addToCart(productId, productQuantity)),
  removeFromCompare: (productId) => (removeFromCompare(productId)),
  clearCompare: () => (clearCompare()),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Compare);