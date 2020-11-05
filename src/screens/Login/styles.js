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
  },
  title: {
    color: '#1ed760',
    fontSize: 60,
    fontWeight: 'bold',
  },
  buttonContainer: {
    height: 60,
    width: 250,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1ed760',
    marginBottom: 100,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 30,
  },
});

export default styles;
