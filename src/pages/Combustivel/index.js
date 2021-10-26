import React, {useState, useEffect} from 'react';
import { Button, FlatList,Modal, Pressable , TextInput, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import servicoCombustivel from  '../../services/servicoCombustivel';
import servicesLocationSup from  '../../services/servicesLocationSup'
import Storage from '../../services/Storage';

import styles from './styles'

export default function Combustivel({navigation}) {

  const [optionsListCombustivel, setOptionsListCombustivel] = useState([{id: 1, texto: 'Gasolina'},{id: 2, texto: 'Gasolina Aditivada'},{id: 3, texto: 'Etanol'},{id: 4, texto: 'Diesel'},{id: 5, texto: 'GNV'}])
  const [location, setLocation] = useState(null);
  const [combustivelId, setCombustivelId] = useState();
  const [postosCombustivelDistancia, setPostosCombustivelDistancia] = useState();
  const [modalVisibleKM, setModalVisibleKM] = useState(false);
  const [valueKM, setValueKM] = useState()
  const [loading, setLoading] = useState(false);
  const [supermecadoId, setSupermecadoId] = useState()
  const [supermecadoDistancia, setSupermecadoDistancia] = useState()
  

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
      console.log('-------------------___>>>>>>>>>>>>>>>..')
        navigation.navigate('CombustivelPreco' , {item })
      
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
    
    // console.log('COMBUSTIVEL ------------> ', date)

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

        <View style={{marginTop: '5%', marginLeft: '8%', flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{color: '#040E2C',fontWeight: 'bold', fontSize: 20, width: '60%' }}>Combustível</Text>
          <TouchableOpacity style={{}} onPress={() => modalKm()}>
                  <MaterialCommunityIcons name="filter-outline" size={24} color="black" />
                  <Text style={{marginLeft: 5,fontSize: 10}}>KM</Text>
          </TouchableOpacity>

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