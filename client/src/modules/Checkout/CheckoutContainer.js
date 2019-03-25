import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { confirmOrder, setPromoCode } from '../../actions/actions';
import CheckoutCartProduct from './CheckoutCartProduct';
import CheckoutCartTotals from './CheckoutCartTotals';
import formValidation from '../../utils/formValidation';
import PromoCodeValue from './PromoCodeValue';
import PromoCodeForm from './PromoCodeForm';
import CustomerInputs from './Forms/CustomerInputs';
import DeliveryOptions from './Forms/DeliveryOptions';
import PaymentOptions from './Forms/Payments/PaymentOptions';
import {CardElement, injectStripe} from 'react-stripe-elements';
import styles from './checkout.module.css'
import { Button, Container } from 'semantic-ui-react';

class Checkout extends Component {
  state = {
    promoCode: '',
    paymentMethod: "creditCard",
    shippingPrice: 10,
    usedDeliveryOption: 1,
    makeOrder: true, //changed in auth
    correctCardInfo: false,
    customerInfo: {
      firstName: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: '',
      },
      secondName: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: '',
      },
      email: {
        value: '',
        valid: false,
        touched: false,
        errorMsg: '',
      }
    },
  };


    customerInfoChangeHandler = (event, identifier) => {
        const customerInfo = {...this.state.customerInfo};
        const customerInfoField = {...customerInfo[identifier]};
        customerInfoField.value = event.target.value;
        const validationResults = formValidation(identifier, customerInfoField.value);
        customerInfoField.valid = validationResults.isValid;
        customerInfoField.errorsMsg = validationResults.errorsMsg;
        customerInfoField.touched = true;
        customerInfo[identifier] = customerInfoField;

        let makeOrder = true;
        for (let identifier in customerInfo) {
            makeOrder = customerInfo[identifier].valid && makeOrder;
        }
        this.setState({customerInfo: customerInfo, makeOrder: makeOrder});
    };

    promoCodeChangeHandler = (event) => {
        this.setState({promoCode: event.target.value})
    };

    paymentOptionChangeHandler = (event) => {
        if (event.target.value === 'creditCard') {
            this.setState({correctCardInfo: false});
        } else {
            this.setState({correctCardInfo: true});
        }
        this.setState({paymentMethod: event.target.value})
    };

    confirmOrderHandler = (event) => {
        event.preventDefault();
        let order = {};
        order['cart'] = this.props.cartProductsProps;
        order['user'] = {
            firstName: this.state.customerInfo.firstName.value,
            secondName: this.state.customerInfo.secondName.value,
            email: this.state.customerInfo.email.value
        };
        order['usedPromoCode'] = this.state.promoCode;
        order['currency'] = this.props.usedCurrencyProp;
        order['paymentMethod'] = this.state.paymentMethod;
        order['deliveryOption'] = this.state.usedDeliveryOption;
        this.props.confirmOrderProp(order)

    };

    setPromoCode = (event) => {
        event.preventDefault();
        let getPromoCode = this.props.promoCodeProp.filter(codeName => (
            codeName.code === this.state.promoCode
        ));
        if (getPromoCode.length > 0) {
            this.props.setPromoCodeProp(getPromoCode[0]);
            console.log(`The promo code you entered has given you a ${getPromoCode[0].percentage}`) 
        } else {
            console.log( 'The Promo code you entered does not have discounts')
        }
      }

    deliveryOptionChangeHandler = (event) => {
      let deliveryOption = this.props.deliveryOptions.find(option => (
          option.id === parseInt(event.target.value)
      ));
      if (deliveryOption) {
          this.setState({
              usedDeliveryOption: parseInt(event.target.value),
              shippingPrice: deliveryOption.cost
          })
      }

    };

    creditCardHandler = (element) => {
      if (element.complete) {
          this.setState({correctCardInfo: true})
      }
    };

    getbillingInfo = (user) => {
      if (this.props.auth.isAuthenticated) {
        return (
          <ul>
            <li>{`${user.firstname} ${user.lastname}`}</li>
            <li>Confirmation email will sent to {user.email}</li>
          </ul>
        )
      }
      else {
        return (        
          <CustomerInputs
            customerInfo={this.state.customerInfo}
            inputChanged={(event, identifier) => this.customerInfoChangeHandler(event, identifier)}
          />
        )
      }
    }

    render() {
        const { user } = this.props.auth
        let productsPrices = [];
        let chosenPaymentMethod = null;
        let currencyKeys = Object.keys(this.props.usedCurrencyProp);
        let currencyValue = this.props.usedCurrencyProp[currencyKeys[0]];

        const cartProducts = this.props.cartProductsProps.map((cartProduct, index) => {
            let productFromStore = this.props.productsProps.find(product => product.id === cartProduct.id);
            productsPrices.push({
                price: productFromStore.quantity > 0 ?
                    Math.round(productFromStore.price * currencyValue) : 0, count:
                cartProduct.count
            });
            return (
                <CheckoutCartProduct
                    key={index}
                    checkoutProductName={productFromStore.name}
                    checkoutProductPrice={Math.round(productFromStore.price * currencyValue)}
                    checkoutProductImage={productFromStore.img}
                    checkoutCartCount={cartProduct.count}
                    currency={this.props.usedCurrencyProp}
                />
            )
        });

        let shippingPrice = this.state.shippingPrice ? Math.round(this.state.shippingPrice * currencyValue) : 0;
        let productTotals = productsPrices.reduce((acc, el) => acc + (el.price * el.count), 0);
        let vatPercentage = this.props.vatProps > 0 ? this.props.vatProps / 100 : 0;
        let vat = productTotals > 0 ? Math.round(productTotals * vatPercentage) : 0;
        let percentageDiscount = this.props.usedPromoCodeProp ? this.props.usedPromoCodeProp.percentage / 100 : 0;
        let discountAmount = productTotals * percentageDiscount;
        let shoppingTotal = productTotals > 0 ? ((productTotals + vat + shippingPrice) - discountAmount) : 0;

        if (this.state.paymentMethod === "creditCard") {
            chosenPaymentMethod =
                <div className={styles.card_styles}>
                    <CardElement onChange={(element) => this.creditCardHandler(element)}/>
                </div>
        } else if (this.state.paymentMethod === "onDelivery") {
            chosenPaymentMethod =
                <div className={styles.info_styles}>You will pay when the product is delivered to you.</div>
        }
    return (
      <Container>
      <div className={styles.wrapper_checkout}>
        <div className={styles.billing_info}>
          <h2 className={styles.align_text}>Billing Information</h2>
          <form className="" noValidate>
            {this.getbillingInfo(user)}
            <h2 className={styles.align_text}>Delivery Options</h2>
            <DeliveryOptions
                currency={this.props.usedCurrencyProp}
                deliveryOptions={this.props.deliveryOptions}
                usedDeliveryOption={this.state.usedDeliveryOption}
                deliveryOptionChanged={this.deliveryOptionChangeHandler}
            />
            <h2 className={styles.align_text}>Payment Method</h2>
            <PaymentOptions
                paymentMethod={this.state.paymentMethod}
                paymentOptionChanged={this.paymentOptionChangeHandler}
            />
            <div >
                {chosenPaymentMethod}
            </div>
            <div className={styles.btn_order_margin}>
              <Button
                  disabled={!(this.state.makeOrder && this.state.correctCardInfo)}
                  className={styles.confirm_btn}
                  onClick={(event) => this.confirmOrderHandler(event)}>
                  Confirm Order
              </Button>
            </div>
        </form>
        </div>
        <div className={styles.order_info}>
          {this.props.cartTotalProps <= 0 ? <Redirect to="/cart"/> : null}
          <h2 className={styles.h2_style}>
              <span>Order Review</span>
              <span className={styles.count_styles}>{this.props.cartTotalProps}</span>
          </h2>
          
            {cartProducts}
            {this.props.usedPromoCodeProp ?
            <PromoCodeValue
                    currency={this.props.usedCurrencyProp}
                    usedPromoCode={this.props.usedPromoCodeProp}
                    discountAmount={discountAmount}/>
             : null
            }
            <hr className={styles.hr_style} />
            <CheckoutCartTotals
                productTotals={productTotals}
                vat={vat}
                shippingPrice={shippingPrice}
                shoppingTotal={shoppingTotal}
                currency={this.props.usedCurrencyProp}/>
            <hr className={styles.hr_style} />
          
            <PromoCodeForm
                setPromoCode={this.setPromoCode}
                promoCodeChangeHandler={(event) => this.promoCodeChangeHandler(event)}
                promoCode={this.state.promoCode}/>
        </div>          
      </div>
      </Container>
    )
  }
}

Checkout.defaultProps = {
  shippingPrice: 0,
}

const mapStateToProps = ({products,auth}) => ({
      productsProps: products.items || [],
      cartProductsProps: products.cart,
      cartTotalProps: products.cartTotal,
      vatProps: products.vat,
      promoCodeProp: products.promoCode,
      usedPromoCodeProp: products.usedPromoCode,
      deliveryOptions: products.deliveryOptions,
      usedCurrencyProp: products.usedCurrency,
      auth:auth,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  confirmOrderProp: (order) => dispatch(confirmOrder(order,ownProps)),
  setPromoCodeProp: (promoCode, percentage) => dispatch(setPromoCode(promoCode, percentage))
})

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(Checkout));


