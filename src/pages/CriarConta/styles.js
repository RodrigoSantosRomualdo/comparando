import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   
  

    
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        //alignItems:'center',
        //justifyContent: 'center'
    },
    titulo: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 26,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%', 
        resizeMode: 'cover',
    },

    image: {
        //backgroundColor: 'red',
       // marginTop: '5%',
        width: '100%',
        //marginLeft: '5%',
        //marginRight: '5%'
        //display: 'flex',
        //alignSelf: 'center',
        position: 'relative', 
        
        
      },
      text: {
        color: "white",
        fontSize: 20,
        lineHeight: 80,
        //fontWeight: "bold",
        textAlign: "left",
        marginLeft: "10%"
        //backgroundColor: "#000000c0"
      }  

    
})

export default styles;