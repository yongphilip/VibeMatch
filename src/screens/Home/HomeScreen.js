import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Factory from '../Factory';
import FactoryScreen from '../Factory/FactoryScreen';
import styles from './styles';

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: 'be02be8587024bd69760fc0ba970e30f',
  clientSecret: 'a9f71a2a154b40b8b6213997c3c3a122',
  redirectUrl: 'com.spotifytest://oauthredirect',
});

export default function HomeScreen({accessToken}) {
  const [user, setUser] = useState('');
  const [playlists, setPlaylists] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState('');

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken);
    GetUserData();
  }, []);

  async function GetUserData() {
    await spotifyApi
      .getMe()
      .then(
        function (data) {
          // console.log(
          //   'Some information about the authenticated user',
          //   data.body,
          // );
          setUser(data.body);
          spotifyApi.getUserPlaylists(data.uri).then(
            function (dataPL) {
              // console.log('Retrieved playlists', dataPL.body);
              setPlaylists(dataPL.body.items);
            },
            function (err) {
              console.log('Something went wrong!', err);
            },
          );
        },
        function (err) {
          console.log('Something went wrong!', err);
        },
      )
      .then();
  }

  if (selectedPlaylist) {
    return (
      <Factory selectedPlaylist={selectedPlaylist} spotifyApi={spotifyApi} />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.nameContainer}>
        {user ? (
          <Image
            source={{uri: user.images[0].url}}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={require('../../assets/noProfile.jpg')}
            style={styles.profileImage}
          />
        )}
        <Text style={styles.name}>'s playlists</Text>
      </View>
      <ScrollView style={{flex: 1}}>
        {playlists
          ? playlists.map((item, key) => {
              return item.owner.display_name === user.display_name ? (
                <TouchableOpacity
                  style={styles.playlistItem}
                  key={key}
                  onPress={() => setSelectedPlaylist(item.id)}>
                  {item.images.length > 0 ? (
                    <Image
                      source={{uri: item.images[0].url}}
                      style={styles.playlistImage}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/noImg.jpg')}
                      style={styles.playlistImage}
                    />
                  )}
                  <Text style={styles.data}>{item.name}</Text>
                </TouchableOpacity>
              ) : null;
            })
          : null}
      </ScrollView>
    </SafeAreaView>
  );
}
