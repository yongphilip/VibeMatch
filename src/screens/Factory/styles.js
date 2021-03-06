const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  playlistImage: {
    width: 90,
    height: 90,
    marginTop: 20,
  },
  playlistTitle: {
    color: '#ffffff',
    fontSize: 25,
    fontFamily: 'NotoSansSC-Bold',
    lineHeight: 30,
    marginTop: 10,
    marginBottom: 5,
  },
  playlistArtists: {
    color: '#b3b3b3',
    fontSize: 20,
    fontFamily: 'NotoSansSC-Bold',
    lineHeight: 25,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 50,
  },
  icon: {
    backgroundColor: '#282828',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  iconSmall: {
    backgroundColor: '#282828',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
  },
});

export default styles;
