import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeView from './Home';
import CatalogView  from './Catalog';
import CompareView from './Compare';
import MobileView from './Mobile';
import CartView from './Cart';
import Checkout from './Checkout';
import Login from './Auth/Login';
import Registration from './Auth/Registration';
import NotFound from './NotFound/NotFound';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import ChangePassword from './Auth/ChangePassword';


class App extends Component {
  render() {
    return (
      <Router> 
        <>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/reset" component={ ChangePassword } />
          <Route exact path="/registration" component={ Registration } />
          <Switch>
            <PrivateRoute exact path="/" component={ HomeView } />
            <PrivateRoute exact path="/home" component={ HomeView } />
            <PrivateRoute path="/catalog" component={ CatalogView } />
            <PrivateRoute path="/compare" component={ CompareView } />
            <PrivateRoute path="/mobile/:id" component={ MobileView } />
            <PrivateRoute path="/cart" component={ CartView } />
            <PrivateRoute path="/checkout" component={ Checkout } />
            <PrivateRoute component={NotFound}/>
          </Switch>
        </>
      </Router>  
    );
  }
}

export default App;
