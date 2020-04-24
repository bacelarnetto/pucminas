import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {isAuthenticated} from './auth';

const AppStack = createStackNavigator();

import Home from './views/Home';
import SignIn from './views/SignIn';

export default function Routes() {
  return (   
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="SignIn" component={SignIn} />
        {isAuthenticated ? (
          <AppStack.Screen name="Home" component={Home} />
        ) : (
          <AppStack.Screen name="SignIn" component={SignIn} />
        )}
      </AppStack.Navigator>    
  );
}
