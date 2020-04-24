import React, {useRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

import {View, Text, Image, TouchableOpacity} from 'react-native';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/FontAwesome';

import logoImg from './../../assets/logo.png';

import styles from './styles';

export default function Header() {
  const navigation = useNavigation();

  const menu = useRef();

  const hideMenu = () => menu.current.hide();

  const showMenu = () => menu.current.show();

  const handleLogout = async () => {
    hideMenu();
    await AsyncStorage.clear();
    await navigation.navigate('SignIn');
  };

  return (
    <View style={styles.header}>
      <Image source={logoImg} />
      <View>
        <Menu
          ref={menu}
          button={
            <TouchableOpacity onPress={showMenu}>
              <Text style={{color: '#004d40'}}>
                <Icon name="ellipsis-v" color="#004d40" size={14} />
                &nbsp;MENU
              </Text>
            </TouchableOpacity>
          }>
          <MenuItem onPress={hideMenu}>
            <Icon name="edit" size={15} />
            &nbsp;&nbsp;&nbsp;Atualizar seu perfil
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={handleLogout}>
            <Icon name="power-off" size={15} />
            &nbsp;&nbsp;&nbsp;Sair
          </MenuItem>
        </Menu>
      </View>
    </View>
  );
}
