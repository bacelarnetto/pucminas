import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ScrollView,
  StatusBar,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showMessage, hideMessage } from "react-native-flash-message";

import validation from './../../common/validationUtil';

import styles from './styles';
import logoImg from './../../assets/logo.png';
import RowForm from '../../components/RowForm';

import { MoradorService as moradorService }  from './../../servers/morador'

export default function TrocarSenha() {

  const [email, setEmail] = useState('');
  const [senhaVerf, setSenhaVerf] = useState('');
  const [senha, setSenha] = useState('');

  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateBack() {
    navigation.navigate('Home');
  }

  async function handleSave() {
    setLoading(true);
    const emailv = await AsyncStorage.getItem('username');
    if(      
        validation.required(senha) ||
        validation.required(senhaVerf)
    ){     
      setShowErrors(true);
      showMessage({
        message: "Ateção!",
        description: "Por favor, preencha todos os campos obrigatórios.",
        type: "danger",
        icon: "auto"
      });
      setLoading(false);
    } else if( senha !== senhaVerf){
      showMessage({
        message: "Ateção!",
        description: "Por favor, as senhas tem que serem iguais.",
        type: "danger",
        icon: "auto"
      });
      setShowErrors(true);
      setLoading(false);
    } else {
      
      await moradorService.alterarSenha({email: emailv, senha}) ;  

      setShowErrors(false);
      showMessage({
        message: "Sucesso!",
        description: "Cadastro realizado.",
        type: "success",
      });
      setSenha('');
      setSenhaVerf('');

      setLoading(false);
    }
    
  }

  const renderButton = () => {
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>
            {'Salvar'}
        </Text>
    </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.header}>
        <TouchableOpacity style={{paddingRight:10}}>
          <Icon name="angle-left" color="#004d40" size={35} onPress={navigateBack} />
        </TouchableOpacity>
       
        <Image source={logoImg} />
       
      </View>
      <View style={styles.detailPanelHeader}>
        <Text  style={styles.detailPanelTitle} >Alteração de senha</Text>
      </View>
      <View style={styles.detailPanel}>


        <RowForm>
          <TextInput
            placeholderTextColor="#aac6a0"
            style={styles.input}
            placeholder="Senha"
            autoCapitalize="none"
            autoCorrect={false}            
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            underlineColorAndroid={showErrors && validation.required(senha) ? "#BA1717": "#115301" }
          />
          {showErrors && validation.required(senha) && 
          <Text style={{marginLeft: 10, color:'#BA1717', fontSize:11}}>
              {validation.required(senha)}
          </Text>}
        </RowForm>
        
        <RowForm>
          <TextInput
            placeholderTextColor="#aac6a0"
            style={styles.input}
            placeholder="Comfirmar a senha"
            autoCapitalize="none"
            autoCorrect={false}            
            secureTextEntry
            value={senhaVerf}
            onChangeText={setSenhaVerf}
            underlineColorAndroid={showErrors && validation.required(senhaVerf) ? "#BA1717": "#115301" }
          />
          {showErrors && validation.required(senhaVerf) && 
          <Text style={{marginLeft: 10, color:'#BA1717', fontSize:11}}>
              {validation.required(senhaVerf)}
          </Text>}
        </RowForm>
       
        
      </View>
      <View style={styles.detailAction}>

        {renderButton()}

        </View>
    </ScrollView>
  );
}
