import React, { useState, useEffect } from 'react';
import { Button, Modal, Pressable, StyleSheet, Alert, Image, Text, View, ImageBackground, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback  } from 'react-native';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useKeyboard } from '@react-native-community/hooks'
import styles from './styles';
import * as Location from 'expo-location';
import servicesLocationSup from  '../../services/servicesLocationSup'
import Storage from '../../services/Storage';

import MapLocalizacao from '../../components/MapLocalizacao';
import ConfigButton from '../../components/ConfigButton';

export default function Home({navigation}) {
    const [valueText, setValueText] = useState();
    const [location, setLocation] = useState(null);
    const [supermecadoId, setSupermecadoId] = useState()
    const [supermecadoDistancia, setSupermecadoDistancia] = useState() 
    const [distancia, setDistancia] = useState(10000)
    const [desativaEnquantoDecide, setDesativaEnquantoDecide] = useState(false)
    const [loading, setLoading] = useState(false);
    const [modalVisibleKM, setModalVisibleKM] = useState(false);
    const [valueKM, setValueKM] = useState()
    

    const keyboardd = useKeyboard()
    //console.log('keyboard isKeyboardShow: ', keyboardd.keyboardShown)
    //console.log('keyboard keyboardHeight: ', keyboardd.keyboardHeight)
    //console.log('keyboard coordinates: ', keyboardd.coordinates)

    

    useEffect(() => {
      console.log('USEEFFECT HOME')
      if(!keyboardd.keyboardShown) {
        console.log('O QUE ESTA NO VALUE: ', valueText)
        if(valueText) {
          console.log('CHAMA FUNCAO PESQUISAR PRODUTO')
          PesquisaProduto()
          setValueText('');
        }
      }
    });

    const PesquisaProduto  = async () => {
     // await Storage.deletarKM('valueKM')

      setLoading(true)
      if (!supermecadoId) {
        console.log('VAI PARA PESQUISAR PRODUTO');
        console.log('VALUETEXT NÂO ESTA VAZIO IR PARA PESQUISA: ', valueText);
        // https://github.com/expo/expo/issues/5504
      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
      console.log('locationlocation: ', location)
      //setLocation(location);
      //console.log('Latitude: ',location.coords.latitude)
      //console.log('Longitude: ',location.coords.longitude)      const json = await JSON.stringify({ answer: 42 })
      //await Storage.deletarKM('valueKM')  
      const maxDistance = await Storage.buscarKM('valueKM')
        console.log('valueKm -->', maxDistance)


      let date;
      if (location) {
        const response = await servicesLocationSup.post('/', { coordinates: [location.coords.latitude, location.coords.longitude], maxDistance: maxDistance});
        date = response.data;
      }
      console.log('date::::::::::::::::::::::::::1 ',date.length)  
      console.log('date::::::::::::::::::::::::::2 ',Object.keys(date).length)
      if (date.length === 0) {
        setLoading(false)
        return Alert.alert(
          //title
          'Atenção',
          //body
          `Não foi possível encontrar supermecados próximos, você precisa alterar o raio de distância.`,
          [
            {
              text: 'Ok', onPress: (() => modalKm())
            },
          ],
      )
        
        //console.log('date:::::::::::::::::::::::::: DATE VAZIO ',)
      }
      //console.log(response.data[0]._id)
      //setSupermecadoId(response.data)
      let arraySupermecado = [];
      let arraySupermecadoDiscancia = [];
      date.map(async function(item) {
        //console.log(item._id)
       //console.log('... ----------------------->',item.location_distance)
       
       await arraySupermecado.push(item._id)
       await arraySupermecadoDiscancia.push(item)
       //await arraySupermecadoDiscancia.push({id: item._id, distancia: item.location_distance})
       
      })
      await setSupermecadoId(arraySupermecado)
      await setSupermecadoDistancia(arraySupermecadoDiscancia)
      //console.log('AQUI ---------------------------> ', arraySupermecadoDiscancia.id)
      setLoading(false)
      console.log('IFFF ----------------------------------------------------')
     
      navigation.navigate('Pesquisa', 
      {namePesquisa: valueText, 
      arraySupermecado,
      arraySupermecadoDiscancia
      });
      // filtro: '5KG',
    } else {
      //console.log('JA EXISTE ID DO SUPERMECADO: ', supermecadoId)
      if (supermecadoId.length === 0) {
        setLoading(false)
        return Alert.alert(
          //title
          'Atenção',
          //body
          `Não foi possível encontrar supermecados próximos, você precisa alterar o raio de distância.`,
          [
            {
              text: 'Ok', onPress: (() => modalKm())
            },
          ],
        )
        
        //console.log('date:::::::::::::::::::::::::: DATE VAZIO ',)
      }
      console.log('ELSE ----------------------------------------------------', supermecadoId.length)
      console.log('JA EXISTE ID DO SUPERMECADO: ')
      navigation.navigate('Pesquisa', 
      {namePesquisa: valueText, 
      supermecadoId,
      supermecadoDistancia
      });
      setLoading(false)
      //filtro: '5KG',

    }  

      
    }


   async function modalKm() {
      // valueKM, setValueKM
      if (modalVisibleKM === false) {
        setModalVisibleKM(true)
        const maxDistance = await Storage.buscarKM('valueKM')
        console.log('modalKm valueKm ---> ', maxDistance)
        if (maxDistance === null) {
          await Storage.armazenarKM('valueKM', '7')
          await setValueKM('7')
          console.log('CAIU IF 1')
          setLoading(false)
        } else {
          //await Storage.armazenarKM('valueKM', '8000')
          const valuesKm = await Storage.buscarKM('valueKM')

          setValueKM(valuesKm)
          console.log('CAIU IF 2 ', valuesKm)
          setLoading(false)
        }
      }
    }

    function cancelarKM() {
      console.log('CANCELAR KM')
      setModalVisibleKM(false)
    }

   async function alterarKM() {
      console.log('ALTERAR KM')
      console.log('TIPO ', valueKM.length)

      if (valueKM <= 50 && valueKM > 0 && valueKM.length <= 2 ) {
        console.log('MENOR QUE 50 ', valueKM)
        await Storage.deletarKM('valueKM')
        await Storage.armazenarKM('valueKM', valueKM)
        //const valuesKm = await Storage.buscarKM('valueKM')
        //console.log('VALUE KM ::: 3 ', valuesKm)
      const maxDistance = valueKM;
      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
        let date;
        if (location) {
          const response = await servicesLocationSup.post('/', { coordinates: [location.coords.latitude, location.coords.longitude], maxDistance: maxDistance});
          date = response.data;
        } 

        let arraySupermecado = [];
      let arraySupermecadoDiscancia = [];
      date.map(async function(item) {
        //console.log(item._id)
       //console.log('... ----------------------->',item.location_distance)
       
       await arraySupermecado.push(item._id)
       await arraySupermecadoDiscancia.push(item)
       //await arraySupermecadoDiscancia.push({id: item._id, distancia: item.location_distance})
       
      })
      await setSupermecadoId(arraySupermecado)
      await setSupermecadoDistancia(arraySupermecadoDiscancia)
        
        //setLoading(false)
        return setModalVisibleKM(false)

      } else  if (valueKM > 50) {
        return Alert.alert(
          'Error',
          `Não é permitido alterar distância maior que 50 KM`,
          [ { text: 'Ok'  },  ], )
      } else  if (valueKM <= 50 && valueKM.length > 2) {
        return Alert.alert(
          'Error',
          `Vefifica se você não inseriu espaço em branco ou outro valor diferente de número.`,
          [ { text: 'Ok'  },  ], )
      } else if (valueKM < 1) {
      return Alert.alert(
        'Error',
        `Valor negativo ou 0 não é permitido`,
        [ { text: 'Ok'  },  ], )
      }  else {
        return Alert.alert(
          'Error',
          `Não foi possível alterar a quantidade de KM`,
          [ { text: 'Ok'  },  ], )
      }
      //console.log('::: ', typeof(valueKM))
     /* if(typeof(valueKM) === 'number') {
        console.log('TIPO ', valueKM.typeof())
      }  */
      
      setModalVisibleKM(true)
    }

    
    
    if (loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ fontSize: 17, fontStyle: 'italic' }}>
            carregando dados...
            </Text>
        </View>
      )
    }

    if(modalVisibleKM) {
      return <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleKM}
        onRequestClose={() => {
          //Alert.alert("AA Modal has been closed.");
          setModalVisibleKM(!modalVisibleKM);
        }}
      >
        <View style={stylesCreate.centeredView}>
          <View style={stylesCreate.modalView}>
            <Text style={stylesCreate.modalText}>Informe KM entre 1 e 50</Text>
    
            <TextInput
                style={{width: 60 ,height: 60, margin: 10, padding: 10, 
                  backgroundColor: '#9C93FC', borderRadius: 20, fontSize: 20}}
                  placeholder="KM"
                  keyboardType = 'numeric'
                  autoCapitalize = 'words'
                  multiline={false}
                  value={valueKM}
                  onChangeText={valueKM => setValueKM(valueKM)}
                  
              /> 
            
            <View style={{width: '80%' ,flexDirection: 'row', justifyContent: 'space-around'}}>
            <Pressable
                style={[stylesCreate.button, stylesCreate.buttonClose]}
                onPress={() => cancelarKM()}
              >
                <Text style={stylesCreate.textStyle}>Cancelar</Text>
              </Pressable>
    
              <Pressable
                style={[stylesCreate.button, stylesCreate.buttonClose]}
                onPress={() => alterarKM()}
              >
                <Text style={stylesCreate.textStyle}>Alterar KM</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    }

    return (
      
      <View style={styles.container}>

          <View style={{width: '100%', height: '10%'}}>
            {/* AQUI VEM ANUNCIO FUTURAMENTE    */}
            
          </View>
          
          <View style={{ width: '84%', alignContent: 'center', marginLeft: '7%', marginRight: '7%'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <ConfigButton/>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <MapLocalizacao/>
            </View>
            </View>
          </View>

          {/* TEXTO MENOR PRECO  */}
          <View style={{marginTop: '20%'}}>
              <Text style={{paddingLeft: '10%', color: '#8B80FC', fontSize: 15}}>Compre com preço Baixo</Text>

          </View>

          {/* INPUT TEXT COM FILTRO  */}
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: '2%' ,}}>
          
          <TextInput
                style={{width: '75%' ,height: 60,  padding: 10, 
                  backgroundColor: '#D9D7DB', 
                  borderBottomLeftRadius: 20 
                  ,borderTopLeftRadius: 20, borderBottomRightRadius: 20, borderTopRightRadius: 20}}
                  placeholder="Pesquisar Produto"
                  multiline={false}
                  value={valueText}
                  onChangeText={valueText => setValueText(valueText)}
                  onSubmitEditing={Keyboard.dismiss}
                  
              />

              <TouchableOpacity style={{marginLeft: '3%',height: 60,justifyContent: 'center',
              borderBottomRightRadius: 20, borderTopRightRadius: 20, }} onPress={() => modalKm()}>
                  <MaterialCommunityIcons name="filter-outline" size={24} color="black" />
                  <Text style={{marginLeft: 5,fontSize: 10}}>KM</Text>
              </TouchableOpacity>
            
            {false && 
              <TouchableOpacity style={{width: '10%',height: 60,justifyContent: 'center', backgroundColor: '#D9D7DB',
              borderBottomRightRadius: 20, borderTopRightRadius: 20, }}>
                  <MaterialCommunityIcons name="filter-outline" size={24} color="black" />
              </TouchableOpacity>

            }
            
           

          </View>
              {/* CODIGO DE BARRAS  */}
          <TouchableOpacity style={{marginTop: '1%' , flexDirection: "row", justifyContent: "center", marginBottom: '15%' }} onPress={()=> navigation.navigate('Scanner')}>

                <View style={{marginRight: '5%'}}>
                  <Text style={{fontSize: 18, color: '#AEAEAE'}}>Código de barras</Text></View>
                
                <View style={{alignSelf:"center"}}><Image source={require('../../assets/qrcode/qr-code.png')}/></View>
                
          </TouchableOpacity>
          
            <TouchableOpacity style={{display: 'flex', alignSelf: 'center', width: '85%', height: '13%', marginBottom: '2%'}}
            onPress={()=> {navigation.navigate('MercadoPesquisa')}}>
            <ImageBackground source={require('../../assets/mercado/mercado.png')} style={styles.image}>
              <Text style={styles.text}>Mercado</Text>
            </ImageBackground>
          </TouchableOpacity>
          
          

          <TouchableOpacity style={{display: 'flex', alignSelf: 'center', width: '85%', height: '13%', marginBottom: '2%'}}
          onPress={() => {navigation.navigate('Combustivel')}}>
            <ImageBackground source={require('../../assets/combustivel/combustivel.png')} style={styles.image}>
              <Text style={styles.text}>Combustível</Text>
            </ImageBackground>
          </TouchableOpacity>
        
      </View>
    )
  }


  
const stylesCreate = StyleSheet.create({
      centeredView: {
        
        justifyContent: "center",
        alignItems: "center",
        //marginTop: 22,
        height: '100%',
        backgroundColor: '#040E2C'
      },
      centeredView2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 0,
        height: 20,
        flex: 1, height: '100%',
        backgroundColor: 'red'
        
      },
      modalView: {
        margin: 0,
        backgroundColor: "#8B80FC",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalView2: {
        margin: 20,
        //backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
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
      
      buttonClose: {
        backgroundColor: "#FFFFFF",
      },
      textStyle: {
        color: "#8B80FC",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 18,
        //textAlign: '',
        fontSize: 21,
        color: '#FFFFFF',
        fontWeight: '700'
      },
    
});




/*
<TouchableOpacity>
        <View style={{display: 'flex', alignSelf: 'center', width: '88%', height: '13%'}}> 
          <ImageBackground source={require('../../assets/combustivel/combustivel.png')} style={styles.image}>
          <Text style={styles.text}>Combustível</Text>
            </ImageBackground>
          </View>
      </TouchableOpacity>
   


          <Image source={require('../../assets/combustivel/combustivel.png')} style={styles.backgroundImage}>
          <Text style={styles.titulo}>Título</Text>
            </Image>

     <Text style={styles.titulo}>Título</Text>
                <Image style={styles.fotoDePerfil}
                    source={require('../../assets/mercado/mercado.png')} > </Image>


  NAVIGATION PAGINAS

<Button
        title="Ir para COMBUSTIVEL"
        onPress={() => {
          navigation.navigate('Combustivel')
        }}/>
        <Text></Text>
        <Button
        title="Ir para Minha Lista"
        onPress={() => {
          navigation.navigate('MinhasLista')
        }}/>












        <View style={{marginBottom: '5%'}}>
          <Image source={require('../../assets/mercado/mercado.png')}>
          </Image>

          <Image source={require('../../assets/combustivel/combustivel.png')} > 
          </Image>
          
          </View>

         
          <View style={{display: 'flex', alignSelf: 'center', width: '88%', height: '13%'}}> 
          <ImageBackground source={require('../../assets/combustivel/combustivel.png')} style={styles.image}>
          <Text style={styles.text}>Combustível</Text>
            </ImageBackground>
          </View>

          <Text>Tela Home INICIO</Text>
        <Button
        title="Ir para COMBUSTIVEL"
        onPress={() => {
          navigation.navigate('Combustivel')
        }}/>
        <Text></Text>
        <Button
        title="Ir para Minha Lista"
        onPress={() => {
          navigation.navigate('MinhasLista')
        }}/>




        useEffect(() => {
      
      const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardStatus("Keyboard Shown");
        console.log('show')
      });
      const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
        console.log(valueText)
        setKeyboardStatus('fechado');
        //console.log('AQUIIIIIIIIII: ', valueText2)
        
        
        if (valueText) {
          console.log('TEXTO: ', valueText)
          navigation.navigate('Pesquisa')
        } else {
          console.log('valueText VAZIO: ', valueText)
        }
        
        //setValueText('')
        //setValueText('')
      });
  
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      }; 
    }, []);  
  */

