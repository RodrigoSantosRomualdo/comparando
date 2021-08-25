import React, { useState, useEffect } from 'react';
import { Button, Image, Text, View, ImageBackground, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback  } from 'react-native';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useKeyboard } from '@react-native-community/hooks'
import styles from './styles';

import MapLocalizacao from '../../components/MapLocalizacao';
import ConfigButton from '../../components/ConfigButton';

export default function Home({navigation}) {
    const [valueText, setValueText] = useState();

    const keyboardd = useKeyboard()
    console.log('keyboard isKeyboardShow: ', keyboardd.keyboardShown)
    console.log('keyboard keyboardHeight: ', keyboardd.keyboardHeight)
    console.log('keyboard coordinates: ', keyboardd.coordinates)

    useEffect(() => {
      console.log('USEEFFECT')
      if(!keyboardd.keyboardShown) {
        console.log('O QUE ESTA NO VALUE: ', valueText)
        if(valueText) {
          console.log('VALUETEXT NÂO ESTA VAZIO IR PARA PESQUISA: ', valueText)
          navigation.navigate('Pesquisa', {namePesquisa: valueText, filtro: '5KG'})
          setValueText('');
        }
      }
    });

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
          <View style={{paddingLeft: '5%', paddingRight: '5%'}}>
          
          <TextInput
                style={{height: 60, margin: 12, padding: 10, 
                  backgroundColor: '#D9D7DB', borderRadius: 20}}
                  placeholder="Pesquisar Produto"
                  multiline={false}
                  value={valueText}
                  onChangeText={valueText => setValueText(valueText)}
                  onSubmitEditing={Keyboard.dismiss}
              />

          </View>
              {/* CODIGO DE BARRAS  */}
          <TouchableOpacity style={{flexDirection: "row", justifyContent: "center", marginBottom: '15%' }}>

                <View style={{marginRight: '5%'}}>
                  <Text style={{fontSize: 15, color: '#AEAEAE'}}>Código de barras</Text></View>
                
                <View style={{alignSelf:"center"}}><Image source={require('../../assets/qrcode/qr-code.png')}/></View>
                
          </TouchableOpacity>
          
          
          <TouchableOpacity style={{display: 'flex', alignSelf: 'center', width: '85%', height: '13%', marginBottom: '2%'}}>
            <ImageBackground source={require('../../assets/mercado/mercado.png')} style={styles.image}>
              <Text style={styles.text}>Mercado</Text>
            </ImageBackground>
          </TouchableOpacity>


          <TouchableOpacity style={{display: 'flex', alignSelf: 'center', width: '85%', height: '13%', marginBottom: '2%'}}>
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