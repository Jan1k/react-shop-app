import React, { Component } from 'react';
import Mobiles from '../Mobiles/Mobiles';
import { Card, Grid, Button, Icon, Container } from 'semantic-ui-react';
import Search from '../Search/';
import Header from '../common/Header';
import Footer from '../common/Footer';
import styles from './catalog.module.css';
import CurrencyConverter from '../CurrencyConverter';
import PromoCodes from './../PromoCodes/PromoCodes';

class Catalog extends Component {

  changeView() {
    this.setState({
      toggled: !this.props.toggled,
    });
  }
  
  loading = () => (
    <div className="ui">
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading...</div>
      </div>
      <p></p>
    </div>
  ) 
  
  noItems = () => (
    <div className="ui">
      <div className="ui active inverted dimmer">
        <div className="ui text"><h3>Unfortunatelly, no items matching your search criteria were found</h3></div>
      </div>
    </div>
    )

  componentDidMount() {
    this.props.fetchProducts();
    // window.addEventListener("beforeunload", (e) => 
    // {  
    //     e.preventDefault();
    //     return e.returnValue = 'Are you sure you want to close?';
    // });
  }

  render() {
    let mobiles = <div>There are no products!</div>
    const {error,
           loading,
           searchValue,
           visibleProducts,
           addProductToCartProp,
           addProductToCompareProp,
           removeProductFromCompareProp,
           compareTotalProp,
           compareCartProp,
           usedCurrencyProp,
           changeview,
           toggled,
           cart} = this.props;

    if(error) {
      return <div>Error! {error.message}</div>
    }
    if (loading) {
      return <div>{this.loading()}</div>
    }

    if(visibleProducts) {
      mobiles = visibleProducts.map((mobile) => {
        return ( <Mobiles
                  key = {mobile.id}
                  mobile={mobile}
                  mobiles={mobiles}
                  compareTotal={compareTotalProp}
                  currency={usedCurrencyProp}
                  addToCompare={() => addProductToCompareProp(mobile.id, mobile)}
                  removeFromCompare={() => removeProductFromCompareProp(mobile.id)}
                  addToCart={() => addProductToCartProp(mobile.id, mobile.quantity)}
                  cart={cart}
                  toggled={toggled}
                  comparecart={compareCartProp}
              />
        )
      })
    }
    
    return (
        <Container className={styles.wrapper}>
          <Header />
          <Grid className={styles.grid_margin}>
            <div className="twelve wide column">
              <Card.Group className={toggled ? 'ui three cards' : 'list_layout'}>
                {mobiles.length > 0 ? mobiles : this.noItems()}
              </Card.Group>
            </div>
            <div className="four wide column">
              <Search search={searchValue}/>
              <div className={styles.changed_view}>
                <h3 className={styles.h3_style}>Change view:</h3>
                <div>
                  <Button icon onClick={() => this.changeView(changeview(toggled))}><Icon name = {toggled ? 'list layout' : 'grid layout'  }/></Button>
                </div>
              </div>
              <div className={styles.changed_view}>
                <h3 className={styles.h3_style}>Convert currency:</h3>
                <CurrencyConverter showLabel/>
              </div>
              <div className={styles.changed_view}>
                <PromoCodes showText>
                  <h3 className={styles.h3_style}>New Stock!</h3>
                  <h3 className={styles.h3_style}>We have just restocked!</h3>
                </PromoCodes>
              </div>
            </div>
          </Grid>
          <Footer/>
        </Container>
    )
}
}

export default Catalog;

