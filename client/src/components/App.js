import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import ProductIndex from './products/ProductIndex';
import Login from './Login';
import Register from './Register';
import AuthRoute from '../util/route_util';
import Nav from './Nav';
import ProductUpload from './products/ProductUpload';
import NavBar from './NavBar/NavBar'
import SearchIndex from './SearchIndex/SearchIndex';
import ProductShow from './products/ProductShow';

import OrderDisplay from './orders/orderDisplay';
import NewItems from './cart/NewItems/NewItems';
import Cart from './cart/cart';
  
const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/orders" component={OrderDisplay} />
        <Route exact path="/upload" component={ProductUpload} />
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute
          exact
          path="/register"
          component={Register}
          routeType="auth"
        />
        <Route exact path="/" render={() => (<Redirect to="/search/all"/>)} />
        <Route exact path="/search/:category" component={SearchIndex} />
        <Route exact path="/products/:productId" component={ProductShow}/>
        <Route exact path="/newItems" component={NewItems} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </div>
  );
};


export default App;
