import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import backgroundImage from '../../assets/login.png'

import styles from './styles';

import {AuthService as authService} from './../../servers/auth';

export default function SingIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      await authService.authUser(email, password);
      await navigation.navigate('Home');
      setLoading(false);
      setMessage('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setLoading(false);
      setMessage(`${error.message}`);
    }
  }

  const renderMessage = () => {
    if (!message) {
      return null;
    }
    return (
      <View style={styles.messageErro}>
        <Text style={styles.messageErroText}>
          <Icon name="exclamation-circle" color="#FFFFFF" size={16} />
          &nbsp;&nbsp;{message}
        </Text>
      </View>
    );
  };

  const renderButton = () => {
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground 
    source={backgroundImage}
    style={styles.container}>
      <StatusBar translucent backgroundColor="transparent"/>
     
      {renderMessage()}
      <TextInput
        placeholder="Digite seu e-mail"
        placeholderTextColor="#aac6a5"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholderTextColor="#aac6a5"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="******"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {renderButton()}
    </ImageBackground>
  );
}
