import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./auth";

import SingIn from './views/SignIn';
import SingUp from './views/SignUp';
import Home from './views/Home';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SingIn} />
      
      <Route path="/register" component={SingUp} />
      <PrivateRoute path="/home" component={Home} />
      
    </Switch>
  </BrowserRouter>
);


export default Routes;