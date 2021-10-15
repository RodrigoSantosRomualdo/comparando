import React, { useState, useEffect } from 'react';
import { Button, Image, Text, View, ImageBackground, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback  } from 'react-native';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useKeyboard } from '@react-native-community/hooks'
import styles from './styles';
import * as Location from 'expo-location';
import servicesLocationSup from  '../../services/servicesLocationSup'

import MapLocalizacao from '../../components/MapLocalizacao';
import ConfigButton from '../../components/ConfigButton';

export default function Home({navigation}) {
    const [valueText, setValueText] = useState();
    const [location, setLocation] = useState(null);
    const [supermecadoId, setSupermecadoId] = useState()
    const [supermecadoDistancia, setSupermecadoDistancia] = useState()
    const [distancia, setDistancia] = useState(10000)
    const [desativaEnquantoDecide, setDesativaEnquantoDecide] = useState(false)
  
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
      if (!supermecadoId) {
        console.log('VAI PARA PESQUISAR PRODUTO');
        console.log('VALUETEXT NÂO ESTA VAZIO IR PARA PESQUISA: ', valueText);
        // https://github.com/expo/expo/issues/5504
      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
      //setLocation(location);
      //console.log('Latitude: ',location.coords.latitude)
      //console.log('Longitude: ',location.coords.longitude)      const json = await JSON.stringify({ answer: 42 })
      let date;
      if (location) {
        const response = await servicesLocationSup.post('/', { coordinates: [location.coords.latitude, location.coords.longitude]});
        date = response.data;
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

      navigation.navigate('Pesquisa', 
      {namePesquisa: valueText, 
      arraySupermecado,
      arraySupermecadoDiscancia
      });
      // filtro: '5KG',
    } else {
      //console.log('JA EXISTE ID DO SUPERMECADO: ', supermecadoId)
      console.log('JA EXISTE ID DO SUPERMECADO: ')
      navigation.navigate('Pesquisa', 
      {namePesquisa: valueText, 
      supermecadoId,
      supermecadoDistancia
      });
      //filtro: '5KG',

    }  

      
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
                style={{width: '80%' ,height: 60,  padding: 10, 
                  backgroundColor: '#D9D7DB', 
                  borderBottomLeftRadius: 20 
                  ,borderTopLeftRadius: 20, borderBottomRightRadius: 20, borderTopRightRadius: 20}}
                  placeholder="Pesquisar Produto"
                  multiline={false}
                  value={valueText}
                  onChangeText={valueText => setValueText(valueText)}
                  onSubmitEditing={Keyboard.dismiss}
                  
              />
            
            {false && 
              <TouchableOpacity style={{width: '10%',height: 60,justifyContent: 'center', backgroundColor: '#D9D7DB',
              borderBottomRightRadius: 20, borderTopRightRadius: 20, }}>
                  <MaterialCommunityIcons name="filter-outline" size={24} color="black" />
              </TouchableOpacity>

            }
            
           

          </View>
              {/* CODIGO DE BARRAS  */}
          <TouchableOpacity style={{marginTop: '5%' , flexDirection: "row", justifyContent: "center", marginBottom: '15%' }} onPress={()=> navigation.navigate('Scanner')}>

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