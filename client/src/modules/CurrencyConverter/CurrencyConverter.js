import React, { Component } from 'react'

class CurrencyConverter extends Component {

  currencyChangeHandler = (event) => {
    this.props.changeCurrencyProp(event.target.value)
  }

  render() {
    const {usedCurrencyProp,exchangeRatesProps} = this.props;
    return (
      <div>
        <select
          className="ui dropdown"
          value={Object.keys(usedCurrencyProp)[0]}
          onChange={this.currencyChangeHandler}
          >
        {
          Object.keys(exchangeRatesProps.rates).map((rateName, index) => (
            <option
              key={index}
              value={exchangeRatesProps.rates[index]}
              >
              {rateName}
            </option>
          ))
        }
        </select>
      </div>
    )
  }
}

export default CurrencyConverter;
