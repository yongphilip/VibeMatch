const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  topContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 60,
  },
  buttonContainer: {
    height: 60,
    width: 250,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1ed760',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 30,
  },
});

export default styles;
