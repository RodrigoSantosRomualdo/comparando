import React,{useState, useEffect} from 'react';
import { Button, StyleSheet, Modal, Text, View,Pressable, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import ServiceListaUser from '../../services/listaUser'

import styles from './styles'

export default function MinhaListaProduto(props) {
    console.log('props: ', props.route.params)
    const navigation = useNavigation();
    const [mylistProd, setMyListProd] = useState();
    const [userId, setUserId] = useState()
    const [loading, setLoading] = useState(true);
    const [modalDeleteList, setModalDeleteList] = useState(false);

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
            setLoading(false);
            return await setMyListProd(responseMyLista.data)
        }
        
      }

      useEffect(() => {
        console.log('EXECUTOU O USEEFFECT')
        
        loadMyLista()
      
      }, []);

      async function deleteListProd() {

        await console.log('modalDeleteList TRUE: ', modalDeleteList)
        if (modalDeleteList === false) {
          await setModalDeleteList(true)
          await console.log('modalDeleteListmodalDeleteList: ',modalDeleteList)
        }
        //await setModalDeleteList(false)
        //await console.log('modalDeleteList FALSE: ', modalDeleteList)
        
      }

      async function cancelarLista() {
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
            `Não foi possível Exluir teste mais tarde!`,
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
            <TouchableOpacity style={{width: '16%', marginLeft: '3%'}} onPress={() => cancelarLista()}>
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
                style={{width: '90%', height: '100%', borderTopColor: '#EBE8EA', borderTopWidth: 2, }}
                showsVerticalScrollIndicator ={false}
                renderItem={({ item }) => (
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity style={{width: '90%', backgroundColor: '#8B80FC', borderRadius: 39, 
                    flexDirection: 'row', marginTop: '3%'}}>
                        <Image source={require('../../assets/qrcode/qr-code.png')} 
                    style={{width:68, height:70, borderRadius: 19, marginLeft: 15, marginBottom: 15, marginTop: 15, marginRight: 15}}/>

                    <View style={{marginTop: 15}}>
                        <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold', width: '100%' }}>{item.descricao}</Text>
                        <Text style={{color: '#000', fontSize: 10, fontWeight: 'bold' }}>{item.supermecado.nome_fantasia}</Text>
                        <Text style={{color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}><Text style={{color: '#000', fontSize: 13, fontWeight: 'bold' }}>Preço UN: </Text>{item.preco_venda} <Text style={{color: '#000', fontSize: 13, fontWeight: 'bold' }}>Qtde: </Text>{item.quantidade}</Text>

                        <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}><Text style={{color: '#000', fontSize: 13, fontWeight: 'bold' }}>Total:</Text> R$ {item.preco_total} </Text>
                    </View>

                    <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => excluindoProdLista(item)}>
                      <MaterialCommunityIcons name="delete-empty-outline" size={55} color="red" />
                    </TouchableOpacity>

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

    return (
      <View style={styles.container}>

          <View style={{flexDirection: 'row', justifyContent: 'space-around' ,marginTop: '5%'}}>
          <TouchableOpacity style={{width: '16%', marginLeft: '3%'}} onPress={() => navigation.navigate('MinhasLista')}>
                        <Ionicons name="chevron-back-outline" size={24} color="black" />
            </TouchableOpacity>

            <Text style={{color: '#040E2C',fontWeight: 'bold', fontSize: 20, width: '60%' }}>{props.route.params?.nameList}</Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '16%'}}>
            <TouchableOpacity style={{marginRight: '3%'}}>
                <MaterialCommunityIcons name="filter-outline" size={24} color="black" />

            </TouchableOpacity>

            <TouchableOpacity style={{marginRight: '5%'}} onPress={() => deleteListProd()}>
                <MaterialCommunityIcons name="delete-sweep-outline" size={25} color="black" />

            </TouchableOpacity>
            </View>
            
          </View>
        

        <View style={{ height: '93%', alignItems: 'center', }}>

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
                        <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold', width: '100%' }}>{item.descricao}</Text>
                        <Text style={{color: '#000', fontSize: 10, fontWeight: 'bold' }}>{item.supermecado.nome_fantasia}</Text>
                        <Text style={{color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}><Text style={{color: '#000', fontSize: 13, fontWeight: 'bold' }}>Preço UN: </Text>{item.preco_venda} <Text style={{color: '#000', fontSize: 13, fontWeight: 'bold' }}>Qtde: </Text>{item.quantidade}</Text>

                        <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}><Text style={{color: '#000', fontSize: 13, fontWeight: 'bold' }}>Total:</Text> R$ {item.preco_total} </Text>
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