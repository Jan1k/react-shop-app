import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import './index.css';
import App from '../src/modules/App';
import rootReducer from './reducers';
import {Elements, StripeProvider} from 'react-stripe-elements';
import { BrowserRouter } from 'react-router-dom';
import jwt_decode  from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/actionsCreators';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)))



if ( localStorage.jwtToken ) {
  const token = localStorage.jwtToken;
    setAuthToken(token);
  const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));
}

const app = (
  <Provider store={store}>
    <BrowserRouter>
    <StripeProvider apiKey="stripe">
      <Elements>
        <App/>
      </Elements>
    </StripeProvider>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root'));
