import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create ({
   container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
   },
   buttonAllign: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row'
   }, 
   titleText: {
       fontFamily: 'nunito-bold',
       fontSize: 18,
       padding: 5,
   },
   paragraph: {
       marginVertical: 8,
       lineHeight:20,
   },
   input: {
       borderWidth: 1,
       borderColor: '#777',
       padding: 8,
       margin: 10,
       width: 200,
   }
});

export default globalStyles;