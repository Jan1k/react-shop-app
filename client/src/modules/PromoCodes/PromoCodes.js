import React, { Component } from 'react';
import {connect} from 'react-redux';
import styles from './promocodes.module.css';


class PromoCodes extends Component {
  render() {
    const {promoCodesProps, children, showText} = this.props;
    return (
      promoCodesProps && promoCodesProps.length > 0 ?
      <div>
        {showText ? 
        <span>
          <h3 className={styles.h3_view}>Great Discounts!</h3>
          <p>Use the following promo codes to get amazing discounts: </p>
        </span>
        : null }
        <div>
          {
            promoCodesProps.map((promoCode, index) => (
             
              <li key={index} className={styles.codes_view}>
                <div className={styles.code_view}>{promoCode.code}</div>
                <div className={styles.percent_view}>{promoCode.percentage}%</div>
              </li>
            ))
          }
        </div>
      </div>
      : children
    )
  }
}

const mapStateToProps = state => ({
  promoCodesProps: state.products.promoCode,
})


export default connect(mapStateToProps)(PromoCodes);
