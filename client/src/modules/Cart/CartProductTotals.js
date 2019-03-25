import React, { Component } from 'react';
import { Button, Grid, Table, Popup, Icon } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import styles from './cart.module.css';

class CartProductTotals extends Component {
  render() {
    const {clearCart,currency} = this.props;
    let currencyKeys = Object.keys(currency);
    let currencyName = currency[currencyKeys[1]];
    let subtotal = this.props.subtotal;
    let vatPercentage = this.props.vat > 0 ? this.props.vat/100 : 0;
    let vat = subtotal > 0 ? Math.round(subtotal * vatPercentage) : 0;
    let totalCost = subtotal > 0 ? subtotal + vat : 0;

    return (
        <Grid className={styles.table_style}>
          <Table basic='very' celled collapsing>
          <Table.Body>
              <Table.Row>
                <Table.Cell className={styles.table_total_styles}>Subtotal:</Table.Cell>
                <Table.Cell className={styles.table_styles}>{subtotal.toLocaleString()} {currencyName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className={styles.table_total_styles}>
                <Popup
                  trigger={<Icon className='info circle' />}
                  content="VAT is a tax that is added to the price of goods or services(in our cases it is mobile phones). Calculated as follows - subtotal * 0.16"
                  basic
                />
                VAT:</Table.Cell>
                <Table.Cell className={styles.table_styles}>{vat.toLocaleString()} {currencyName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className={styles.table_total_styles}>Total:</Table.Cell>
                <Table.Cell className={styles.table_styles}>{totalCost.toLocaleString()} {currencyName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell colSpan="2">
                  <Button onClick={clearCart} color='red'>
                    Clear Cart
                  </Button>
                  <Link className="ui button" to={'/catalog'}>
                    Continue shipping
                  </Link>
                  <Link className="ui button" to={'/checkout'}>
                    Checkout
                  </Link>
                </Table.Cell>
              </Table.Row>
          </Table.Body>
        </Table>
        </Grid>
    );
  }
}

CartProductTotals.defaultProps = {
  shippingPrice: 0,
};

export default CartProductTotals;