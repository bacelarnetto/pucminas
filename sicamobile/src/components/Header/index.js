import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';

import {View, Text, Image, TouchableOpacity} from 'react-native';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/FontAwesome';

import logoImg from './../../assets/logo.png';
import { onSignOut } from './../../auth';

import styles from './styles';

export default function Header() {
  const navigation = useNavigation();

  const menu = useRef();

  const hideMenu = () => menu.current.hide();

  const showMenu = () => menu.current.show();

  const handleLogout = async () => {
    hideMenu();
    await onSignOut();
    await navigation.navigate('SignIn');
  };

  function navigateTrocarSenha() {
    hideMenu();
    navigation.navigate('TrocarSenha');
  }

  function navigateAlterarDados() {
    hideMenu();
    navigation.navigate('AlterarDados');
  }

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
          <MenuItem onPress={navigateTrocarSenha}>
            <Icon name="lock" size={15} />
            &nbsp;&nbsp;&nbsp;Atualizar senha
          </MenuItem>
          <MenuItem onPress={navigateAlterarDados}>
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
