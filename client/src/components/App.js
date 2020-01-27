import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import ProductIndex from './products/ProductIndex';
import Login from './Login';
import Register from './Register';
import AuthRoute from '../util/route_util';
import Nav from './Nav';

const App = () => {
  return (
    <div>
      <Route exact path="/" component={Nav}/>
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
        <Route path="/" component={ProductIndex} />
      </Switch>
    </div>
  );
};


export default App;
