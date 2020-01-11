import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { requestProducts } from 'actions/index';

import Products from 'pages/products';
import Cart from 'pages/cart';
import PageNotFound from 'pages/404';

import Navbar from 'components/navbar';

const App = ({cart, requestProducts}) => {
  return (
    <Router basename="/">
        <Navbar cart={cart} />

        <Switch>
          <Route path="/products" component={Products} />
          <Route path="/cart" component={Cart} />>
          <Route component={PageNotFound} />
        </Switch>

        <Route exact path="/">
          <Redirect to="/products" />
        </Route>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
      cart: state.cart
  }
}

App.propTypes = {
  cart: PropTypes.array.isRequired,
  requestProducts: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { requestProducts })(App);
