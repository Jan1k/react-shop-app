import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react';
import styles from './checkout.module.css';

class PromoCodeForm extends Component {
  render() {
    const {setPromoCode,promoCode,promoCodeChangeHandler} = this.props;
    return (
      <div>
        <form onSubmit={setPromoCode}>
          <div className={styles.promo_form}>
            <Input className={styles.promo_input} placeholder='Promo code' value={promoCode} onChange={promoCodeChangeHandler} />
          
            <Button className={styles.promo_button} disabled={promoCode.length < 5}>
              USE
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default PromoCodeForm;