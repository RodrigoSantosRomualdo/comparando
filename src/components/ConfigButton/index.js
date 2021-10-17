import React, {useState, useEffect} from 'react';
import { Modal, TextInput, Pressable, Button,  Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Updates } from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SvgUri } from 'react-native-svg';
import Storage from '../../services/Storage'
import {Restart} from 'fiction-expo-restart';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function ConfigButton() {

  const [modalVisibleMenu, setModalVisibleMenu] = useState(false);
  const [valueTextSemLista, setValueTextSemLista] = useState('')
  const [existeUser, setExisteUser] = useState()

  useEffect(() => {
    (async () => {
      console.log('CARREGOU AQUI')
    })
  }, [])

  async function mostraMenu() {
    console.log('CLICOU NO MENU')
    const useExiste = await Storage.buscarUserLogin('value')
    console.log('useExiste', useExiste)
    setExisteUser(useExiste)
    //console.log(existeUser)
    setModalVisibleMenu(true)

    //Storage.deletarListaPadrao('lista')
    //Storage.removeUserLogin('value')

    //Restart();
    //await Updates.reloadAsync()
  }

  function sairConta() {
    Storage.deletarListaPadrao('lista')
    Storage.removeUserLogin('value')

    Restart();
  }

  /*const deleteUserLogin = async (chave) => {
    await AsyncStorageUsuario.removeItem(chave)
    console.log('DELETE STORAGE MENU: ')
  } */

  if(modalVisibleMenu) {
    return <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisibleMenu}
      onRequestClose={() => {
        //Alert.alert("AA Modal has been closed.");
        setModalVisibleMenu(!modalVisibleMenu);
      }}
    >
      <View style={stylesCreate.centeredView}>
        <View style={stylesCreate.modalView}>
          
          <View style={{width: '100%', height: '95%'}}>

          <View style={{marginTop: '5%'}}>
              <TouchableOpacity style={{width: '100%', marginLeft: '8%', flexDirection: 'row', justifyContent: 'flex-start' }} 
              onPress={() => setModalVisibleMenu(false)}>
                <Ionicons name="chevron-back-outline" size={24} color="black" />
                <Text style={{color: '#040E2C',fontWeight: 'bold', fontSize: 20, width: '60%' }}>Voltar</Text>
              </TouchableOpacity>
                
        </View>




          </View>
          
          



          <View style={{width: '100%', height: '5%'}}>
          {existeUser &&
            <Pressable
            style={[stylesCreate.button, stylesCreate.buttonClose]}
            onPress={() => sairConta()} >
            <Text style={stylesCreate.textStyle}>SAIR DA CONTA</Text>
          </Pressable>

          }
          
          </View>



          {/*             
          <Text style={stylesCreate.modalText}>Criar nova lista</Text>
  
          <TextInput
              style={{width: 200 ,height: 60, margin: 10, padding: 10, 
                backgroundColor: '#9C93FC', borderRadius: 20, fontSize: 20}}
                placeholder="Criar Lista"
                autoCapitalize = 'none'
                multiline={false}
                value={valueTextSemLista}
                onChangeText={valueTextSemLista => setValueTextSemLista(valueTextSemLista)}
                
            />
          
          <View style={{width: '80%' ,flexDirection: 'row', justifyContent: 'space-around'}}>
          <Pressable
              style={[stylesCreate.button, stylesCreate.buttonClose]}
              onPress={() => cancelarLista()}
            >
              <Text style={stylesCreate.textStyle}>Cancelar</Text>
            </Pressable>
  
            <Pressable
              style={[stylesCreate.button, stylesCreate.buttonClose]}
              onPress={() => criarLista()}
            >
              <Text style={stylesCreate.textStyle}>Criar Lista</Text>
            </Pressable>
          </View>
                */} 
        </View>
      </View>
    </Modal>
  }


    return (
        <TouchableOpacity onPress={() => mostraMenu()}>
          <MaterialCommunityIcons style={{marginLeft: '15%'}} name="microsoft-xbox-controller-menu" size={30} color="#8B80FC" />
            
        </TouchableOpacity>

      
    )

    
  }


  const stylesCreate = StyleSheet.create({
    centeredView: {
      width: '100%',
      height: '100%'
      //justifyContent: 'flex-end',
      //alignItems: 'flex-end',
      //marginTop: 22,
      //height: '80%',
      //marginTop: '20%',
      //backgroundColor: '#040E2C' 
    },
    centeredView2: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 0,
      height: 30,
      flex: 1, height: '100%',
      backgroundColor: 'red'
      
    },
    modalView: {
      margin: 0,
      backgroundColor: "#8B80FC",
      height: '100%',
      //borderRadius: 20,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
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
      backgroundColor: "red",
    },
    textStyle: {
      color: "#FFF",
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
