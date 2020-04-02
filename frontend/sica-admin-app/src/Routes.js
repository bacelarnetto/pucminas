import React, { useState, useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import api from './servers/api';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,  

  Marca as MarcaView,
  MarcaInsertEdit as MarcaInsertEditView,
  Insumo as InsumoView,
  InsumoInsertEdit as InsumoInsertEditView,
  Manutencao as ManutencaoView,
  ManutencaoInsertEdit as ManutencaoInsertEditView,
  Fornecedor as FornecedorView,
  FornecedorInsertEdit as FornecedorInsertEditView,
  Pedido as PedidoView,
  PedidoInsertEdit as PedidoInsertEditView,
  Barragem as BarragemView,
  BarragemInsertEdit as BarragemInsertEditView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  NotUnauthorized as NotUnauthorizedView,
  Morador as MoradorView,
  MoradorInsertEdit as MoradorInsertEditView,
  Usuario as UsuarioView,
  UsuarioInsertEdit as UsuarioInsertEditView,
  Logout as LogoutView

} from './views';

import { Creators as actions } from './store/actions/auth';

const Routes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useDispatch(); 


  useFetching(dispatch, actions.authCheckState());
  const token = useSelector( state  => state.auth.token );
  
  useEffect(() => {   
    setIsAuthenticated(token !== null)    
  }, [token])

 
  let routes;

  if(isAuthenticated){
    api.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    routes = (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/dashboard"
        />
        <RouteWithLayout
          component={DashboardView}
          exact
          layout={MainLayout}
          path="/dashboard"
        />
        <RouteWithLayout
          component={MoradorView}
          exact
          layout={MainLayout}
          path="/morador"
        />
        <RouteWithLayout
          component={MoradorInsertEditView}
          exact
          layout={MainLayout}
          path="/morador/:id"
        />
        <RouteWithLayout
          component={BarragemView}
          exact
          layout={MainLayout}
          path="/barragem"
        />
        <RouteWithLayout
          component={BarragemInsertEditView}
          exact
          layout={MainLayout}
          path="/barragem/:id"
        />
        <RouteWithLayout
          component={MarcaView}
          exact
          layout={MainLayout}
          path="/marca"
        />
        <RouteWithLayout
          component={MarcaInsertEditView}
          exact
          layout={MainLayout}
          path="/marca/:id"
        />

        <RouteWithLayout
          component={InsumoView}
          exact
          layout={MainLayout}
          path="/insumo"
        />
        <RouteWithLayout
          component={InsumoInsertEditView}
          exact
          layout={MainLayout}
          path="/insumo/:id"
        />
        <RouteWithLayout
          component={ManutencaoInsertEditView}
          exact
          layout={MainLayout}
          path="/insumo/:id_insumo/manutencao/:id_manutencao"
        />
        <RouteWithLayout
          component={ManutencaoInsertEditView}
          exact
          layout={MainLayout}
          path="/manutencao/:id_manutencao"
        />
        <RouteWithLayout
          component={ManutencaoView}
          exact
          layout={MainLayout}
          path="/manutencao"
        />

        <RouteWithLayout
          component={FornecedorView}
          exact
          layout={MainLayout}
          path="/fornecedor"
        />
        <RouteWithLayout
          component={FornecedorInsertEditView}
          exact
          layout={MainLayout}
          path="/fornecedor/:id"
        />
        <RouteWithLayout
          component={PedidoView}
          exact
          layout={MainLayout}
          path="/pedidos/fornecedor/:id_fornecedor"
        />
        <RouteWithLayout
          component={PedidoInsertEditView}
          exact
          layout={MainLayout}
          path="/pedidos/fornecedor/:id_fornecedor/pedido/:id_pedido"
        />  
        <RouteWithLayout
          component={UsuarioView}
          exact
          layout={MainLayout}
          path="/usuario"
        />
        <RouteWithLayout
          component={UsuarioInsertEditView}
          exact
          layout={MainLayout}
          path="/usuario/:id"
        />

        <Route
          component={LogoutView}
          path="/logout"
        />
        <RouteWithLayout
          component={NotUnauthorizedView}
          exact
          layout={MinimalLayout}
          path="/not-unauthorized"
        />
        <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
    );

  } else {
    routes = (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/sign-in"
        />        
        <RouteWithLayout
          component={SignUpView}
          exact
          layout={MinimalLayout}
          path="/sign-up"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MinimalLayout}
          path="/sign-in"
        />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    routes
  );
};

const useFetching = (dispatch, action) => {
  const array = [];
  useEffect(() => {
    dispatch(action);
    /* eslint-disable-next-line */
  }, array)
}

export default Routes;
