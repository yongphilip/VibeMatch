const {Dimensions, StyleSheet} = require('react-native');

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  nameContainer: {
    margin: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    color: '#ffffff',
    fontSize: 30,
    textAlign: 'center',
  },
  playlistItem: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    height: 80,
    alignItems: 'center',
    margin: 10,
  },
  playlistImage: {
    width: 80,
    height: 80,
  },
  data: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 20,
  },
});

export default styles;
