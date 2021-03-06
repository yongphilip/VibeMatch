import React, {useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

import authHandler from '../../utils/AuthenticationHandler';
import HomeScreen from '../Home/HomeScreen';

export default function LoginScreen() {
  const [accessToken, setAccessToken] = useState();

  async function login() {
    var {code, status} = await authHandler.onLogin();
    console.log(status);

    if (status === true) {
      setAccessToken(code.accessToken);
    }
  }

  if (accessToken) {
    return <HomeScreen accessToken={accessToken} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>VibeMatch</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyText}>Love meets Tunes.</Text>
        <Text style={styles.bodyText}>All just a swipe away!</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => login()}>
        <FontAwesome name="spotify" size={35} color="white" />
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
