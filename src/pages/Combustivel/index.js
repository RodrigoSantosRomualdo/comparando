import React, {useState, useEffect} from 'react';
import { Button, FlatList, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import servicoCombustivel from  '../../services/servicoCombustivel';

import styles from './styles'

export default function Combustivel({navigation}) {

  const [optionsListCombustivel, setOptionsListCombustivel] = useState([{id: 1, texto: 'Gasolina'},{id: 2, texto: 'Gasolina Aditivada'},{id: 3, texto: 'Etanol'},{id: 4, texto: 'Diesel'},{id: 5, texto: 'GNV'}])
  const [location, setLocation] = useState(null);
  const [combustivelId, setCombustivelId] = useState();
  const [postosCombustivelDistancia, setPostosCombustivelDistancia] = useState();

  /* useEffect(() => {
    (async () => {
      console.log('USEEFFECT COMBUSTIVEL')
     
    let location = await Location.getCurrentPositionAsync({});
    const response = await servicesLocationSup.post('/', { coordinates: [location.coords.latitude, location.coords.longitude]});
      let date = response.data;

      let arrayPostosCombustivel = [];
      let arrayPostosCombustivelDiscancia = [];
      date.map(async function(item) {
       await arrayPostosCombustivel.push(item._id)
       await arrayPostosCombustivelDiscancia.push(item)
      })
      await setCombustivelId(arrayPostosCombustivel)
      await setPostosCombustivelDistancia(arrayPostosCombustivelDiscancia) 

    })();
  });*/
/*
  useEffect(() => {
    (async () => {
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


    })();
  }); */


 async function listaCombustivel(item) {
   console.log('ITEM: ', item )

   /*
   let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location?.getCurrentPositionAsync({});
      setLocation(location);
   
    

      console.log('ITEM CHEGOU AO FIM: ')
      console.log('combustivelId::: ', combustivelId)
 */
     // console.log('postosCombustivelDistancia::: ', postosCombustivelDistancia[0].location_distance.toFixed(0))  
     // let distancia = postosCombustivelDistancia[0].location_distance.toFixed(0)
     // console.log('distancia::: ', distancia.length)
      //if (distancia.length === 4) {}
      //  console.log('distancia --- ', distancia)
      //  let result =  distancia / 1000
      //  console.log('KM ', result.toFixed(2)) 
        navigation.navigate('CombustivelPreco' , {item })
      
 }
  
  
  return (
      <View style={styles.container}>

        <View style={{marginTop: '5%', marginLeft: '8%'}}>
          <Text style={{color: '#040E2C',fontWeight: 'bold', fontSize: 20, width: '60%' }}>Combustível</Text>
        </View>

        <View>
        <FlatList
                data={optionsListCombustivel}
                keyExtractor={(item) => item.id.toString()}
                style={{width: '95%', height: '80%', borderTopColor: '#EBE8EA', borderTopWidth: 2, marginTop: '7%', }}
                showsVerticalScrollIndicator ={false}
                renderItem={({ item }) => (
                  <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '2%'}} >
                  <TouchableOpacity style={{width: '90%', height: 70, backgroundColor: '#8B80FC', borderRadius: 39, marginLeft: '5%',
                      flexDirection: 'row', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => listaCombustivel(item) }>
                  <View style={{padding: 5}}>
                    <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold', marginLeft: 30 }}>{item.texto}</Text>
                  </View>
                  
                  <TouchableOpacity style={{justifyContent: 'center', width: '20%', marginLeft: '5%' }}>
                      <MaterialCommunityIcons name="chevron-right" size={25} color="#FFF" />
                  </TouchableOpacity>
                    </TouchableOpacity>
              </View>
            
                )}
            />

        </View>
        
      </View>
    )
  }


    /*


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