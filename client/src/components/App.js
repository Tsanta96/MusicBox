import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import ProductIndex from '../products/ProductIndex';
import Login from '../components/Login';
import Register from '../components/Register';
import AuthRoute from '../util/route_util';
import Nav from '../components/Nav';

const App = () => {
  return (
    <div>
      <Route exact path="/" component={Nav}/>
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
        {/* <Route path="/product/:id" component={ProductDetail} /> */}
        <Route path="/" component={ProductIndex} />
      </Switch>
    </div>
  );
};


export default App;
