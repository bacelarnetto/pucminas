import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import WavesIcon from '@material-ui/icons/Waves';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark';
import ScheduleIcon from '@material-ui/icons/Schedule';

import { Profile, SidebarNav } from './components';

import { temAcesso }  from './../../../../common/util';
import gTypes  from './../../../../common/constants/GlobalTypes'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    backgroundColor: '#263238',
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: '#263238',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();
  const permissions = localStorage.getItem('permissions')

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />,
      permission: temAcesso(permissions, gTypes.role.ADMIN) 
        || temAcesso(permissions, gTypes.role.USER)
        || temAcesso(permissions, gTypes.role.ENGINEER)        
    },
    {
      title: 'Usuario',
      href: '/usuario',
      icon: <AccountBoxIcon />,
      permission:  temAcesso(permissions, gTypes.role.ADMIN) 
    },
    {
      title: 'Marca',
      href: '/marca',
      icon: <BrandingWatermarkIcon/>,
      permission:  temAcesso(permissions, gTypes.role.ADMIN) 
      || temAcesso(permissions, gTypes.role.USER)
    },
    {
      title: 'Insumo',
      href: '/insumo',
      icon: <ShoppingBasketIcon />,
      permission: temAcesso(permissions, gTypes.role.ADMIN) 
      || temAcesso(permissions, gTypes.role.USER)
    },
    {
      title: 'Agendamentos',
      href: '/manutencao',
      icon: <ScheduleIcon/>,
      permission: temAcesso(permissions, gTypes.role.ADMIN) 
      || temAcesso(permissions, gTypes.role.USER)
      || temAcesso(permissions, gTypes.role.MECHANICAL)
    },
    {
      title: 'Fornecedor',
      href: '/fornecedor',
      icon: <LocalShippingIcon />,
      permission: temAcesso(permissions, gTypes.role.ADMIN) 
      || temAcesso(permissions, gTypes.role.USER)
    },
    {
      title: 'Barragem',
      href: '/barragem',
      icon: <WavesIcon />,
      permission: temAcesso(permissions, gTypes.role.ADMIN) 
      || temAcesso(permissions, gTypes.role.USER)
      || temAcesso(permissions, gTypes.role.ENGINEER)
    },
    {
      title: 'Moradores',
      href: '/morador',
      icon: <PeopleIcon />,
      permission:  temAcesso(permissions, gTypes.role.ADMIN) 
      || temAcesso(permissions, gTypes.role.USER)
      || temAcesso(permissions, gTypes.role.ENGINEER)
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
