import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SingIn from './views/SignIn';
import SingUp from './views/SignUp';

import Home from './views/Home';


export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SingIn} />
        <Route path="/register" component={SingUp} />

        <Route path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  )
}
