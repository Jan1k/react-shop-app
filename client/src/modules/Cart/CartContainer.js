import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import CartProduct from './CartProduct';
import CartProductTotals from './CartProductTotals';
import { Link } from 'react-router-dom';
import {removeFromCart, clearCart, updateCartProductCount} from '../../actions/actions';
import OrderSuccess from '../OrderSuccess/OrderSuccess';
import { Container } from 'semantic-ui-react';


const style = {
  empty_cart: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '800px'
  },
}

class Cart extends Component {

  productCountHandler = (field_value, product_id) => {
    this.props.updateCartProductCountProp(field_value, product_id)
  }

  render() {
    let cartContent = null;
    let currencyKeys = Object.keys(this.props.usedCurrencyProp);
    let currencyValue = this.props.usedCurrencyProp[currencyKeys[0]];
    if (this.props.cartTotalProp > 0) {
      let cartPriceCountArray = [];
      let cartProducts = this.props.cartProductsProp
          .map((productInCart) => {
            let productFromStore = this.props.productProps.find(product => product.id === productInCart.id);
            cartPriceCountArray.push({
                    price: productFromStore.quantity > 0 ?
                        Math.round(productFromStore.price * currencyValue) : 0,
                    count: productInCart.count
                }
            );
            // console.log(cartPriceCountArray);
              return (
                  <CartProduct
                      key={productInCart.id}
                      productName={productFromStore.name}
                      productPhoto={productFromStore.img}
                      productPrice= {Math.round(productFromStore.price*currencyValue )}
                      productCount={productInCart.count}
                      productQuantity={productFromStore.quantity}
                      updateProductCount={(event) => this.productCountHandler(event.target.value, productInCart.id)}
                      removeCartProduct={() => this.props.removeProductFromCartProp(productInCart.id, productInCart.count)}
                      currency={this.props.usedCurrencyProp}
                  />
              )
          })

      let cartTotals = <CartProductTotals
          subtotal={cartPriceCountArray.reduce((acc, el) => acc + (el.price * el.count), 0)}
          vat={this.props.vatProp}
          clearCart={() => this.props.clearProductsFromCartProp()}
          currency={this.props.usedCurrencyProp}
      />;

      cartContent = (
          <React.Fragment>
              {cartProducts}
              {cartTotals}
          </React.Fragment>
      )
  }
      else if (this.props.cartTotalProp === 0 && this.props.orderSuccessProp) {
        cartContent = <OrderSuccess/>
    } else {
        cartContent = <h3 style={style.empty_cart}>Your cart is empty.&nbsp;<Link to={'/catalog'}> Please fill it up.</Link>
        </h3>;
    }
    return (
        <Container>
          {cartContent}
        </Container>
    );
  }
}

const mapStateToProps = ({products}) => ({
      productProps: products.items,
      cartTotalProp: products.cartTotal,
      cartProductsProp: products.cart,
      vatProp: products.vat,
      orderSuccessProp: products.orderSuccess,
      usedCurrencyProp: products.usedCurrency
});

const mapDispatchToProps = dispatch => bindActionCreators({

      removeProductFromCartProp: (productId, count) => (removeFromCart(productId, count)),
      clearProductsFromCartProp: () => (clearCart()),
      updateCartProductCountProp: (value, productId) => (updateCartProductCount(Number(value), productId)),
  },dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Cart);;