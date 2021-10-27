import React,{useState, useEffect} from 'react';
import { Button, StyleSheet, Modal, Text, View,Pressable, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Storage from '../../services/Storage';

import ServiceListaUser from '../../services/listaUser'

import styles from './styles'

export default function MinhaListaProduto(props) {
    console.log('props: ', props.route.params)
    const navigation = useNavigation();
    const [mylistProd, setMyListProd] = useState();
    const [totalPrecoList, setTotalPrecoList] = useState(false);
    const [userId, setUserId] = useState()
    const [loading, setLoading] = useState(true);
    const [modalDeleteList, setModalDeleteList] = useState(false);
    const [modalFilterList, setModalFilterList] = useState(false);
    const [optionsFilterList, setOptionsFilterList] = useState([{id: 1, texto: 'Mercado'},{id: 2, texto: 'Maior Preço UN'},{id: 3, texto: 'Menor Preço UN'},{id: 4, texto: 'Maior Preço Total'},{id: 5, texto: 'Menor Preço Total'}])

    async function loadMyLista() {
        console.log('EXECUTOU A PESQUISA DA LISTA')
        const responseMyLista = await ServiceListaUser.post('/findlistprod', {
          "id_user": props.route.params.userId,
          "nome_lista": props.route.params.nameList,
	        "primeira_lista_true": false
        })
        
        if (responseMyLista.data.length === 0) {
          setLoading(false);
            return await setMyListProd(null)
        } else {
            console.log('MY PRODUTOS: ',responseMyLista.data )
           /* let i = 0;
            let total = 0;
            while(responseMyLista.data[i]) {
              console.log('responseMyLista.data[i]', responseMyLista.data[i].preco_total)
              total += responseMyLista.data[i].preco_total;
              i++;
            } */
            await setTotalPrecoList(total)
            setLoading(false);
            return await setMyListProd(responseMyLista.data)
        }
        
      }

      useEffect(() => {
        console.log('EXECUTOU O USEEFFECT')
        async() => {
          console.log('EXECUTOU O ASYNC')
        }
        
        //loadMyLista()
      
      }, []);

      useEffect(() => {
        (async () => {
          setTotalPrecoList(false)
          console.log('CHAMOU ESSE USEEFFECT -----------__>>>>>>>>.')
          const responseMyLista = await ServiceListaUser.post('/findlistprod', {
            "id_user": props.route.params.userId,
            "nome_lista": props.route.params.nameList,
            "primeira_lista_true": false
          })
          if (responseMyLista.data.length === 0) {
            setLoading(false);
              return await setMyListProd(null)
          } else {
              console.log('MY PRODUTOS: ',responseMyLista.data )
              let i = 0;
              let total = 0;
              while(responseMyLista.data[i]) {
                console.log('responseMyLista.data[i]', responseMyLista.data[i].preco_total)
                total += responseMyLista.data[i].preco_total;
                i++;
              }
              await setTotalPrecoList(total.toFixed(2)) 
              setLoading(false);
              return await setMyListProd(responseMyLista.data)
            }
          
        })();
      }, [props.route.params])

      async function deleteListProd() {

        await console.log('modalDeleteList TRUE: ', modalDeleteList)
        if (modalDeleteList === false) {
          await setModalDeleteList(true)
          await console.log('modalDeleteListmodalDeleteList: ',modalDeleteList)
        }
      }

      async function cancelarDeleteProdLista() {
        setModalDeleteList(false)
        navigation.navigate('MinhasLista')
      }  

      async function excluindoProdLista(item) {
        console.log('item: ', item)
        const {_id} = item;

        const responseExluiLista = await ServiceListaUser.post('/excluirprodutolist', {
          "_id": _id,
          "id_user": props.route.params.userId,
          "nome_lista": props.route.params.nameList,
	        "primeira_lista_true": false
        })

        console.log('responseExluiLista: ', responseExluiLista.status)
        if (responseExluiLista.status === 200) {
          await setMyListProd(responseExluiLista.data)
          return Alert.alert(
            //title
            'Atenção',
            //body
            `Produto excluido!`,
            [
              {
                text: 'Ok',
              },
            ],
          )
        } else {
          return Alert.alert(
            //title
            'Error',
            //body
            `Não foi possível Exluir tente mais tarde!`,
            [
              {
                text: 'Ok',
              },
            ],
          )
        }

        /*
          const responseMyLista = await ServiceListaUser.post('/findlistprod', {
          "id_user": props.route.params.userId,
          "nome_lista": props.route.params.nameList,
	      "primeira_lista_true": false
        })
        */

      }

      async function FilterList() {
        if (modalFilterList === false) {
          await setModalFilterList(true)
          await console.log('modalDeleteListmodalDeleteList: ',modalFilterList)
        }
      }

      async function cancelarFilterLista() {
        await setModalFilterList(false)
      }

      async function salvarFilterLista(item) {
        console.log('SALVAR FILTER' ,item.texto)

        const responseMyLista = await ServiceListaUser.post('/findfilterlistprod', {
          "id_user": props.route.params.userId,
          "nome_lista": props.route.params.nameList,
	        "primeira_lista_true": false,
          "filterprodutos": item.texto
        })
        
        if (responseMyLista.data.length === 0) {
          setLoading(false);
            setModalFilterList(false)
            await Storage.deletarListaPadrao('lista')
            return await setMyListProd(null)
        } else {
            console.log('MY PRODUTOS: ',responseMyLista.data )
            setLoading(false);
            setModalFilterList(false)
            await Storage.deletarListaPadrao('lista')
            return await setMyListProd(responseMyLista.data)
        }



        //
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
            <TouchableOpacity style={{width: '16%', marginLeft: '3%'}} onPress={() => cancelarDeleteProdLista()}>
                          <Ionicons name="chevron-back-outline" size={24} color="black" />
              </TouchableOpacity>
              <Text style={{color: '#040E2C',fontWeight: 'bold', fontSize: 20, width: '60%' }}>{props.route.params?.nameList}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '16%'}}>
              </View>
              </View>
            </View>

            <View style={{ height: '93%', alignItems: 'center', }}>

            {mylistProd &&
                <FlatList
                data={mylistProd}
                keyExtractor={(item) => item._id}
                style={{width: '90%', height: '100%', borderTopColor: '#EBE8EA', borderTopWidth: 2,  }}
                showsVerticalScrollIndicator ={false}
                renderItem={({ item }) => (
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity style={{width: '85%', backgroundColor: '#8B80FC', borderRadius: 39, 
                          flexDirection: 'row', marginTop: '3%'}}>
                              <Image source={require('../../assets/qrcode/qr-code.png')} 
                          style={{width:68, height:70, borderRadius: 19, marginLeft: 15, marginBottom: 15, marginTop: 15, marginRight: 15}}/>

                          <View style={{marginTop: 15}}>
                              <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold', width: '100%' }}>{item.descricao}</Text>
                              <Text style={{color: '#000', fontSize: 10, fontWeight: 'bold' }}>{item.supermecado.nome_fantasia}</Text>
                              <Text style={{color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}><Text style={{color: '#000', fontSize: 13, fontWeight: 'bold' }}>Preço UN: </Text>{item.preco_venda.toFixed(2)} <Text style={{color: '#000', fontSize: 13, fontWeight: 'bold' }}>Qtde: </Text>{item.quantidade.toFixed(2)}</Text>

                              <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}><Text style={{color: '#000', fontSize: 13, fontWeight: 'bold' }}>Total:</Text> R$ {item.preco_total.toFixed(2)} </Text>
                          </View>

                        </TouchableOpacity>
                          <TouchableOpacity style={{justifyContent: 'center', width: '15%'}} onPress={() => excluindoProdLista(item)}>
                            <MaterialCommunityIcons name="delete-empty-outline" size={55} color="red" />
                          </TouchableOpacity>
                        
                        

                </View>
            
                )}
            />
            
            }
            {!mylistProd &&
                <View>
                    <View style={{justifyContent: 'center', alignItems: 'center'  , marginTop: '30%' }}>
                        <Text style={{fontSize: 15, fontWeight: '700'}}>Sua Lista se encontra vazia</Text>
                        <Text style={{fontSize: 18, fontWeight: '800'}}>Deseja adicionar produtos na lista?</Text>

                    </View>
                    
                    <View style={{marginTop: '10%',justifyContent: 'center', alignItems: 'center'  , }}>
                        <TouchableOpacity style={{width: '50%', backgroundColor: '#8B80FC', borderRadius: 39, 
                        justifyContent: 'center', alignItems: 'center'  , }} onPress={() => navigation.navigate('Home')}>
                        
                        <Text style={{fontSize: 25, fontWeight: '700', }}>SIM</Text>
                        </TouchableOpacity>

                    </View>

                </View>
              
            }

        </View>
            
        </Modal>
      }

      if (modalFilterList) {
        return <Modal
          animationType="slide"
          transparent={true}
          visible={modalFilterList}
          onRequestClose={() => {
            //Alert.alert("AA Modal has been closed.");
            setModalFilterList(!modalFilterList);
          }}
      >
    <View style={stylesCreate.centeredView}>
      <View style={stylesCreate.modalView}>
        <Text style={stylesCreate.modalText}>Filtrar por</Text>

        <FlatList
                data={optionsFilterList}
                keyExtractor={(item) => item.id.toString()}
                style={{width: '90%', height: '60%', borderTopColor: '#EBE8EA', borderTopWidth: 2, marginTop: '7%', }}
                showsVerticalScrollIndicator ={false}
                renderItem={({ item }) => (
                  <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '5%'}} >
                  <TouchableOpacity style={{width: '90%', backgroundColor: '#040E2C', borderRadius: 39, 
                      flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}} onPress={() => salvarFilterLista(item) }>
                  <View style={{padding: 5}}>
                    <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold',  }}>{item.texto}</Text>
                  </View>
                    </TouchableOpacity>
              </View>
            
                )}
            />
        <View style={{width: '100%' ,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Pressable
            style={[stylesCreate.button, stylesCreate.buttonClose]}
            onPress={() => cancelarFilterLista()}
          >
            <Text style={stylesCreate.textStyle}>Cancelar</Text>
          </Pressable>

        </View>
      </View>
    </View>
  </Modal>

      }

    return (
      <View style={styles.container}>

          <View style={{flexDirection: 'row', justifyContent: 'space-around' ,marginTop: '5%'}}>
            <TouchableOpacity style={{width: '16%', marginLeft: '3%'}} onPress={() => navigation.navigate('MinhasLista')}>
                        <Ionicons name="chevron-back-outline" size={24} color="black" />
            </TouchableOpacity>

            <Text style={{color: '#040E2C',fontWeight: 'bold', fontSize: 20, width: '60%' }}>{props.route.params?.nameList}</Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '16%'}}>
            <TouchableOpacity style={{marginRight: '3%'}} onPress={() => FilterList()}>
                <MaterialCommunityIcons name="filter-outline" size={24} color="black" />

            </TouchableOpacity>

            <TouchableOpacity style={{marginRight: '5%'}} onPress={() => deleteListProd()}>
                <MaterialCommunityIcons name="delete-sweep-outline" size={25} color="black" />

            </TouchableOpacity>
            </View>
            
          </View>
          {totalPrecoList && 
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontWeight: '700', fontSize: 15}}>O total da sua lista é R$ {totalPrecoList}</Text>
            </View>
            }
          
        

        <View style={{ height: '90%', alignItems: 'center', }}>

            {mylistProd &&
                <FlatList
                data={mylistProd}
                keyExtractor={(item) => item._id}
                style={{width: '90%', height: '100%', borderTopColor: '#EBE8EA', borderTopWidth: 2, }}
                showsVerticalScrollIndicator ={false}
                renderItem={({ item }) => (
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity style={{width: '90%', backgroundColor: '#8B80FC', borderRadius: 39, 
                    flexDirection: 'row', marginTop: '3%'}}>
                        <Image source={require('../../assets/qrcode/qr-code.png')} 
                    style={{width:68, height:70, borderRadius: 19, marginLeft: 15, marginBottom: 15, marginTop: 15, marginRight: 15}}/>

                    <View style={{marginTop: 15}}>
                        <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold', width: '100%' }}>{item.descricao} AAA</Text>
                        <Text style={{color: '#000', fontSize: 10, fontWeight: 'bold' }}>{item.supermecado.nome_fantasia}</Text>
                        <Text style={{color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}><Text style={{color: '#000', fontSize: 13, fontWeight: 'bold' }}>Preço UN: </Text>{item.preco_venda.toFixed(2)} <Text style={{color: '#000', fontSize: 13, fontWeight: 'bold' }}>Qtde: </Text>{item.quantidade.toFixed(2)}</Text>

                        <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}><Text style={{color: '#000', fontSize: 13, fontWeight: 'bold' }}>Total:</Text> R$ {item.preco_total.toFixed(2)} </Text>
                    </View>

                        </TouchableOpacity>

                </View>
            
                )}
            />
            
            }
            {!mylistProd &&
                <View>
                    <View style={{justifyContent: 'center', alignItems: 'center'  , marginTop: '30%' }}>
                        <Text style={{fontSize: 15, fontWeight: '700'}}>Sua Lista se encontra vazia</Text>

                    </View>
                    
                
                </View>
            }
        </View>
      </View>
    )
  }


  /*


<View style={{ height: '86%', alignItems: 'center', }}>

              

                <FlatList
                    data={mylistProd}
                    keyExtractor={(item) => item._id}
                    style={{width: '90%', height: '100%', borderTopColor: '#EBE8EA', borderTopWidth: 2, }}
                    showsVerticalScrollIndicator ={false}
                    renderItem={({ item }) => (
                        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <TouchableOpacity style={{width: '80%', backgroundColor: '#8B80FC', borderRadius: 39, 
                        flexDirection: 'row', marginTop: '3%'}}>
                            <Image source={require('../../assets/qrcode/qr-code.png')} 
                        style={{width:68, height:70, borderRadius: 19, marginLeft: 15, marginBottom: 15, marginTop: 15, marginRight: 15}}/>

                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold', width: '90%' }}>{item.descricao}</Text>
                            <Text style={{color: '#000', fontSize: 10, fontWeight: 'bold' }}>{item.supermecado.nome_fantasia}</Text>
                            <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>R$ {item.preco_venda}</Text>
                        </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={{marginTop: '8%'}} 
                        onPress={() => salvarProduto(dataServiceprod, userId, item.descricao, item )} >
                            <Icon name="playlist-plus" color={'#000'} size={30} style={{//width:68, height:70, 
                            borderRadius: 19, marginLeft: 15, 
                            marginBottom: 15, marginTop: 15, marginRight: 15}} />

                        </TouchableOpacity>


                        </View>
                        
                        
                    )}
                />

                </View>




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
















    /*
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
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center'
          },
          textStyle: {
            color: "#000",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 20
          },
          modalText: {
            marginBottom: 18,
            //textAlign: '',
            fontSize: 21,
            color: '#FFFFFF',
            fontWeight: '700'
          },
        
});