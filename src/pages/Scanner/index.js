import React, { useState, useEffect } from 'react';
import { Image,Text, View, StyleSheet, Button, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import servicesSupIdDescProdUnidade from '../../services/servicesSupIdDescProdUnidade'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const qrSize = width * 0.7;

import img from '../../assets/qr-code.jpg'

export default function Scanner() {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleCodNot, setModalVisibleCodNot] = useState(false);
    const [resultCod, setResultCod] = useState();
    const [modalVisibleAddProduto, setModalVisibleAddProduto] = useState(false);
    const [codigoQrcode, setCodigoQrcode] = useState('Aponte a câmera para o código de barras.')
    const [caminhoIMG, setCaminhoIMG] = useState('../../assets/qr-code.jpg')
  
    const askForCameraPermission = () => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })()
    }
  
    // Request Camera Permission
    useEffect(() => {
      askForCameraPermission();
    }, []);
  
    // What happens when we scan the bar code
    const handleBarCodeScanned = async ({ type, data }) => {
      let responseAPI
      setScanned(true);
      setCodigoQrcode(data)
      console.log('Type: ' + type + '\nData: ' + data)

    const response = await servicesSupIdDescProdUnidade.post('/buscar-codigo-barras-findone',{
        codigo_barras: data, 
    })
     responseAPI = await response.data;
     
    //await setResultCod(response.data)
    //resultCod, setResultCod

    if (response.status === 200) {
      if(response.data.codigo_barras === data) {
        //console.log('response.data VAZIO ', responseAPI.length) 
        //console.log('responseAPI: ',responseAPI )
          //console.log('response.data: ',response.data )
         await setResultCod(response.data)
         setModalVisible(true)
      } else {
        // modalVisibleCodNot, setModalVisibleCodNot
        console.log('Não achamos o produto pelo código de barras deseja pesquisar pelo nome')
        setModalVisibleCodNot(true)
        
        
      }
      
    }

   
    //console.log(response)
  };

    const scannedDesativada = () => {
        setScanned(false);
        setCodigoQrcode('')
    }

   
  
    // Check permissions and return the screens
    if (hasPermission === null) {
      return (
        <View style={styles.container}>
          <Text>Solicitando permissão de câmera</Text>
        </View>)
    }
    if (hasPermission === false) {
      return (
        <View style={styles.container}>
          <Text style={{ margin: 10 }}>Sem acesso à câmera</Text>
          <Button title={'Permitir Câmera'} onPress={() => askForCameraPermission()} />
        </View>)
    }

    const fazer = () => {
      console.log('FAZER')
    }

    const lerQrcodeNovamente =  () => {
      console.log('VOLTAR')
      setScanned(false);
      setCodigoQrcode('')
      setModalVisible(false)
      setModalVisibleCodNot(false)
      //setResultCod('')
    }
 
    const buscarProduto = () => {
      console.log('BUSCAR PRODUTO')
      setScanned(false);
      setCodigoQrcode('')
      setModalVisible(false)
      setModalVisibleCodNot(false)

      navigation.navigate('PesquisaQrcode', 
      {codigo_barras: codigoQrcode, 
      });
    }

    const buscarPeloNomeHome = () => {
      console.log('buscarPeloNomeHome ')
      setScanned(false);
      setCodigoQrcode('')
      setModalVisible(false)
      setModalVisibleCodNot(false)
    }

    
    return (
      <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
        
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.container]}>
        <Text style={styles.description}>Ler QRcode</Text>
        <View style={{width: '50%', height: '30%',  borderColor: '#E5E5E5', borderWidth: 4, borderRadius: 20,
      marginTop: '20%',
      marginBottom: '20%',
      width: qrSize,
      height: qrSize,}}></View>
       
        
      </BarCodeScanner>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>O código escaneado é {resultCod?.codigo_barras}</Text>
            <Text style={styles.modalText}>Item: {resultCod?.descricao}</Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => lerQrcodeNovamente()}
            >
              <Text style={styles.textStyle}>Escanear</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => buscarProduto()}
            >
              <Text style={styles.textStyle}>Buscar Menor Preço</Text>
            </Pressable>

            </View>
          </View>
        </View>
      </Modal>

      

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleCodNot}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisibleCodNot);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Produto não encontrado</Text>
            <Text style={styles.modalText}>Código: {codigoQrcode}</Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => lerQrcodeNovamente()}
            >
              <Text style={styles.textStyle}>Escanear</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => buscarPeloNomeHome()}
            >
              <Text style={styles.textStyle}>Buscar pelo nome</Text>
            </Pressable>

            </View>
          </View>
        </View>
      </Modal>
      
    </View>
    );
  }

  /*
modalVisibleCodNot, setModalVisibleCodNot
{resultCod && Alert.alert(
        //title
        'Produto encontrado',
        //body
        `O código escaneado é ${resultCod.descricao}`,
        [
          
          {
            text: 'Voltar', onPress: () => setScanned(false) , 
            cancelable: true,
          },
        
          
          {
            text: 'Ver Preço', onPress: () => console.log('BUSCAR Menor PREÇO')
          },
        ],
      )

        }














  {
            text: 'Voltar', onPress: () => console.log('Yes Pressed')
          },

   <Text onPress={() => alert("Vamos voltar para o Inicio")} style={styles.cancel}>
          Cancel
        </Text>

{scanned && (
        <Button title={'Ler QR code Novamente'} onPress={() => setScanned(false)} />
      )}

  */
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    qr: {
      marginTop: '20%',
      marginBottom: '20%',
      width: qrSize,
      height: qrSize,
    },
    description: {
      fontSize: width * 0.09,
      marginTop: '10%',
      textAlign: 'center',
      width: '70%',
      color: 'white',
    },
    cancel: {
      fontSize: width * 0.05,
      textAlign: 'center',
      width: '70%',
      color: 'white',
    },
    centeredView: {
      marginTop: '45%'
    },
    modalView: {
      //margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      height: 250,
      //alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 25,
      textAlign: "center",
      fontSize: 20
    }
  });

  
    
  



  /*
<View style={styles.container}>

        <View style={{ marginTop: '5%', height: '10%'}}>
                    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center'}} onPress={() => navigation.navigate('Home')}>
                        <Ionicons name="chevron-back-outline" size={24} color="black" />
                        <Text style={{fontSize: 22, fontWeight: 'normal'}}>Voltar</Text>
                    </TouchableOpacity>
                    
                   
          </View>

        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ width: '50%', height: '50%', backgroundColor: 'red' }} 
            />
        </View>
        <Text style={styles.maintext}>{text}</Text>

        {scanned && 
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{marginTop: '5%' , marginRight: 20, borderRadius: 30}}>
                 <TouchableOpacity style={{backgroundColor: '#8B80FC', borderRadius: 10, height:40, width: 160, alignItems: 'center', justifyContent: 'center'}} 
                 onPress={() => scannedDesativada()}>
                        <Text style={{fontSize: 15, fontWeight: '700'}}>Scanear novamente?</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: '5%', marginLeft: 20}}>
                <TouchableOpacity style={{backgroundColor: '#8B80FC', borderRadius: 10, height:40, width: 150, alignItems: 'center', justifyContent: 'center'}} 
                onPress={() => setScanned(false)}>
                        <Text style={{fontSize: 17, fontWeight: '700'}}>Buscar o preço?</Text>
                </TouchableOpacity>
            </View>
        
        
        </View>
        }

        
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E5E5E5',
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    maintext: {
      fontSize: 16,
      margin: 20,
    },
    barcodebox: {
      alignItems: 'center',
      //paddingTop: 20,
      //justifyContent: 'center',
      //height: 200,
      //width: 200,
      overflow: 'hidden',
      //borderRadius: 200,
      //backgroundColor: '#8B80FC'
    }
  });



  */