import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styles from './order.module.css';

class OrderSuccess extends Component {
  render() {
    return (
      <div className={styles.idsuccess}>
        <div className={styles.success}>
          <div className={styles.success_h1}>
            <h1>Success!</h1>
          </div>
          <h1>Your order is successful</h1>
          <p>Our operator will contact you. Thank you for shopping with our mobile shop</p>
          <Link fluid size='large' className={styles.link_styles} to={`/home`}>Continue shopping</Link>
        </div>
      </div>
    )
  }
}

export default OrderSuccess;