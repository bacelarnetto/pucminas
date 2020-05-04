import React, {useState, useEffect} from 'react';
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
import {Picker} from '@react-native-community/picker';
import { TextInputMask } from 'react-native-masked-text'
import { showMessage, hideMessage } from "react-native-flash-message";

import estados from './../../common/UF';
import validation from './../../common/validationUtil';

import styles from './styles';
import logoImg from './../../assets/logo.png';
import RowForm from '../../components/RowForm';

import { BarragemService as barragemService }  from './../../servers/barragem'
import { MoradorService as moradorService }  from './../../servers/morador'

export default function AlterarDados() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [telefone, setTelefone] = useState('');
  const [uf, setUf] = useState('sel');
  const [idBarragem, setIdBarragem] = useState('sel');

  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);

  const UFs = estados;

  const [barragens, setBarragens] = useState([]);

  const navigation = useNavigation();

  function navigateBack() {
    navigation.navigate('Home');
  }

  useEffect(() => {
    async function detalheMorador() {
      const list = await barragemService.findList()
      setBarragens(list);
      const emailv = await AsyncStorage.getItem('username');
      
      const morador = await moradorService.findMoradorByEmail(emailv)
      let codBarragem = 
                     morador.barragem !== null && 
                     morador.barragem !== '' && 
                     morador.barragem !== undefined ? morador.barragem.id : 'sel'
    
       setId(morador.id || '');  
       setNome(morador.nome|| ''); 
       setIdade(morador.idade || ''); 
       setEmail(morador.email || ''); 
       setCidade(morador.cidade || ''); 
       setEndereco(morador.endereco || ''); 
       setBairro(morador.bairro || ''); 
       setNumero(morador.numero || ''); 
       setTelefone(morador.telefone || ''); 
       setUf(morador.uf || 'sel'); 
       setIdBarragem (codBarragem);    

     }
     detalheMorador();
  }, []);

  async function handleSave() {
    setLoading(true);
    const emailv = await AsyncStorage.getItem('username');

    if( 
        validation.required(nome)||
        validation.required(idade)||
        validation.required(endereco)||
        validation.required(bairro)||
        validation.required(numero)||
        validation.required(cidade)||
        (uf === 'sel') ||
        (idBarragem === 'sel') ||
        validation.required(email)
    ){
     
      setShowErrors(true);
      showMessage({
        message: "Ateção!",
        description: "Por favor, preencha todos os campos obrigatórios.",
        type: "danger",
        icon: "auto"
      });
      setLoading(false);
    }else{
      await moradorService.alterarMorador({
        id,
        nome,
        idade,
        email: emailv, 
        cidade, 
        endereco, 
        bairro, 
        numero, 
        telefone, 
        uf, 
        idBarragem, 
      }) ;        

      
      showMessage({
        message: "Sucesso!",
        description: "Cadastro realizado.",
        type: "success",
      });
     
      setShowErrors(false);
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
        <Text  style={styles.detailPanelTitle} >Alteração de Dados Pessoais</Text>
      </View>
      <View style={styles.detailPanel}>
        <RowForm>
          <TextInput
            placeholderTextColor="#aac6a0"
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
            multiline={true}
            underlineColorAndroid={showErrors && validation.required(nome) ? "#BA1717": "#115301" }
          />
          {showErrors && validation.required(nome) && <Text style={{marginLeft: 10, color:'#BA1717', fontSize:11}}>{validation.required(nome)}</Text>}
        </RowForm>

        <RowForm>
          <TextInput
            placeholderTextColor="#aac6a0"
            style={styles.input}
            placeholder="Idade"
            value={String(idade)}
            onChangeText={setIdade}
            multiline={true}
            keyboardType={'numeric'}
            underlineColorAndroid={showErrors && validation.required(idade) ? "#BA1717": "#115301" }
          />
          {showErrors && validation.required(idade) && 
          <Text style={{marginLeft: 10, color:'#BA1717', fontSize:11}}>
              {validation.required(idade)}
          </Text>}
        </RowForm>

        <RowForm>
          <TextInput
            placeholderTextColor="#aac6a0"
            style={styles.input}
            placeholder="Endereço"
            value={endereco}
            onChangeText={setEndereco}
            numberOfLines={2}
            multiline={true}
            underlineColorAndroid={showErrors && validation.required(endereco) ? "#BA1717": "#115301" }
          />
          {showErrors && validation.required(endereco) && 
          <Text style={{marginLeft: 10, color:'#BA1717', fontSize:11}}>
              {validation.required(endereco)}
          </Text>}
        </RowForm>

        <RowForm>
          <TextInput
            placeholderTextColor="#aac6a0"
            style={styles.input}
            placeholder="Bairro"
            value={bairro}
            onChangeText={setBairro}
            multiline={true}
            underlineColorAndroid={showErrors && validation.required(bairro) ? "#BA1717": "#115301" }
          />
          {showErrors && validation.required(bairro) && 
          <Text style={{marginLeft: 10, color:'#BA1717', fontSize:11}}>
              {validation.required(bairro)}
          </Text>}
        </RowForm>

        <RowForm>
          <TextInput
            placeholderTextColor="#aac6a0"
            style={styles.input}
            placeholder="Numero"
            value={numero}
            onChangeText={setNumero}
            multiline={true}
            keyboardType={'numeric'}
            underlineColorAndroid={showErrors && validation.required(numero) ? "#BA1717": "#115301" }
          />
           {showErrors && validation.required(numero) && 
          <Text style={{marginLeft: 10, color:'#BA1717', fontSize:11}}>
              {validation.required(numero)}
          </Text>}
        </RowForm>

        <RowForm>
          <TextInput
            placeholderTextColor="#aac6a0"
            style={styles.input}
            placeholder="Cidade"
            value={cidade}
            onChangeText={setCidade}
            multiline={true}
            underlineColorAndroid={showErrors && validation.required(cidade) ? "#BA1717": "#115301" }
          />
           {showErrors && validation.required(cidade) && 
          <Text style={{marginLeft: 10, color:'#BA1717', fontSize:11}}>
              {validation.required(cidade)}
          </Text>}
        </RowForm>

        <RowForm>
          <Picker
            selectedValue={uf}
            onValueChange={(itemValue) => setUf(itemValue)}>
            <Picker.Item label="UF" value="sel"  color="#aac6a0"/>
            {UFs.map((option) => (
              <Picker.Item
                key={option.key}
                label={option.value}
                value={option.key}
              />
            ))}
          </Picker>
          {showErrors && (uf === 'sel') && 
          <Text style={{marginLeft: 10, color:'#BA1717', fontSize:11}}>
              {'Preenchimento obrigatório'}
          </Text>}
        </RowForm>

        <RowForm>
          <TextInputMask
            placeholderTextColor="#aac6a0"
            type={'cel-phone'}
            placeholder="Telefone"
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            value={telefone}
            onChangeText={setTelefone}
            underlineColorAndroid="#115301"
          />
        </RowForm>


        <RowForm>
          <Picker
            selectedValue={idBarragem}
            onValueChange={(itemValue) => setIdBarragem(itemValue)}>
            <Picker.Item label="Barragem" value="sel"  color="#aac6a0"/>
            {barragens.map((option) => (
              <Picker.Item
                key={option.id+'-'+option.descricao}
                label={option.descricao}
                value={option.id}
              />
            ))}
          </Picker>
          {showErrors && (idBarragem === 'sel') && 
          <Text style={{marginLeft: 10, color:'#BA1717', fontSize:11}}>
              {'Preenchimento obrigatório'}
          </Text>}
        </RowForm>

      </View>
      <View style={styles.detailAction}>

        {renderButton()}

        </View>
    </ScrollView>
  );
}
