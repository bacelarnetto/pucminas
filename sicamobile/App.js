import 'react-native-gesture-handler';
import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";

import OneSignal from 'react-native-onesignal'; // Import package from node modules
import Routes from './src/Routes';

export default class App extends Component {
  constructor(properties) {
    super(properties);
    OneSignal.init('67a57c27-b481-41ef-b754-e5c3cbe28cf1', {
      kOSSettingsKeyAutoPrompt: true,
    }); // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }
  render() {
    return (
      <NavigationContainer>
        <Routes />
        <FlashMessage position="top" />
      </NavigationContainer>
    )
  }
}
