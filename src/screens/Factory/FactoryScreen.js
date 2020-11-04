import React, {createRef, useEffect, useState} from 'react';
import {View, Text, Image, SafeAreaView, Dimensions} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import styles from './styles';

var swipeRef = createRef();

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function FactoryScreen({selectedPlaylist, spotifyApi}) {
  const [details, setDetails] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    GetPlaylistDetails();
  }, []);

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

        console.log(data.body.tracks.items[num].track.id);

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

  function swipedLeft(key) {
    if (key % 5 === 0) {
      GetPlaylistDetails();
    }
  }

  async function swipedRight(key, item) {
    if (key % 5 === 0) {
      GetPlaylistDetails();
    }
    await spotifyApi.addTracksToPlaylist(selectedPlaylist, [item]).then(
      function (data) {
        console.log('Added tracks to playlist!');
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
        {suggestions ? (
          <CardStack
            renderNoMoreCards={() => {}}
            ref={(swiper) => {
              swipeRef = swiper;
            }}>
            {suggestions.map((item, key) => (
              <Card
                key={key}
                onSwipedLeft={() => swipedLeft(key)}
                onSwipedRight={() => swipedRight(key, item.uri)}>
                <View
                  style={{
                    padding: 10,
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
                      borderRadius: 20,
                    }}
                  />
                </View>
              </Card>
            ))}
          </CardStack>
        ) : null}
      </SafeAreaView>
    );
  }

  return <Text>loading</Text>;
}
