import React, {useState, useEffect} from 'react';
import { Button, Image, FlatList, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import servicoCombustivel from  '../../services/servicoCombustivel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Storage from '../../services/Storage';

import styles from './styles'

export default function CombustivelPreco(props) {  

 // console.log('propsss: ', props)

  //console.log('props PC: ', props.route.params.combustivelId)

  const [optionsListCombustivel, setOptionsListCombustivel] = useState([{id: 1, texto: 'Gasolina'},{id: 2, texto: 'Gasolina Aditivada'},{id: 3, texto: 'Etanol'},{id: 4, texto: 'Diesel'},{id: 5, texto: 'GNV'}])
  const [location, setLocation] = useState(null);
  const [combustivelId, setCombustivelId] = useState();
  const [postosCombustivelDistancia, setPostosCombustivelDistancia] = useState();
  const [precoCombustivel, setPrecoCombustivel] = useState();
  const [loading, setLoading] = useState(true);
  const [datePosto, setDatePosto] = useState();
  const navigation = useNavigation();

   useEffect(() => {
    (async () => {
      const categoria = await props.route.params?.item.texto;

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
      //console.log('location::::::: ', location)
      await setLocation(location);

      const maxDistance = await Storage.buscarKM('valueKM')
      const responseServicoCombustivel = await servicoCombustivel.post('/location', { coordinates: [location.coords.latitude, location.coords.longitude], maxDistance: maxDistance});
      let date = responseServicoCombustivel.data;

      let arrayPostosCombustivel = [];
      let arrayPostosCombustivelDiscancia = [];
      date.map(async function(item) {
       await arrayPostosCombustivel.push(item._id)
       await arrayPostosCombustivelDiscancia.push(item)
      })
    /*  await setCombustivelId(arrayPostosCombustivel)
      await setPostosCombustivelDistancia(arrayPostosCombustivelDiscancia)  */


      if (arrayPostosCombustivel.length === 0) {
        console.log('ENTROU POSTO DE GASOLINA: ', arrayPostosCombustivel.length)
        setLoading(false)
      } else {
        const response = await servicoCombustivel.post('/busca-ordenado', { _id: arrayPostosCombustivel , categoria: categoria});
        console.log('response: ', )
        await setDatePosto(response.data)
        setPrecoCombustivel(response.data)
        //console.log('datePosto: ', datePosto)
        setLoading(false)

      }

    })();

  },[props.route.params])

 async function listaCombustivel(item) {
   /*
   console.log('ITEM: ', item )

   let location = await Location.getCurrentPositionAsync({});
    const response = await servicoCombustivel.post('/location', { coordinates: [location.coords.latitude, location.coords.longitude]});
    let date = response.data;

      let arrayPostosCombustivel = [];
      let arrayPostosCombustivelDiscancia = [];
      date.map(async function(item) {
       await arrayPostosCombustivel.push(item._id)
       await arrayPostosCombustivelDiscancia.push(item)
      })
      await setCombustivelId(arrayPostosCombustivel)
      await setPostosCombustivelDistancia(arrayPostosCombustivelDiscancia)

      console.log('ITEM CHEGOU AO FIM: ')
      console.log('combustivelId::: ', combustivelId)

      console.log('postosCombustivelDistancia::: ', postosCombustivelDistancia[0].location_distance.toFixed(0))  
      let distancia = postosCombustivelDistancia[0].location_distance.toFixed(0)
      console.log('distancia::: ', distancia.length)
      //if (distancia.length === 4) {}
        console.log('distancia --- ', distancia)
        let result =  distancia / 1000
        console.log('KM ', result.toFixed(2)) */
      
 }
  
 if (loading) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ fontSize: 17, fontStyle: 'italic' }}>
        Carregando Preços...
        </Text>
    </View>
  )
}
  
  return (
      <View style={styles.container}>

        <View style={{marginTop: '5%', marginLeft: '8%'}}>
          <Text style={{color: '#040E2C',fontWeight: 'bold', fontSize: 20, width: '90%' }}>Preço {props.route.params.item.texto}</Text>
        </View>

        <View>
          <FlatList
                data={precoCombustivel}
                keyExtractor={(item) => item._id.toString()}
                style={{width: '95%', height: '80%', borderTopColor: '#EBE8EA', borderTopWidth: 2, marginTop: '7%', }}
                showsVerticalScrollIndicator ={false}
                renderItem={({ item }) => (
                  <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                      <TouchableOpacity style={{width: '90%', backgroundColor: '#8B80FC', borderRadius: 39, 
                  flexDirection: 'row', marginTop: '3%'}} onPress={() => {navigation.navigate('MapCombustivel', {datePosto})
                  }} >
                      <Image source={require('../../assets/qrcode/qr-code.png')} 
                  style={{width:68, height:70, borderRadius: 19, marginLeft: 15, marginBottom: 15, marginTop: 15, marginRight: 15}}/>

                  <View style={{marginTop: 13}}>
                      <Text style={{color: '#FFF', fontSize: 12, fontWeight: 'bold', width: '90%' }}>{item.descricao}</Text>
                      <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop: '1%'}}>
                        <Icon name="map-marker-multiple-outline" color={'#FFF'} size={15} />
                        <Text style={{color: '#FFFFFF', fontStyle: 'italic', fontSize: 12, fontWeight: 'bold', width: '70%' }}>{item.posto_combustivel.endereco}</Text>
                      </View>
                      
                      <Text style={{marginTop: '1%',color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>R$ {item.preco_venda.toFixed(2)} </Text>
                  </View>

                      </TouchableOpacity>

              </View>
          
              )}
          />
        

        </View>
        
      </View>
    )
  }


    /*


<FlatList
                data={precoCombustivel}
                keyExtractor={(item) => item._id.toString()}
                style={{width: '95%', height: '80%', borderTopColor: '#EBE8EA', borderTopWidth: 2, marginTop: '7%', }}
                showsVerticalScrollIndicator ={false}
                renderItem={({ item }) => (
                  <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '2%'}} >
                  <TouchableOpacity style={{width: '90%', height: 70, backgroundColor: '#8B80FC', borderRadius: 39, marginLeft: '5%',
                      flexDirection: 'row', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => listaCombustivel(item) }>
                  <View style={{padding: 5}}>
                    <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold', marginLeft: 30 }}>{item.preco_venda}</Text>
                  </View>
                  
                  <TouchableOpacity style={{justifyContent: 'center', width: '20%', marginLeft: '5%' }}>
                      <MaterialCommunityIcons name="chevron-right" size={25} color="#FFF" />
                  </TouchableOpacity>
                    </TouchableOpacity>
              </View>
            
                )}
            />












  <Button
        title="Ir para Home"
        onPress={() => {
          navigation.navigate('Home')
        }}/>
        <Text></Text>
        <Button
        title="Ir para Minha Lista"
        onPress={() => {
          navigation.navigate('MinhasLista')
        }}/>





  NAVIGATION PAGINAS

<Button
        title="Ir para Home"
        onPress={() => {
          navigation.navigate('Home')
        }}/>
        <Text></Text>
        <Button
        title="Ir para Minha Lista"
        onPress={() => {
          navigation.navigate('MinhasLista')
        }}/>

  */