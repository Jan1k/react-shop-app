import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {addToCart} from '../../actions/actions';
import Mobile from './Mobile';

const mapStateToProps = ({ products }) => ({
  products: products.visibleProducts || [],
  currency: products.usedCurrency,
  cart: products.cart,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addProductToCartProp: (productId, productQuantity) => (addToCart(productId, productQuantity))
}, dispatch);



export default connect(mapStateToProps, mapDispatchToProps)(Mobile);