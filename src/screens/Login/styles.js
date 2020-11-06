const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#242328',
    alignItems: 'center',
  },
  titleContainer: {
    height: 70,
    marginTop: 50,
  },
  bodyContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  bodyText: {
    color: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'NotoSansSC-Bold',
  },
  title: {
    color: '#1ed760',
    fontSize: 60,
    fontFamily: 'NotoSansSC-Bold',
  },
  buttonContainer: {
    height: 60,
    width: 300,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1ed760',
    marginBottom: 100,
    flexDirection: 'row',
  },
  buttonText: {
    marginLeft: 10,
    color: '#ffffff',
    fontSize: 25,
    fontFamily: 'NotoSansSC-Bold',
  },
});

export default styles;
