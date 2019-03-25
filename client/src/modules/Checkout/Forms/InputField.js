import React, { Component } from 'react';
import styles from '../checkout.module.css';

class InputField extends Component {
  render() {
    const {label,type,identifier,placeholder,changed} = this.props;
    return (
      <React.Fragment>
        <label>{label}</label>
        <input type={type}     
              className={[styles.form_control, identifier.touched && !identifier.valid ? styles.input_error : ''].join(' ')}
              placeholder={placeholder}
              value={identifier.value}
              onChange={(event) => changed(event, 'inputname')}
        />
              {
                !identifier.valid ?
                <span className={styles.input_errors}>
                  {identifier.errorsMsg}
                </span>
                : null
              }
      </React.Fragment>
    )
  }
}


export default InputField;
