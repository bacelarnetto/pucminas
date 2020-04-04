import React, {  useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {  withRouter, Redirect } from 'react-router-dom';
import { Creators as actions } from './../../store/actions/auth';

const Logout = () => {
  
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(actions.logout())
    /* eslint-disable-next-line */
  }, [])

  return <Redirect to="/"/>;

}

export default withRouter(Logout);
