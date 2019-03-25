import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon, Segment, Button, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logoutUser } from './../../actions/actionsCreators';

class Header extends Component {
  state = { activeItem: 'catalog', open: false }

  // handleItemClick = ({ name }) => this.setState({ activeItem: name })
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  }
    render() {
      const { storeCartItemsCount, compareTotal } = this.props;
      const { user } = this.props.auth
      const { activeItem } = this.state;
      const ProfileComponent = () => (
        <>
        <span>Hi there, {`${user.firstname} ${user.lastname}`} &nbsp;</span>
                            
        <Button onClick={this.onLogoutClick} negative>
          Logout
        </Button>
        </>
      )
        return (
          <Segment inverted>
            <Menu widths={5} inverted secondary>
              <Menu.Item as={NavLink} to="/home" name="home"  active={activeItem === 'home'} onClick={this.handleItemClick}>
                <Icon name="home" size="large" />
                <p>Home</p>
              </Menu.Item>
              <Menu.Item as={NavLink} to="/catalog" name="catalog" active={activeItem === 'catalog'} onClick={this.handleItemClick}>
                <Icon name="block layout" size="large" />
                <p>Catalog</p>
              </Menu.Item>
              <Menu.Item as={NavLink} to="/compare" name="compare" active={activeItem === 'compare'} onClick={this.handleItemClick}>
                <Icon name = 'balance scale' size="large" />
                <p> {compareTotal > 0 ? compareTotal + ' item(s) to Compare' : 'No items to compare'} </p>
              </Menu.Item>
              <Menu.Item as={NavLink} to="/cart" name="cart" active={activeItem === 'cart'} onClick={this.handleItemClick}>
                <Icon name="shopping cart" size="large" />
                <p> {storeCartItemsCount > 0 ? storeCartItemsCount + ' items in Cart' : 'Cart is empty'} </p>
              </Menu.Item>
              <Menu.Item>
                <Popup
                  trigger={
                    <Menu.Item name="help" style={{width:'100%'}} >
                      <Icon name="user" size="large" /><span>Profile</span>
                     </Menu.Item>  
                  }
                  content={<ProfileComponent />}
                  on="click"
                />
              </Menu.Item>
            </Menu>
          </Segment>
        );
    }
}

const mapStateToProps = ({products, auth}) => ({

    storeCartItemsCount: products.cartTotal,
    compareTotal: products.compareTotal,
    auth: auth,
  
});

export default connect(mapStateToProps, { logoutUser })(Header);