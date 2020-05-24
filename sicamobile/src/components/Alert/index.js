import React from 'react';

import {View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

export default function Alert() {
  return (
    <View style={styles.alert}>
      <Text style={styles.alertFont}>
        <Icon name="exclamation-triangle" size={16} />
        &nbsp;&nbsp; Alerta de rompimento de barragem. Evacuar a área
        imediatamente!
      </Text>
    </View>
  );
}
