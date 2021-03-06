import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: StatusBar.currentHeight || 0,
      },
      containerCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      containerCarregando: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },

   /* container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        //alignItems:'center',
        //justifyContent: 'center'
    }, */
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