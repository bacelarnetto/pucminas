import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text, ScrollView, StatusBar} from 'react-native';

import styles from './styles';
import {BarragemService as service} from './../../servers/barragem';
import RowDetail from '../../components/RowDetail';
import Header from '../../components/Header';
import Alert from '../../components/Alert';

export default function Home() {
  const [barragem, setBarragem] = useState({});

  useEffect(() => {
    async function loadBarragem() {
      const email = await AsyncStorage.getItem('username');
      const response = await service.findBarragem(email);
      await setBarragem(response);
    }
    loadBarragem();
  }, []);

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
      <StatusBar barStyle="dark-content" />

      <Header />

      {barragem.categoriaRisco && barragem.categoriaRisco.codigo === 3 && (
        <Alert />
      )}

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
          style={{
            color: colorStatus(
              !barragem.categoriaRisco ? '' : barragem.categoriaRisco.codigo
            ),
            fontWeight: 'bold',
          }}
          value={
            !barragem.categoriaRisco ? '' : barragem.categoriaRisco.descricao
          }
        />
        <RowDetail
          label="Dano Potencial Associado"
          style={{
            color: colorStatus(
              !barragem.danoPotencialAssociado
                ? ''
                : barragem.danoPotencialAssociado.codigo
            ),
            fontWeight: 'bold',
          }}
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
