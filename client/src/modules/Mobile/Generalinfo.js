import React, { Component } from 'react'
import { Grid, Button, Icon, Select } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from './mobile.module.css';

class Generalinfo extends Component {
  render() {
    const {mobile, currencyValue, currencyName, addProductToCartProp, cart} = this.props;
    
    const colors = mobile.colors.map(item => ({
      key:item.id,
      text:<span><Icon  style={{background: item.color}} /> {item.name}</span>,
      value:item.color,
      style:{ width: '100%', backgroundColor: item.color, borderTop:0, color: 'bisque' }
      
    }))
    const capacities = mobile.capacities.map(item => ({
      key:item.id,
      text:item.capacity,
      value: item.capacity
    }))
    function getCartIcon() {
      const isSelected = !!cart.find(item => item.id === mobile.id );
      if (isSelected) {
        return (
          <Link className="ui button" to='/cart'>Go to cart</Link>
        );
      }

      if (mobile.quantity < 1) {
        return <Button disabled>Out of stock</Button>;
      }

      return <Button color='olive' onClick={() => addProductToCartProp(mobile.id, mobile.quantity)}>Add to cart</Button>;
    }
    return (
      <div>
        <Grid.Row className={styles.row}>
          {
            mobile.quantity <= 0  ? 
            <span>Out of stock</span>
            : <span><i className="check circle icon"></i>In stock ({mobile.quantity} items)</span>
          }
            <span>Product code: {mobile.product_code}</span>
        </Grid.Row>
        <Grid.Row className={styles.row}>
          <span className={styles.price}>{Math.round(mobile.price * currencyValue).toLocaleString()}{mobile.discount_price ? <span>*</span> : null} {currencyName}</span>
              {getCartIcon()}
        </Grid.Row>
        <Grid.Row className={styles.row}>
          {
            mobile.discount_price ?
            <span>* Discounted price</span> : null
          }
        </Grid.Row>

        <Grid.Row className={styles.buttons_row}>
              <Grid.Column>
              <div>
                <h4>Available colors:</h4>
                <Select disabled={mobile.quantity<=0} className={styles.select_style} placeholder='Select color' options={colors} defaultValue={colors[0].value} />
              </div>
              </Grid.Column>
              <Grid.Column className={styles.button_margin}>
              <div>
                <h4>Available capacities:</h4>
                <Select disabled={mobile.quantity<=0} className={styles.select_style} placeholder='Select capacity' options={capacities} defaultValue={capacities[0].value} />
              </div>
              </Grid.Column>
          
        </Grid.Row>  
        <Grid.Row className={styles.back_button}>
          <Link className="ui button" to={`/catalog`}><Icon className="arrow left icon"/>Back to catalog</Link>
        </Grid.Row>
      </div>
    )
  }
}

export default Generalinfo;
