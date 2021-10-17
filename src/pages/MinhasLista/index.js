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
import { Button, Image, Alert,StyleSheet, Text, View , Modal, TextInput, Pressable , TouchableOpacity, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ServiceListaUser from '../../services/listaUser'
import serviceUser from '../../services/serviceUser'
import AsyncStorageUsuario from '@react-native-async-storage/async-storage';
import Storage from '../../services/Storage';
import styles from './styles'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  const [modalDeleteList, setModalDeleteList] = useState(false);
  const [modalEditList, setModalEditList] = useState(false);
  const [listaPadrao, setListaPadrao] = useState(false);


  //armazenarUserLogin('verificador', 'rsr@gmail.com')
  //buscarUserLogin('verificador')
  //deleteUserLogin('verificador')
  // rsr@gmail.com

  async function TesteNavigation() {
    console.log('TesteNavigation()')
    //Routes.Routes()

    navigation.navigate('Home')
  }

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

      console.log('MINHAS LISTA ENTROU AQUI 1 ---------------------->>>>>>>>>>>>>.')
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
      console.log('CHAMOU ESSE USEEFFECT -----------__>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..')
      console.log('MINHAS LISTA ENTROU AQUI 2')
      
      //navigation.navigate('Home')

      const id_user = await Storage.buscarUserLogin('value')
      setUserId(id_user)
      if (id_user) {
      console.log('id_userid_userid_userid_user:::', id_user)
        const responseLista = await ServiceListaUser.post('/findlistaall', {
          "id_user": id_user
        })
       // console.log('O QUE ACONTECE NA LISTA: ', responseLista.data)
        if (responseLista.data.status === 0) {
          setLoading(false);
          return await setListaVazia('0')
          
        } else {
          setLoading(false);
          if (props.route.params?.userNull === true) {
            console.log('ENTROU NO IF')
            setModalEditList(true)
            //EditList()
            //return await setLista(responseLista.data)
          } else {
            return await setLista(responseLista.data)
          }
          
        }
      
      } else {
        setLoading(false);
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

    const existeLista = await ServiceListaUser.post('/obterUm', {
      "id_user": userId,
      "nome_lista": valueTextSemLista,
    })

    console.log('existeLista.data: ',existeLista.data)

    if (existeLista.data.status === 1) {
      return Alert.alert(
        //title
        'Error',
        //body
        `Não é possível criar lista duplicada!`,
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
  
}

async function deleteList() {
  console.log('deleteList')
  await console.log('modalDeleteList TRUE: ', modalDeleteList)
  if (modalDeleteList === false) {
    await setModalDeleteList(true)
    await console.log('modalDeleteListmodalDeleteList: ',modalDeleteList)
  }
}

async function EditList() {
  console.log('EditList') // modalEditList, setModalEditList
  await console.log('modalEditList TRUE: ', modalDeleteList)
  if (modalEditList === false) {
    await setModalEditList(true)
    await console.log('modalEditListmodalEditList: ',modalEditList)
  }

  const responseListPadrao = await ServiceListaUser.post('/findlistpadrao', {
    "id_user": userId,
  })
  // listaPadrao, setListaPadrao
  console.log('responseListPadrao.data::::::::::::: ',responseListPadrao.data)
 
    setListaPadrao(responseListPadrao.data.nome_lista)
  

}

async function alterarListaPadrao(item) {
  console.log('alterarListaPadrao ', item)

  if (item.lista_padrao_add_produto === true) {
    return Alert.alert(
      'Atenção',
      `Essa lista já se encontra como padrão para adicionar os produtos!`,
      [{text: 'Ok',},],
     )
  } else {
    console.log('CAIU AQUI NO ELSE')
    const responseUpdateListPadrao = await ServiceListaUser.post('/updatefindlistpadrao', {
      "id_user": userId,
      "nome_lista": item.nome_lista,
    })
    console.log('responseUpdateListPadrao: ', responseUpdateListPadrao.data)

    
    if (responseUpdateListPadrao.data.error === false) {
      Alert.alert(
        'Atenção',
        `Lista alterada como padrão com sucesso!`,
        [{text: 'Ok',},],
      )
    } else {
      Alert.alert(
        'Atenção',
        `Não foi possível alterar agora, tente mais tarde!`,
        [{text: 'Ok',},],
      )
    }
    Storage.deletarListaPadrao('lista')
    Storage.armazenarListaPadrao('lista', item.nome_lista)
    setListaPadrao(false);
    await setModalEditList(false)
    
    
  }


}

async function cancelarDeleteLista() {
  setModalDeleteList(false)
}

async function cancelarEditLista() {
  setModalEditList(false)
}

async function excluindoLista(item) {
  console.log('excluindoLista ', item)
  
  const responseExluiLista = await ServiceListaUser.post('/excluirlist', {
    "_id": item._id,
    "id_user": item.id_user,
    "nome_lista": item.nome_lista,
  })

  if (responseExluiLista.data.obj) {
    await setLista(responseExluiLista.data.obj)
    console.log('item::: ', item)
    if (item.lista_padrao_add_produto === true) {
      console.log('ENTROU NO IF DELETE LISTA PADRAO')
      Storage.deletarListaPadrao('lista')
    }
    setModalDeleteList(false)

  } else {
    return Alert.alert(
      'Atenção',
      `Error ao excluir lista!`,
      [{text: 'Ok',},],
     )
  }
  //console.log('responseExluiLista: ', responseExluiLista.data)

  /*
  if (responseExluiLista.status === 200) {
    setModalDeleteList(false)
    console.log('item.userId:::::::: ', item)
    setLoading(true);
    const responseLista = await ServiceListaUser.post('/findlistaall', {
      "id_user": item.id_user
    })
    //console.log('responseLista::: ', responseLista .data)
    if (responseLista.data.status === 0) {
      setLoading(false);
      return await setListaVazia('0')
      
    } else {
      setLoading(false);
      return await setLista(responseLista.data)
    }
  }  */
  
  /*

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

} else {
  setLoading(false);
}
  */


  // loadLista(id_user)
  /*if (responseExluiLista.status === 200) {
    //await setMyListProd(responseExluiLista.data)
    setModalDeleteList(false)
    return Alert.alert(
      'Atenção',
      `Lista excluida!`,
      [{text: 'Ok',},],
     )
  } else {
    setModalDeleteList(false)
    return Alert.alert(
      'Error',
      `Não foi possível Exluir tente mais tarde!`,
      [{text: 'Ok'},],
    )
  } */
  
  
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

if(modalDeleteList) {
  return <Modal
    animationType="slide"
    transparent={true}
    visible={modalDeleteList}
    onRequestClose={() => {
      //Alert.alert("AA Modal has been closed.");
      setModalDeleteList(!modalDeleteList);
    }}
  >
        <View style={styles.container}>

      <View style={{flexDirection: 'row', justifyContent: 'space-around' ,marginTop: '5%'}}>
      <TouchableOpacity style={{width: '16%', marginLeft: '8%'}} onPress={() => cancelarDeleteLista()}>
                    <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{color: '#040E2C',fontWeight: 'bold', fontSize: 20, width: '60%' }}>Minhas Listas</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '16%'}}>
        </View>
        </View>
      </View>

      <View style={{ height: '93%', alignItems: 'center', }}>

      {lista &&
          <FlatList
          data={lista}
          keyExtractor={(item) => item._id}
          style={{width: '90%', height: '100%', marginTop: '8%', borderTopColor: '#EBE8EA', borderTopWidth: 2, }}
          showsVerticalScrollIndicator ={false}
          renderItem={({ item }) => (
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
              <TouchableOpacity style={{width: '85%', height: 83,  backgroundColor: '#8B80FC', borderRadius: 28, 
                      flexDirection: 'row', marginBottom: '3%'}} onPress={() => findProdutoList(item.nome_lista)}>
              
              <View style={{justifyContent: 'center', width: '80%'}}>
                <Text style={{marginLeft: '10%', color: '#FFFFFF', 
                fontSize: 18, fontWeight: '700', lineHeight: 20}}>{item.nome_lista}</Text>
              </View>
  
              </TouchableOpacity>

              <TouchableOpacity style={{justifyContent: 'center', width: '15%' }} onPress={() => excluindoLista(item)}>
                      <MaterialCommunityIcons name="delete-empty-outline" size={55} color="red" />
              </TouchableOpacity>
              
            </View>
                      
        )}
      />
        
      
      }
     
  </View>
      
  </Modal>
}


if(modalEditList) {
  return <Modal
    animationType="slide"
    transparent={true}
    visible={modalEditList}
    onRequestClose={() => {
      //Alert.alert("AA Modal has been closed.");
      setModalEditList(!modalEditList);
    }}
  >
        <View style={styles.container}>

      <View style={{flexDirection: 'row', justifyContent: 'space-around' ,marginTop: '5%'}}>
      <TouchableOpacity style={{width: '16%', marginLeft: '8%'}} onPress={() => cancelarEditLista()}>
                    <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{color: '#040E2C',fontWeight: 'bold', fontSize: 20, width: '60%' }}>Minhas Listas</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '16%'}}>
        </View>
        </View>
      </View>
      

      <View style={{ height: '93%', alignItems: 'center', }}>
        {listaPadrao && 
          <Text style={{margin: '5%', fontStyle: 'italic' }}>Atualmente a sua lista que você está adicionando os produtos é <Text style={{fontWeight: '700'}}>{listaPadrao}</Text> para alterar selecione uma lista.</Text>
        }
        {!listaPadrao && 
          <Text style={{margin: '5%', fontStyle: 'italic' }}>Atualmente você não tem uma lista padrão para adicionar os produtos, selecione uma lista.</Text>
        }
      
      {lista &&
          <FlatList
          data={lista}
          keyExtractor={(item) => item._id}
          style={{width: '100%', height: '20%', marginTop: '1%', borderTopColor: '#EBE8EA', borderTopWidth: 2, }}
          showsVerticalScrollIndicator ={false}
          renderItem={({ item }) => (
            
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={{width: '90%', height: 83,  backgroundColor: '#8B80FC', borderRadius: 28, 
                      flexDirection: 'row', marginBottom: '3%'}} onPress={() => alterarListaPadrao(item)}>
              
              <View style={{justifyContent: 'center', width: '80%'}}>
                <Text style={{marginLeft: '10%', color: '#FFFFFF', 
                fontSize: 18, fontWeight: '700', lineHeight: 20}}>{item.nome_lista}</Text>
              </View>
  
              </TouchableOpacity>
              
            </View>
                      
        )}
      />
      }
      
  </View>
      
  </Modal>
}

return (
  <View style={styles.container}>

      <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '7%', height: '10%'}}>
            <TouchableOpacity style={{width: '10%', marginLeft: '2%'}} onPress={() => navigation.navigate('Home')}>
                        <Ionicons name="chevron-back-outline" size={24} color="black" />
            </TouchableOpacity>

            <Text style={{color: '#040E2C',fontWeight: 'bold', fontSize: 20, width: '35%' }}>Minhas Listas</Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '16%'}}>
            {lista &&
              <TouchableOpacity style={{marginRight: '15%'}} onPress={() => EditList()}>
                  <MaterialCommunityIcons name="playlist-edit" size={25} color="black" />
               </TouchableOpacity>
            }

            {lista && 
              <TouchableOpacity style={{marginRight: '10%'}} onPress={() => deleteList()}>
                <MaterialCommunityIcons name="delete-sweep-outline" size={25} color="black" />
              </TouchableOpacity>
            }
            

            </View>
            
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