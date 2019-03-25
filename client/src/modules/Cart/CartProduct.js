import React, { Component } from 'react';
import { Grid, Image, Table, Icon } from 'semantic-ui-react';
import styles from './cart.module.css';


class CartProduct extends Component {
  render() {
    const {productPhoto,productName,productQuantity,productPrice,productCount,updateProductCount,removeCartProduct, currency} = this.props;
    let currencyKeys = Object.keys(currency);
    let currencyName = currency[currencyKeys[1]];
    return (
      <Grid columns='four' className={styles.cart_margin}>
        <Grid.Row>
            <Grid.Column className={styles.column_styles}>
              <Image className={styles.mobile_style} src={productPhoto} alt='product-photo1'/>
            </Grid.Column>
            <Grid.Column className={styles.column_styles}>
                <div className={styles.name_styles}> {productName}</div>
                <div className={styles.stock_styles}> {productQuantity > 0 ? 'In Stock' : 'Out of stock'}</div>
            </Grid.Column>
            <Grid.Column className={styles.column_styles}>
            <Table basic='very' celled collapsing>
            <Table.Body>
              <Table.Row className={styles.table_header_styles}>
                <Table.Cell>Price</Table.Cell>
                <Table.Cell>Count</Table.Cell>
                <Table.Cell>Amount</Table.Cell>
              </Table.Row>
              <Table.Row className={styles.table_styles}>
                <Table.Cell>{productPrice.toLocaleString()} {currencyName}</Table.Cell>
                <Table.Cell>
                <select
                    disabled={productQuantity <=0}
                    value={productCount}
                    onChange={updateProductCount}
                    className="ui dropdown"
                  >
                    {[...Array(productQuantity)].map((number, index) => (
                      <option key={index} value={index+1}>{index+1}</option>
                    ))}
                  </select>
                </Table.Cell>
                <Table.Cell>{(productPrice * productCount).toLocaleString()} {currencyName}</Table.Cell>
              </Table.Row>
            </Table.Body>
            </Table>
               
            </Grid.Column>
            <Grid.Column className={styles.column_styles}>
              <div className={styles.icon_styles}><Icon className="x icon" onClick={removeCartProduct}/></div>
            </Grid.Column> 
         </Grid.Row>
      </Grid>
    );
  }
}

export default CartProduct;