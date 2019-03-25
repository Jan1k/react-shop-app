import React, { Component } from 'react'
import InputField from './InputField';
import styles from '../checkout.module.css';

class CustomerInputs extends Component {
  render() {
    const {customerInfo,inputChanged} = this.props;
    return (
      <React.Fragment>
       
          <div className={styles.names_styles}>
            <div className={styles.names_width}>
              <InputField
              label={'First Name'}
              type={'text'} 
              placeholder={'First Name'} 
              identifier = {customerInfo.firstName}
              changed={(event) => inputChanged(event, 'firstName')} />
            </div>
            <div className={styles.names_width}>
              <InputField
              label={'Second Name'}
              type={'text'} 
              placeholder={'Second Name'} 
              identifier = {customerInfo.secondName}
              changed={(event) => inputChanged(event, 'secondName')}/>
            </div>
          </div>
          <div  className={styles.email_width} >
            <InputField
           
            label={'Email'}
            type={'email'} 
            placeholder={'you@example.com'} 
            identifier = {customerInfo.email}
            changed={(event) => inputChanged(event, 'email')}/>
          </div>
       
      </React.Fragment>
    )
  }
}

export default CustomerInputs;
