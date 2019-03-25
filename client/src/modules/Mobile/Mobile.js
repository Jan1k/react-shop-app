import React, { Component } from 'react';
import { Tab, Grid, Label, Menu, Container } from 'semantic-ui-react';
import styles from './mobile.module.css';
import Description from './Description';
import Specifications from './Specifications';
import Reviews from './Reviews';
import Images from './Images';
import Fewspecifications from './Fewspecifications';
import Generalinfo from './Generalinfo';
class Mobile extends Component {
  
  render() {
    const {match, products, currency, addProductToCartProp, cart} = this.props;
    const mobile = products.find(item => item.id === match.params.id);
    let currencyKeys = Object.keys(currency);
    let currencyValue = currency[currencyKeys[0]];
    let currencyName = currency[currencyKeys[1]];
    const panes = [
      { menuItem: 'Description', render: () => <Tab.Pane className={styles.tabs_styles}  attached={false}><Description mobile={mobile}/></Tab.Pane>},
      { menuItem: 'Specifications', render: () => <Tab.Pane className={styles.tabs_styles}  attached={false}><Specifications mobile={mobile}/></Tab.Pane>},
      { menuItem: <Menu.Item key={mobile.id}><Label color='olive' floating>{mobile.review_count}</Label>Reviews </Menu.Item>, render: () => <Tab.Pane className={styles.tabs_styles}  attached={false}>{mobile.review_count >= 1 ? <Reviews mobile={mobile}/> : <div className={styles.no_review}>There are no reviews for this product.</div>} </Tab.Pane>},
    ]
 
    return (
        <Container>
          <Grid columns={3} className={styles.item_margin}>
              <Grid.Row>
              <Grid.Column>
                <Images mobile={mobile}/>
              </Grid.Column>
              <Grid.Column>
                <h1>Few specifications:</h1>
                <Fewspecifications mobile={mobile}/>
              </Grid.Column>
              <Grid.Column className={styles.bgc}>
                <Generalinfo mobile={mobile} currencyValue={currencyValue} currencyName={currencyName} addProductToCartProp={addProductToCartProp} cart={cart}/>
              </Grid.Column>
            </Grid.Row>    
          </Grid>
          <Tab className={styles.tab_styles} panes={panes}/>
        </Container>       
        );
      }
    }

    export default Mobile;
