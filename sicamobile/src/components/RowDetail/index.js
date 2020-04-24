import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

export default function RowDetail(props) {
  const {label, value, init, style} = props;
  return (
    <View>
      <Text style={[styles.detailPanelProperty, init ? {marginTop: 0} : '']}>
        {label}:
      </Text>
      <Text style={!style ? styles.detailPanelValue : style}>{value}</Text>
    </View>
  );
}
