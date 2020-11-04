import React, {useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
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
      <View style={styles.topContainer}>
        <Text style={styles.title}>VibeMatch</Text>
      </View>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => login()}>
          <View>
            <Text style={styles.buttonText}>
              {accessToken ? accessToken : 'Spotify Login'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
