import React, { Component } from 'react'
import styles from '../../checkout.module.css';

class PaymentOptions extends Component {
  render() {
    const {paymentMethod,paymentOptionChanged} = this.props;
    return (
      <ul className={styles.ul_styles}>
        <li className={styles.li_payment_styles}>
          <label>
            <input type="radio"
                   value="creditCard"
                   checked={paymentMethod === 'creditCard'}
                   onChange={paymentOptionChanged}
            />
            Credit Card
          </label>
        </li>
        <li className={styles.li_payment_styles}>
          <label>
            <input type="radio"
                   value="onDelivery"
                   checked={paymentMethod === 'onDelivery'}
                   onChange={paymentOptionChanged}
            />
            Pay on Delivery
          </label>
        </li>
      </ul>
    )
  }
}

export default PaymentOptions;
