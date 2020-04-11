import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default function Copyright() {
  return (
    <div>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:8001">
        SCA - Sistema de controle ambiental. Todos os direitos reservados.
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      <br/>
    </div>
  );
}