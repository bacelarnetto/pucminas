import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./auth";

import SingIn from './views/SignIn';
import SingUp from './views/SignUp';
import Home from './views/Home';
import TrocarSenha from './views/TrocarSenha';


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
      <PrivateRoute path="/trocar-senha" component={TrocarSenha} />
      
      
    </Switch>
  </BrowserRouter>
);


export default Routes;