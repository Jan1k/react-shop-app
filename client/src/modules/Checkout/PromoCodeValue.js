import React, { Component } from 'react'
import styles from './checkout.module.css';

class PromoCodeValue extends Component {
  render() {
    const {currency,usedPromoCode,discountAmount} = this.props;
    let currencyKeys = Object.keys(currency);
    let currencyName = currency[currencyKeys[1]];
    return (
      <div>
        <div className={styles.parent_div}>
          <div className={styles.key_child}>{usedPromoCode.code}</div>
          <div className={styles.value_child}> - {discountAmount.toLocaleString()} {currencyName}</div>
        </div>
      </div>
    )
  }
}

export default PromoCodeValue;
