import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import Form from './views/Form';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      contrastText: '#FFFFFF',
      dark: '#004d40',
      main: '#00695c',
      light: '#00897b'
    },
    secondary: {
      main: '#00b0ff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        
        <Form />
      </div>
    </ThemeProvider>
  );
}

export default App;
