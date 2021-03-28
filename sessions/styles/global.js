import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#463666',
    alignItems: 'center',
  },
  buttonAllign: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row'
  }, 
  titleText: {
    fontFamily: 'monospace',
    fontSize: 36,
    alignItems: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  paragraph: {
    marginVertical: 8,
    lineHeight:20,
  },
  input: {
    height: 40, 
    width: 250, 
    borderColor: "gray", 
    backgroundColor: "#FFFFFF", 
    paddingLeft: 10, 
    borderWidth: 1,
    marginBottom: 20, 
    borderRadius: 4,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 5,
  },
  fineText: {
    marginTop: 10,
  }
});

export default globalStyles;