import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Button, Label, Icon, Popup, Grid, Header } from 'semantic-ui-react';
import styles from './mobiles.module.css';
import Colors from '../Colors/Colors';

class Mobiles extends Component {
  render() {
  const { mobile, addToCart, addToCompare,removeFromCompare, currency, cart, comparecart, compareTotal, toggled } = this.props;
  let currencyKeys = Object.keys(currency);
  let currencyValue = currency[currencyKeys[0]];
  let currencyName = currency[currencyKeys[1]];
  const isSelected = !!cart.find(item => item.id === mobile.id );
  const isCompared = !!comparecart.find(item => item.id === mobile.id);
  function getCartIcon() {
    if (isSelected) {
      return (
        <Link className="ui button" to='/cart'>Go to cart</Link>
      )
    }
    if (mobile.quantity < 1) {
      return <Button disabled>Out of stock</Button>
    }
    return <Button color='olive' onClick={addToCart}>Add to cart</Button>
  }
  function getCompareIcon() {
    if (isCompared) {
      return (
      <Button onClick={removeFromCompare}>Delete</Button>
        )
      }
      return (
      <Button color='orange' onClick={addToCompare}>Add</Button>
      )
    }
  function gridView() {
    return (
    <Card key={mobile.id} className={styles.card_style}>
        <div className={styles.parent_img}><Image className={ styles.img_style } fluid src={mobile.img} /></div>
          {
            mobile.sale && 
            <Label className={styles.sale_label_styles} attached='top right'><span className={styles.sale_style}>Sale</span></Label>
          }
          {
            mobile.discount_price ?
            <Label className={styles.discount_label_styles} attached='top left'><span className={styles.discount_style}>{`${Math.round(((mobile.discount_price - mobile.price) * 100) / mobile.discount_price)}%`}</span></Label>
            : null
          }
        <Card.Content>
          <Card.Header className={styles.center_name}>
          <Link to={{pathname: `/mobile/${mobile.id}`}}>
            {mobile.name}
          </Link>
          </Card.Header>
          <Card.Meta>
            <div className={styles.description_styles}>{mobile.mini_description}</div>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <span className={styles.price_styles}>
            {Math.round(mobile.price * currencyValue).toLocaleString()}<span>&nbsp;{currencyName}</span>
            {mobile.discount_price ? <span className={styles.discountprice_styles}>{Math.round(mobile.discount_price * currencyValue).toLocaleString()}<span>{currencyName}</span></span> : null }
          </span>
          
          <span className="right floated">
            <Icon className="star outline icon"></Icon>
            {mobile.rating}
            &nbsp;&nbsp;
            <Link to={{pathname: `/mobile/${mobile.id}`}}>
              <Icon className="comments outline icon"></Icon>
              {mobile.review_count}
            </Link>
          </span>
        </Card.Content>
        <Card.Content extra>
            {getCartIcon()}
            <Popup trigger={<Button>Compare</Button>} flowing hoverable>
            <Grid centered divided >
              <Grid.Column textAlign='center'>
                <Header as='h4'>Compare phones</Header>
                <p>Minimum 2 items. Now <b>{compareTotal}</b> items chosen</p>
                  {getCompareIcon()}
                  {compareTotal >= 2 ? <Link className="ui button" to={{pathname: `/compare`}}>Go to comparison</Link>: null}
              </Grid.Column>
              
            </Grid>
          </Popup>
            
          </Card.Content>
          <Card.Content extra>
            <span>
              <Colors mobile={mobile}  />
            </span>
          </Card.Content>
      </Card>
    )}
    
    function listView() {
      return (
        <Card key={mobile.id} className={styles.card_listview}>
        <Grid columns={3}> 
          <Grid.Column className={styles.column_style}>
            <div className={styles.div_column_style}>
            <Image fluid src={mobile.img} className={styles.img_style_list}/>
              {
                mobile.sale && 
                <Label attached='top right' className={styles.sale_label_styles}><span className={styles.sale_style}>Sale</span></Label>
              }
              {
                mobile.discount_price ?
                <Label attached='top left' className={styles.discount_label_styles}><span className={styles.discount_style}>{`${Math.round(((mobile.discount_price - mobile.price) * 100) / mobile.discount_price)}%`}</span></Label>
                : null
              }
            </div>
          </Grid.Column>
          <Grid.Column className={styles.second_column}>
            <Card.Content>
              <Card.Header className={styles.title}>
              <Link to={{pathname: `/mobile/${mobile.id}`}}>
                {mobile.name}
              </Link>
              </Card.Header>
              <Card.Meta className={styles.margin_bottom}>
              <span>
                <Icon className={ styles.star_icon_list}></Icon>
                {mobile.rating}
                &nbsp;&nbsp;
                <Link to={{pathname: `/mobile/${mobile.id}`}} className={styles.comments_link}>
                  <Icon className={styles.comments_icon_list}></Icon>
                </Link>
                {mobile.review_count}
              </span>
              </Card.Meta>
              <Card.Meta className={styles.margin_bottom}>
                <div>{mobile.mini_description}</div>
              </Card.Meta>
              <Card.Meta>
                <span>
                  <Colors mobile={mobile}  />
                </span>
              </Card.Meta>
            </Card.Content>
          </Grid.Column>
          <Grid.Column className={styles.third_column}>
            <Card.Meta className={styles.price_styles}>
            <span className={styles.price_styles}>
              {Math.round(mobile.price * currencyValue).toLocaleString()}<span>&nbsp;{currencyName}</span>
              {mobile.discount_price ? <span className={styles.discountprice_styles}>{Math.round(mobile.discount_price * currencyValue).toLocaleString()}<span>{currencyName}</span></span> : null }
            </span>
            </Card.Meta>
            <Popup trigger={<Button className={styles.margin_bottom}>Compare</Button>} flowing hoverable>
            <Grid centered divided>
              <Grid.Column textAlign='center'>
                <Header as='h4'>Compare phones</Header>
                <p>Minimum 2 items. Now <b>{compareTotal}</b> items chosen</p>
                  {getCompareIcon()}
                  {compareTotal >= 2 ? <Link className="ui button" to={{pathname: `/compare`}}>Go to comparison</Link>: null}
              </Grid.Column>
            </Grid>
            </Popup>
              {getCartIcon()}
          </Grid.Column>
        </Grid>
      </Card>
      )
    }

  return (
      toggled ? gridView() : listView()
    );
  }
}

export default Mobiles;