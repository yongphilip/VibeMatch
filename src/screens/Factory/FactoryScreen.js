import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  Linking,
  TouchableOpacity,
} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import Sound from 'react-native-sound';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

var swipeRef = createRef();

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function FactoryScreen({selectedPlaylist, spotifyApi}) {
  const [details, setDetails] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    GetPlaylistDetails();
  }, []);

  Sound.setCategory('Playback', false);

  var previewSong;

  async function GetPlaylistDetails() {
    await spotifyApi.getPlaylist(selectedPlaylist).then(
      function (data) {
        // console.log('Some information about this playlist', data.body);
        setDetails(data.body);
        var num = Math.floor(
          Math.random() *
            Math.floor(
              data.body.tracks.total > 100 ? 100 : data.body.tracks.total,
            ),
        );

        // console.log(data.body.tracks.items[num].track.id);

        spotifyApi
          .getArtist(data.body.tracks.items[num].track.artists[0].id)
          .then(
            function (dataA) {
              //   console.log('Artist information', dataA.body);
              spotifyApi
                .getRecommendations({
                  seed_artists: data.body.tracks.items[num].track.artists[0].id,
                  seed_genres: dataA.body.genres,
                  seed_tracks: data.body.tracks.items[num].track.id,
                  limit: 10,
                })
                .then(
                  function (dataA) {
                    let recommendations = dataA.body.tracks;
                    // console.log(recommendations);
                    setSuggestions([...suggestions, ...recommendations]);
                    if (
                      suggestions.length === 0 &&
                      dataA.body.tracks[0].preview_url !== null
                    ) {
                      // RNSoundPlayer.playUrl(dataA.body.tracks[0].preview_url);
                      previewSong = new Sound(
                        dataA.body.tracks[0].preview_url,
                        Sound.MAIN_BUNDLE,
                        (error) => {
                          if (error) {
                            console.log('failed to load the sound', error);
                            return;
                          }
                          // loaded successfully
                          console.log(
                            'duration in seconds: ' +
                              previewSong.getDuration() +
                              'number of channels: ' +
                              previewSong.getNumberOfChannels(),
                          );

                          // Play the sound with an onEnd callback
                          previewSong.play((success) => {
                            if (success) {
                              console.log('successfully finished playing');
                            } else {
                              console.log(
                                'playback failed due to audio decoding errors',
                              );
                            }
                          });
                        },
                      );
                    }
                  },
                  function (err) {
                    console.log('Something went wrong!', err);
                  },
                );
            },
            function (err) {
              console.error(err);
            },
          );
      },
      function (err) {
        console.log('Something went wrong!', err);
      },
    );
  }

  // var previewSong = new Sound(song, Sound.MAIN_BUNDLE, (error) => {
  //   if (error) {
  //     console.log('failed to load the sound', error);
  //     return;
  //   }
  //   // loaded successfully
  //   console.log(
  //     'duration in seconds: ' +
  //       previewSong.getDuration() +
  //       'number of channels: ' +
  //       previewSong.getNumberOfChannels(),
  //   );

  //   // Play the sound with an onEnd callback
  //   previewSong.play((success) => {
  //     if (success) {
  //       console.log('successfully finished playing');
  //     } else {
  //       console.log('playback failed due to audio decoding errors');
  //     }
  //   });
  // });

  function swipedLeft(key, song) {
    if (song !== null) {
      previewSong = new Sound(song, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        console.log(
          'duration in seconds: ' +
            previewSong.getDuration() +
            'number of channels: ' +
            previewSong.getNumberOfChannels(),
        );

        // Play the sound with an onEnd callback
        previewSong.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      });
    }
    if (key % 5 === 0) {
      GetPlaylistDetails();
    }
  }

  async function swipedRight(key, song, item) {
    if (key % 5 === 0) {
      GetPlaylistDetails();
    }
    await spotifyApi.addTracksToPlaylist(selectedPlaylist, [item]).then(
      function (data) {
        // console.log('Added tracks to playlist!');
      },
      function (err) {
        console.log('Something went wrong!', err);
      },
    );
  }

  if (details) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          {details.images.length > 0 ? (
            <Image
              source={{uri: details.images[0].url}}
              style={styles.playlistImage}
            />
          ) : (
            <Image
              source={require('../../assets/noImg.jpg')}
              style={styles.playlistImage}
            />
          )}
        </View>
        <View style={{flex: 1}}>
          {suggestions ? (
            <CardStack
              disableTopSwipe
              disableBottomSwipe
              renderNoMoreCards={() => {
                <Text>
                  if this takes more than 10 seconds, please restart the app
                </Text>;
              }}
              ref={(swiper) => {
                swipeRef = swiper;
              }}>
              {suggestions.map((item, key) => (
                <Card
                  key={key}
                  onSwipedLeft={() => swipedLeft(key, item.preview_url)}
                  onSwipedRight={() =>
                    swipedRight(key, item.preview_url, item.uri)
                  }>
                  <View
                    style={{
                      padding: 10,
                      paddingBottom: 0,
                      width: SCREEN_WIDTH,
                      height: SCREEN_WIDTH,
                    }}>
                    <Image
                      source={{uri: item.album.images[0].url}}
                      style={{
                        flex: 1,
                        width: null,
                        height: null,
                        resizeMode: 'cover',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: '#181818',
                      height: 100,
                      margin: 10,
                      marginTop: 0,
                      padding: 10,
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                    }}>
                    <Text
                      style={styles.playlistTitle}
                      numberOfLines={1}
                      onPress={() =>
                        Linking.openURL(item.external_urls.spotify)
                      }>
                      {item.name}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text numberOfLines={1}>
                        {item.artists.map((item, key) => (
                          <Text
                            key={key}
                            style={styles.playlistArtists}
                            onPress={() =>
                              Linking.openURL(item.external_urls.spotify)
                            }>
                            {key !== 0 ? ', ' : ''}
                            {item.name}
                          </Text>
                        ))}
                      </Text>
                    </View>
                  </View>
                </Card>
              ))}
            </CardStack>
          ) : null}
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              swipeRef.swipeLeft();
            }}>
            <FontAwesome name="close" size={50} color="#2e77d0" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconSmall}
            onPress={() => {
              swipeRef.goBackFromBottom();
            }}>
            <FontAwesome name="rotate-left" size={30} color="#f7cd6d" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              swipeRef.swipeRight();
            }}>
            <FontAwesome name="heart" size={45} color="#1db954" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return <Text>loading</Text>;
}
