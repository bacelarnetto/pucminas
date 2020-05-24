import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {isAuthenticated} from './auth';

const AppStack = createStackNavigator();

import Home from './views/Home';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import TrocarSenha from './views/TrocarSenha';
import AlterarDados from './views/AlterarDados';

export default function Routes() {
  return (   
      <AppStack.Navigator screenOptions={{headerShown: false}}>
       
        <AppStack.Screen name="SignIn" component={SignIn} />
        <AppStack.Screen name="SignUp" component={SignUp} />
        
        {isAuthenticated ? ( 
          <>
            <AppStack.Screen name="Home" component={Home} />    
            <AppStack.Screen name="TrocarSenha" component={TrocarSenha} />      
            <AppStack.Screen name="AlterarDados" component={AlterarDados} />    

          </>
        ) : (
          <AppStack.Screen name="SignIn" component={SignIn} />
        )}
      </AppStack.Navigator>    
  );
}