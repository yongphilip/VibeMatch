import React, {Component, createRef} from 'react';
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
import HomeScreen from '../Home/HomeScreen';

var swipeRef = createRef();

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Factory extends Component {
  constructor(props) {
    super(props);
    Sound.setCategory('Playback', false);

    this.state = {
      selectedPlaylist: props.selectedPlaylist,
      spotifyApi: props.spotifyApi,
      details: '',
      suggestions: [],
      currentSong: {},
      currentInsideSong: {},
      start: true,
      noSong: true,
      currentIndex: -1,
      accessToken: props.accessToken,
      returnHome: false,
    };
  }

  componentDidMount() {
    this.GetPlaylistDetails();
    this.setState({returnHome: false});
  }

  async GetPlaylistDetails() {
    await this.state.spotifyApi.getPlaylist(this.state.selectedPlaylist).then(
      (data) => {
        // console.log('Some information about this playlist', data.body);
        if (data.body.tracks.total === 0) {
        } else {
          this.setState({details: data.body});
          var num = Math.floor(
            Math.random() *
              Math.floor(
                data.body.tracks.total > 100 ? 100 : data.body.tracks.total,
              ),
          );

          // console.log(data.body.tracks.items[num].track.id);

          this.state.spotifyApi
            .getArtist(data.body.tracks.items[num].track.artists[0].id)
            .then(
              (dataA) => {
                console.log(
                  'Artist',
                  data.body.tracks.items[num].track.artists[0].id,
                );
                console.log('Genre', dataA.body.genres);
                console.log('Track', data.body.tracks.items[num].track.id);

                this.state.spotifyApi
                  .getRecommendations({
                    seed_artists:
                      data.body.tracks.items[num].track.artists[0].id,
                    seed_genres:
                      dataA.body.genres.length > 3
                        ? [
                            dataA.body.genres[0],
                            dataA.body.genres[1],
                            dataA.body.genres[2],
                          ]
                        : dataA.body.genres,
                    seed_tracks: data.body.tracks.items[num].track.id,
                    limit: 10,
                  })
                  .then(
                    (dataA) => {
                      let recommendations = dataA.body.tracks;
                      // console.log(recommendations);
                      this.setState({
                        suggestions: [
                          ...this.state.suggestions,
                          ...recommendations,
                        ],
                      });

                      // RNSoundPlayer.playUrl(dataA.body.tracks[0].preview_url);
                      if (this.state.start) {
                        if (dataA.body.tracks[0].preview_url !== null) {
                          const previewSong = new Sound(
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
                          this.setState({
                            currentSong: previewSong,
                            start: false,
                            noSong: false,
                          });
                        } else {
                          this.setState({start: false, noSong: true});
                        }
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
        }
      },
      function (err) {
        console.log('Something went wrong!', err);
      },
    );
  }

  swipedLeft(key) {
    if (!this.state.noSong) {
      this.state.currentSong.stop().release();
    }

    if (this.state.suggestions[key + 1].preview_url !== null) {
      // RNSoundPlayer.playUrl(dataA.body.tracks[0].preview_url);
      const previewSong = new Sound(
        this.state.suggestions[key + 1].preview_url,
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
              console.log('playback failed due to audio decoding errors');
            }
          });
        },
      );
      this.setState({
        currentSong: previewSong,
        noSong: false,
        currentIndex: key,
      });
    } else {
      this.setState({noSong: true, currentIndex: key});
    }
    if (key % 5 === 0) {
      this.GetPlaylistDetails();
    }
  }

  async swipedRight(key, item) {
    if (!this.state.noSong) {
      this.state.currentSong.stop().release();
    }

    if (this.state.suggestions[key + 1].preview_url !== null) {
      // RNSoundPlayer.playUrl(dataA.body.tracks[0].preview_url);
      const previewSong = new Sound(
        this.state.suggestions[key + 1].preview_url,
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
              console.log('playback failed due to audio decoding errors');
            }
          });
        },
      );
      this.setState({
        currentSong: previewSong,
        noSong: false,
        currentIndex: key,
      });
    } else {
      this.setState({noSong: true, currentIndex: key});
    }
    if (key % 5 === 0) {
      this.GetPlaylistDetails();
    }
    await this.state.spotifyApi
      .addTracksToPlaylist(this.state.selectedPlaylist, [item])
      .then(
        function (data) {
          // console.log('Added tracks to playlist!');
        },
        function (err) {
          console.log('Something went wrong!', err);
        },
      );
  }

  onGoBack() {
    swipeRef.goBackFromBottom();
    if (this.state.currentIndex !== -1) {
      if (!this.state.noSong) {
        this.state.currentSong.stop().release();
      }

      if (
        this.state.suggestions[this.state.currentIndex].preview_url !== null
      ) {
        // RNSoundPlayer.playUrl(dataA.body.tracks[0].preview_url);
        const previewSong = new Sound(
          this.state.suggestions[this.state.currentIndex].preview_url,
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
                console.log('playback failed due to audio decoding errors');
              }
            });
          },
        );
        var newIndex = this.state.currentIndex - 1;
        this.setState({
          currentSong: previewSong,
          noSong: false,
          currentIndex: newIndex,
        });
      } else {
        var newIndex = this.state.currentIndex - 1;
        this.setState({noSong: true, currentIndex: newIndex});
      }
    }
  }

  LoadingScreen() {
    if (this.state.returnHome) {
      if (!this.state.noSong) {
        this.state.currentSong.stop().release();
      }
      return <HomeScreen accessToken={this.state.accessToken} />;
    }
    if (this.state.details) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerContainer}>
            {this.state.details.images.length > 0 ? (
              <TouchableOpacity
                onPress={() => this.setState({returnHome: true})}>
                <Image
                  source={{uri: this.state.details.images[0].url}}
                  style={styles.playlistImage}
                  onPress={() => console.log('pressed')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => this.setState({returnHome: true})}>
                <Image
                  source={require('../../assets/noImg.jpg')}
                  style={styles.playlistImage}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{flex: 1}}>
            {this.state.suggestions ? (
              <CardStack
                disableTopSwipe
                disableBottomSwipe
                renderNoMoreCards={() => {}}
                ref={(swiper) => {
                  swipeRef = swiper;
                }}>
                {this.state.suggestions.map((item, key) => (
                  <Card
                    key={key}
                    onSwipedLeft={() => this.swipedLeft(key)}
                    onSwipedRight={() => this.swipedRight(key, item.uri)}>
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
            <View style={{alignSelf: 'center', top: 250}}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                if this takes more than 10 seconds
              </Text>
              <Text style={{color: 'white', textAlign: 'center'}}>
                please restart the app
              </Text>
            </View>
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
                this.onGoBack();
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

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 25}}>Loading /</Text>
        <Text style={{color: 'white', fontSize: 25}}>
          There's No Song In Playlist
        </Text>
      </View>
    );
  }

  render() {
    return <>{this.LoadingScreen()}</>;
  }
}
