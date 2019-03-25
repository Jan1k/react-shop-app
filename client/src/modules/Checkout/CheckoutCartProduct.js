import React, { Component } from 'react'
import { Image } from 'semantic-ui-react';
import styles from './checkout.module.css';

class CheckoutCartProduct extends Component {
  render() {
    const {currency,checkoutProductImage,checkoutProductName,checkoutProductPrice,checkoutCartCount} = this.props;
    let currencyKeys = Object.keys(currency);
    let currencyName = currency[currencyKeys[1]];
    return (
      <div>
        <React.Fragment>
          <div className={styles.flex_row}>
            <Image className={styles.product_image} src={checkoutProductImage}/>
              <div>
                <p className={styles.p_style}>{checkoutProductName}</p>
                <p className={styles.p_style}>{checkoutProductPrice} {currencyName}</p>
                <p className={styles.p_style}>Qty: {checkoutCartCount}</p>
              </div>
          </div>
        </React.Fragment>
      </div>
    )
  }
}

export default CheckoutCartProduct;