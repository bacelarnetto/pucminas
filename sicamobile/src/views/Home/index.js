import React, {useRef, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';

import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/FontAwesome';

import logoImg from '../../assets/logo.png';

import styles from './styles';
import {BarragemService as service} from './../../servers/barragem';
import RowDetail from '../../components/RowDetail';

export default function Home() {
  const navigation = useNavigation();

  const [barragem, setBarragem] = useState({});

  const menu = useRef();

  const hideMenu = () => menu.current.hide();

  const showMenu = () => menu.current.show();

  useEffect(() => {
    async function loadBarragem() {
      const email = await AsyncStorage.getItem('username');
      const response = await service.findBarragem(email);
      await setBarragem(response);
    }
    loadBarragem();
  }, []);

  const handleLogout = async () => {
    hideMenu();
    await AsyncStorage.clear();
    await navigation.navigate('SignIn');
  };

  const colorStatus = (id) => {
    let color = '';
    if (id === 1) {
      //Baixo
      color = '#107B2D';
    } else if (id === 2) {
      //Medio
      color = '#ff8000';
    } else {
      //Alto
      color = '#BA1717';
    }
    return color;
  };

  return (
    <ScrollView style={styles.container}>
       <StatusBar barStyle="dark-content"/>
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

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Acompanhe a situação da barragem proxima a sua residência.
      </Text>

      <View style={styles.detailPanel}>
        <RowDetail label="Nome da Barragem" value={barragem.descricao} init />

        <RowDetail
          label="Tipo"
          value={!barragem.tipo ? '' : barragem.tipo.nome}
        />
        <RowDetail label="Minerio" value={barragem.minerio} />
        <RowDetail label="Empreendedor" value={barragem.empreendedor} />
        <RowDetail
          label="CNPJ Empreendedor"
          value={barragem.cnpjEmpreendedor}
        />
        <RowDetail
          label="Alimentado por Usina"
          value={
            barragem.alimentadoUsina === 'S' || barragem.alimentadoUsina === 's'
              ? 'SIM'
              : 'NÃO'
          }
        />
        <RowDetail
          label="Vida Util(anos)"
          value={barragem.vidaUtilQuantidadeAnos}
        />
        <RowDetail label="Data da Construção" value={barragem.dataConstrucao} />

        <RowDetail
          label="Categoria de Risco"
          value={
            !barragem.categoriaRisco ? '' : barragem.categoriaRisco.descricao
          }
        />
        <RowDetail
          label="Dano Potencial Associado"
          value={
            !barragem.danoPotencialAssociado
              ? ''
              : barragem.danoPotencialAssociado.descricao
          }
        />
        <RowDetail
          label="Situação Operacional"
          value={
            !barragem.situacaoOperacional
              ? ''
              : barragem.situacaoOperacional.descricao
          }
        />
        <RowDetail
          label="Objetivo de Contenção"
          value={
            !barragem.objetivoContencao
              ? ''
              : barragem.objetivoContencao.descricao
          }
        />

        <RowDetail label="Cidade" value={barragem.cidade} />
        <RowDetail label="UF" value={barragem.uf} />
        <RowDetail label="Latitude" value={barragem.latitude} />
        <RowDetail label="Longitude" value={barragem.longitude} />
      </View>
    </ScrollView>
  );
}
