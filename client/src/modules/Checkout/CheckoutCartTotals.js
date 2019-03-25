import React, { Component } from 'react'
import styles from './checkout.module.css';

class CheckoutCartTotals extends Component {
  render() {
    const {currency,productTotals,vat,shippingPrice,shoppingTotal} = this.props;
    let currencyKeys = Object.keys(currency);
    let currencyName = currency[currencyKeys[1]];
    return (
      <div>
        <div className={styles.parent_div}>
          <div className={styles.key_child}>Subtotal</div>
          <div className={styles.value_child}>{productTotals.toLocaleString()} {currencyName}</div>
        </div>
        <div className={styles.parent_div}>
          <div className={styles.key_child}>VAT</div>
          <div className={styles.value_child}>{vat.toLocaleString()} {currencyName}</div>
        </div>
        <div className={styles.parent_div}>
          <div className={styles.key_child}>Shipping amount</div>
          <div className={styles.value_child}>{shippingPrice.toLocaleString()} {currencyName}</div>
        </div>
          <hr className={styles.hr_style} />
        <div className={styles.parent_div}>
          <div className={styles.total_key_child}>Total</div>
          <div className={styles.total_value_child}>{shoppingTotal.toLocaleString()} {currencyName}</div>
        </div>
      </div>
    )
  }
}

export default CheckoutCartTotals;
