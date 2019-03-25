import React, { Component } from 'react'
import styles from '../checkout.module.css';

class DeliveryOptions extends Component {
  render() {
    const {currency, deliveryOptions, usedDeliveryOption,deliveryOptionChanged} = this.props;
    let currencyKeys = Object.keys(currency);
    let currencyValue = currency[currencyKeys[0]];
    let currencyName = currency[currencyKeys[1]];
    return (deliveryOptions.map((option, index) => {
              return (
                <ul key={index} className={styles.ul_styles}>
                  <div className={styles.delivery_options}>
                      <li>
                        <label className={styles.label_options}>
                          <input
                            key={index}
                            type="radio"
                            value={option.id}
                            checked={usedDeliveryOption === option.id}
                            onChange={deliveryOptionChanged}
                          />
                          <div className={styles.two_options}>
                            <div>{option.name}</div>
                            <div>{option.duration}</div>
                            <div> {Math.round(option.cost * currencyValue)}  {currencyName}</div>
                          </div>
                        </label>    
                      </li>
                  </div>
                </ul>
              )
            })
    )
  }
}


export default DeliveryOptions;