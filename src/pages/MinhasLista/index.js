/*
 const armazenarUserLogin = (chave, valor) => {
    AsyncStorageUsuario.setItem(chave, valor)
  }

  const BuscarUserLogin = (chave, valor) => {
    AsyncStorageUsuario.setItem(chave, valor)
  }
  

  const buscarUserLogin = async (chave) => {
    const valor = await AsyncStorageUsuario.getItem(chave)
    setUserId(valor)
    console.log('DENTRO DO STORAGE: ', valor)
  }

  const deleteUserLogin = async (chave) => {
    await AsyncStorageUsuario.removeItem(chave)
    //setUserId(valor)
    console.log('DELETE STORAGE: ')
  }



*/



import React, {useEffect, useState} from 'react';
import { Button, Alert,StyleSheet, Text, View , Modal, TextInput, Pressable , TouchableOpacity, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ServiceListaUser from '../../services/listaUser'
import serviceUser from '../../services/serviceUser'
import AsyncStorageUsuario from '@react-native-async-storage/async-storage';
import Storage from '../../services/Storage';
import styles from './styles'
import { Ionicons } from '@expo/vector-icons';

export default function MinhasLista(props) {
  console.log('EXECUTOU AQUI : props: ',props.route.params)
  
  const navigation = useNavigation();
  const [lista, setLista] = useState(null)
  const [listaVazia, setListaVazia] = useState('')
  const [modalVisibleSemLista, setModalVisibleSemLista] = useState(false);
  const [valueTextSemLista, setValueTextSemLista] = useState()
  const [userId, setUserId] = useState(Storage.buscarUserLogin('value'))
  // Trazer pelo navigation quando o usuário logar
  const [dataServiceprod, setDataServiceprod ] = useState()
  const [loading, setLoading] = useState(true);


  //armazenarUserLogin('verificador', 'rsr@gmail.com')
  //buscarUserLogin('verificador')
  //deleteUserLogin('verificador')
  // rsr@gmail.com


  async function loadLista(id_user) {
    //await buscarUserLogin('verificador')
    // "id_user": "6136be273d77ff5c8179eb74"
    console.log('EXECUTOU A PESQUISA DA LISTA')
    const responseLista = await ServiceListaUser.post('/findlistaall', {
      "id_user": id_user
    })
    console.log('responseLista::::::::::::::::: ', responseLista.data)
    //console.log('PRODUTOS: ',responseLista.data )
    return await setLista(responseLista.data)
  }

  useEffect(() => {
    (async () => {
    /* const deleteUserLogin = async (chave) => {
        await AsyncStorageUsuario.removeItem(chave)
        console.log('DELETE STORAGE: ')
      }
      deleteUserLogin('value')  */  

      const id_user = await Storage.buscarUserLogin('value')
      setUserId(id_user)
      if (id_user) {
      console.log('id_userid_userid_userid_user', id_user)
        const responseLista = await ServiceListaUser.post('/findlistaall', {
          "id_user": id_user
        })
        console.log('O QUE ACONTECE NA LISTA: ', responseLista.data)
        if (responseLista.data.status === 0) {
          setLoading(false);
          return await setListaVazia('0')
          
        } else {
          setLoading(false);
          return await setLista(responseLista.data)
        }
        

        //console.log('response.data:::: ', response.data)
      }
    })();
  }, [])


  useEffect(() => {
    (async () => {
      console.log('CHAMOU ESSE USEEFFECT -----------__>>>>>>>>.')
      const id_user = await Storage.buscarUserLogin('value')
      setUserId(id_user)
      if (id_user) {
      console.log('id_userid_userid_userid_user', id_user)
        const responseLista = await ServiceListaUser.post('/findlistaall', {
          "id_user": id_user
        })
        console.log('O QUE ACONTECE NA LISTA: ', responseLista.data)
        if (responseLista.data.status === 0) {
          setLoading(false);
          return await setListaVazia('0')
          
        } else {
          setLoading(false);
          return await setLista(responseLista.data)
        }
      
      }
    })();
  }, [props.route.params])


  
  /*
useEffect(() => {
  console.log('EXECUTOU O USEEFFECT')
  const id_user = await Storage.BuscarUserLogin('value')
  loadLista(id_user)

}, []);  */

async function addLista() {
  //armazenarUserLogin('verificador', 'MEU-EMAIL-LOGIN@GMAIL.COM')
  //deleteUserLogin('verificador')
  //await buscarUserLogin('value')
  console.log('-------------_>>>>')
  //const resultStorage = await Storage.BuscarUserLogin('value')
  const resultStorage = await Storage.buscarUserLogin('value')
  console.log('resultStorage: ', resultStorage)
  //await setUserId(resultStorage)
  console.log('userId: ', userId)

  if (userId === null) {
    navigation.navigate('LogarCriarConta', userId); 
    
  } else {
    setModalVisibleSemLista(true)
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
  console.log('lenght: VERIFICAR SE EXISTE ALGUM CARACTERE ')
  if (valueTextSemLista === '') {
    
    console.log('USUARIO NÂO INSERIU NADA')
    return Alert.alert(
      //title
      'Error',
      //body
      `Não é possível criar uma lista sem nome`,
      [
        {
          text: 'Tentar Novamente',
        },
      ],
  )
    
  } else {
    console.log('--------------------- ', valueTextSemLista)
    console.log('userId: ----------------', userId)
    const responseLista = await ServiceListaUser.post('/createlista', {
      "id_user": userId,
      "nome_lista": valueTextSemLista,
      "primeira_lista_true": true,
      "lista_padrao_add_produto": true
    }) 

    console.log('responseLista ', responseLista.data)
    if (responseLista.data.status === 1) {
      console.log('LISTA CRIADA COM SUCESSO')
      const valor = await Storage.buscarListaPadrao('lista')
      console.log('VALOR::::::::::::', valor)
      if (valor === null) {
        Storage.armazenarListaPadrao('lista', valueTextSemLista)
      } else {
        Storage.deletarListaPadrao('lista')
        Storage.armazenarListaPadrao('lista', valueTextSemLista)
      }
      const valor2 = await Storage.buscarListaPadrao('lista')
      console.log('VALOR 222222222:::::::: ', valor2)
      //Storage.deletarListaPadrao('lista')
      //Storage.armazenarListaPadrao('lista', valueTextSemLista)
      console.log('responseLista.data: ',responseLista.data)
      setListaVazia('')
      console.log()
      //setLista(null)
    }
    await loadLista(userId)
    setModalVisibleSemLista(false)
    setValueTextSemLista('')  
    
  }
  
}

if (loading) {
  return (
    <View style={styles.containerCenter}>
      <Text style={{ fontSize: 17, fontStyle: 'italic' }}>
        carregando dados...
        </Text>
    </View>
  )
}

if(modalVisibleSemLista) {
  return <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisibleSemLista}
    onRequestClose={() => {
      //Alert.alert("AA Modal has been closed.");
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
      </View>
    </View>
  </Modal>
}

return (
  <View style={styles.container}>
    
    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '7%', height: '10%'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Ionicons name="chevron-back-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{color: '#040E2C',fontWeight: 'bold', fontSize: 20,  marginLeft: '7%'}}>Minhas Listas</Text>
                    <TouchableOpacity>
                       <Text></Text>
                    </TouchableOpacity>
      </View>

    
 
    {userId && listaVazia === '0' &&
      <View style={{marginTop: '20%',justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ fontSize: 17, fontStyle: 'italic' }}>
        Usuário sem lista.
        </Text>
        <Text style={{ fontSize: 17, fontStyle: 'italic', marginTop: '5%' }}>
        Para criar, clique no botão "<Text style={{fontWeight: 'bold'}}>Criar lista +</Text>"
        </Text>

        <Text style={{ fontSize: 17, fontStyle: 'italic', marginTop: '10%', margin: '8%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontWeight: 'bold', }}>Atenção:</Text>
         A última lista criada ficará por padrão para adicionar os produtos,
         <Text> caso deseje alterar clique no menu.</Text>
        </Text>
        
      
    </View>
    }

    {!userId &&
      <View style={{marginTop: '20%',justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ fontSize: 17, fontStyle: 'italic' }}>
        Usuário não logado.
        </Text>
        <Text style={{ fontSize: 17, fontStyle: 'italic', marginTop: '5%' }}>
        Para Logar, clique no botão "<Text style={{fontWeight: 'bold'}}>Criar lista +</Text>"
        </Text>
    </View>
    }

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