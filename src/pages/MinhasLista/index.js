import React, {useEffect, useState} from 'react';
import { Button, StyleSheet, Text, View , Modal, TextInput, Pressable , TouchableOpacity, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ServiceListaUser from '../../services/listaUser'
import serviceUser from '../../services/serviceUser'
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles'

export default function MinhasLista({navigation}) {

  
  //const navigation = useNavigation();
  const [lista, setLista] = useState(null)
  const [modalVisibleSemLista, setModalVisibleSemLista] = useState(false);
  const [valueTextSemLista, setValueTextSemLista] = useState()
  const [userId, setUserId] = useState(null)
  // Trazer pelo navigation quando o usuário logar
  const [dataServiceprod, setDataServiceprod ] = useState()

  const armazenarUserLogin = (chave, valor) => {
    AsyncStorage.setItem(chave, valor)
  }

  const BuscarUserLogin = (chave, valor) => {
    AsyncStorage.setItem(chave, valor)
  }
  

  const buscarUserLogin = async (chave) => {
    const valor = await AsyncStorage.getItem(chave)
    setUserId(valor)
    console.log('DENTRO DO STORAGE: ', valor)
  }

  const deleteUserLogin = async (chave) => {
    await AsyncStorage.removeItem(chave)
    //setUserId(valor)
    console.log('DELETE STORAGE: ')
  }

  


  //armazenarUserLogin('verificador', 'rsr@gmail.com')
  //buscarUserLogin('verificador')
  //deleteUserLogin('verificador')
  // rsr@gmail.com


  async function loadLista() {
    await buscarUserLogin('verificador')
    console.log('EXECUTOU A PESQUISA DA LISTA')
    const responseLista = await ServiceListaUser.post('/findlistaall', {
      "id_user": userId
    })
  
    //console.log('PRODUTOS: ',responseLista.data )
    return await setLista(responseLista.data)
  }

useEffect(() => {
  console.log('EXECUTOU O USEEFFECT')
  
  loadLista()

}, []);

async function addLista() {
  //armazenarUserLogin('verificador', 'MEU-EMAIL-LOGIN@GMAIL.COM')
  //deleteUserLogin('verificador')
  await buscarUserLogin('verificador')
  console.log('userId: ', userId)
  if (userId !== null) {
    setModalVisibleSemLista(true)
  } else {
    navigation.navigate('LogarCriarConta', {
      userId: userId,
    }); 
  }
  
}

async function cancelarLista() {
  setModalVisibleSemLista(false)
  setValueTextSemLista('')
}

async function findProdutoList(nameList) {
  console.log('nameList: ', nameList)
  console.log('userId: ', userId)

  navigation.navigate('MinhaListaProduto', 
      {nameList: nameList, 
      userId: userId,
      }); 

  //onPress={() => navigation.navigate('Home')
}

async function criarLista() {
  if (valueTextSemLista === '') {
    console.log('USUARIO NÂO INSERIU NADA')
    
  } else {
    console.log('--------------------- ', valueTextSemLista)
    



    
    const responseLista = await ServiceListaUser.post('/createlista', {
      "id_user": userId,
      "nome_lista": valueTextSemLista,
      "primeira_lista_true": true
    }) 

    console.log('responseLista ', responseLista.data)
    if (responseLista.data.status === 1) {
      console.log('LISTA CRIADA COM SUCESSO')
      setLista(null)
    }
    loadLista()
    setModalVisibleSemLista(false)
    setValueTextSemLista('')  
    
  }
  
}

if(modalVisibleSemLista) {
  return <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisibleSemLista}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setModalVisibleSemLista(!modalVisibleSemLista);
    }}
  >
    <View style={stylesCreate.centeredView}>
      <View style={stylesCreate.modalView}>
        <Text style={stylesCreate.modalText}>Criar nova lista</Text>

        <TextInput
            style={{width: 200 ,height: 60, margin: 10, padding: 10, 
              backgroundColor: '#9C93FC', borderRadius: 20, fontSize: 20}}
              placeholder="Criar Lista"
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
      </View>
    </View>
  </Modal>
}

return (
  <View style={styles.container}>
    <Text style={{color: '#040E2C',fontWeight: 'bold', fontSize: 20, marginTop: '7%', marginLeft: '7%'}}>Minhas Listas</Text>
    
    <FlatList
        data={lista}
        keyExtractor={(item) => item._id}
        style={{width: '100%', height: '20%', marginTop: '8%', borderTopColor: '#EBE8EA', borderTopWidth: 2, }}
        showsVerticalScrollIndicator ={false}
        renderItem={({ item }) => (
          
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={{width: '90%', height: 83,  backgroundColor: '#8B80FC', borderRadius: 28, 
                    flexDirection: 'row', marginBottom: '3%'}} onPress={() => findProdutoList(item.nome_lista)}>
            
            <View style={{justifyContent: 'center'}}>
              <Text style={{marginLeft: '20%', color: '#FFFFFF', 
              fontSize: 18, fontWeight: '700', lineHeight: 20}}>{item.nome_lista}</Text>
            </View>
            

            </TouchableOpacity>
            
          </View>
                    
      )}
    />


<View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={{width: '70%', height: 83,  backgroundColor: '#040E2C', borderRadius: 28, 
                    flexDirection: 'row',  justifyContent: "center",alignItems: "center"}} onPress={() => addLista()}>
            
            <View style={{alignSelf: 'center'}}>
              <Text style={{color: '#FFFFFF', 
              fontSize: 18, fontWeight: '700', lineHeight: 20, 
              textAlignVertical: "center",textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>Criar lista +</Text>
            </View>
            </TouchableOpacity>
    </View>

            
    
    

  </View>
)


}

/*
  <FlatList
            data={lista}
            keyExtractor={(item) => item._id}
            style={{width: '100%', height: '20%', marginTop: '8%', borderTopColor: '#EBE8EA', borderTopWidth: 2, }}
            showsVerticalScrollIndicator ={false}
            renderItem={({ item }) => (
              
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{width: '90%', height: 83,  backgroundColor: '#8B80FC', borderRadius: 28, 
                        flexDirection: 'row', marginBottom: '3%'}} onPress={() => findProdutoList(item.nome_lista)}>
                
                <View style={{justifyContent: 'center'}}>
                  <Text style={{marginLeft: '20%', color: '#FFFFFF', 
                  fontSize: 18, fontWeight: '700', lineHeight: 20}}>{item.nome_lista}</Text>
                </View>
                

                </TouchableOpacity>
                
              </View>
                        
          )}
        />


<View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{width: '70%', height: 83,  backgroundColor: '#040E2C', borderRadius: 28, 
                        flexDirection: 'row',  justifyContent: "center",alignItems: "center"}} onPress={() => addLista()}>
                
                <View style={{alignSelf: 'center'}}>
                  <Text style={{color: '#FFFFFF', 
                  fontSize: 18, fontWeight: '700', lineHeight: 20, 
                  textAlignVertical: "center",textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>Criar lista +</Text>
                </View>
                </TouchableOpacity>
        </View>


  */

        const stylesCreate = StyleSheet.create({
          centeredView: {
            
            justifyContent: "center",
            alignItems: "center",
            //marginTop: 22,
            height: '92%',
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