import React, { Component } from 'react'

class CreditCardInputs extends Component {
  render() {
    const {creditCardInfo,inputChanged} = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div>
            <label>Name on Card</label>
            <input type="text"
                   placeholder="Full names on card"
                   value={creditCardInfo.creditCardName.value}
                   onChange={(event) => inputChanged(event,'creditCardName')}/>    
          
            <div className="invalid-feedback">
              Name on card is required!
            </div>
          </div>
          <div>
            <label>Credit card number</label>
            <input type="text"
                   placeholder="Credit card number"
                   value={creditCardInfo.creditCardNumber.value}
                   onChange={(event) => inputChanged(event,'creditCardNumber')}/>
            <div className="invalid-feedback">
              Credit card number is required!
            </div>
          </div>
        </div>
        <div className="row">
          <div>
            <label>CVV</label>
            <input type="text"
                   placeholder="CVV"
                   value={creditCardInfo.creditCardCvv.value}
                   onChange={(event) => inputChanged(event, 'creditCardCvv')}/>
            <div className="invalid-feedback">
              Security code required!
            </div>
          </div>
        </div>
        
      </React.Fragment>
    )
  }
}
export default CreditCardInputs;
