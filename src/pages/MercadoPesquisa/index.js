/*

async function loadSupProdutoQrcode() {
      console.log('EXECUTOU A PESQUISA DO PREÇO NO SUPERMECADO PELO CODIGO DE BARRAS')
      const response = await servicesSupIdDescProdUnidade.post('/buscar-codigo-barras',{
          codigo_barras: props.route.params.codigo_barras, 
      })
      //console.log('FINALIZOU', response.data)
      // TRAZ O E-MAIL OU O TOKEN PARA TRAZER O ID DO USUARIO PARA SALVAR PRODUTOS NA LISTA
      const responseUser = await serviceUser.post('/finduser', {"email": "rsr@gmail.com"})
      await setDataServiceprod(response.data)
      console.log('PRODUTOS FIND CODIGO: ',response.data )
      
      console.log('FINALIZOU', dataServiceprod )
      
      //console.log('RESPONSE USER: ', responseUser.data[0]._id)
      await setUserId(responseUser.data[0]._id)
  }


*/



import React, {useEffect, useState} from 'react';
import {View, Text, Alert, Button, StyleSheet,Keyboard , TouchableOpacity, Image, FlatList,Modal, Pressable, Picker, DrawerLayoutAndroidBase, RecyclerViewBackedScrollViewBase} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useKeyboard } from '@react-native-community/hooks'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import servicesSupIdDescProdUnidade from '../../services/servicesSupIdDescProdUnidade'
import serviceUser from '../../services/serviceUser'
import ServiceListaUser from '../../services/listaUser'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Storage from '../../services/Storage';
import * as Location from 'expo-location';
import servicesLocationSup from  '../../services/servicesLocationSup'

import styles from './styles'

export default function MercadoPesquisa(props) {
    //console.log('props.route: ', props.route.params.codigo_barras)
    const [valueText, setValueText] = useState();
    const keyboardd = useKeyboard()
    const [location, setLocation] = useState(null);
    const [verificacaoMenssagem, SetVerificacaoMenssagem] = useState(false)

    const navigation = useNavigation();
    const [userId, setUserId] = useState(Storage.buscarUserLogin('value'))
    const [listaPadraoAdd, setListaPadraoAdd] = useState();
    const [dataServiceprod, setDataServiceprod ] = useState()
    const [modalVisibleSemLista, setModalVisibleSemLista] = useState(false);
    const [modalVisibleAddProduto, setModalVisibleAddProduto] = useState(false);
    const [valueTextSemLista, setValueTextSemLista] = useState()
    const [valueQtd, setValueQtd] = useState("1")
    const [selectedValue, setSelectedValue] = useState("java");
    const [nameLista, setNameLista] = useState(false)
    const [options, setOptions] = useState(["Home","Savings","Car","GirlFriend"])
    const [objProdutoEscolhido, setObjProdutoEscolhido] = useState(null)
    //var options =["Home","Savings","Car","GirlFriend"];

    useEffect(() => {
      async function pesquisaProduto() {

        const listaPadraoAdd = await Storage.buscarListaPadrao('lista')
        console.log('listaPadraoAddlistaPadraoAddlistaPadraoAddlistaPadraoAdd ', listaPadraoAdd)
        await setListaPadraoAdd(listaPadraoAdd)

        let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
        const maxDistance = await Storage.buscarKM('valueKM')
        const response = await servicesLocationSup.post('/', { coordinates: [location.coords.latitude, location.coords.longitude], maxDistance: maxDistance});
        let date = response.data;
        //console.log('response.data::: ', response.data)

        let arraySupermecado = [];
        let arraySupermecadoDiscancia = [];
        date.map(async function(item) {
        
        await arraySupermecado.push(item._id)
        //await arraySupermecadoDiscancia.push(item)
        
        })

        //console.log('arraySupermecado: ', arraySupermecado)

        
        let responseProdutos = await servicesSupIdDescProdUnidade.post('/buscar-id-un-desc',{
          id: arraySupermecado, 
          descricao: valueText,
          //filtro: props.route.params.filtro,
        })
        //console.log('setDataServiceprod: ', responseProdutos.data)
        //console.log(response.data.length)
        //console.log(responseProdutos.data)
        if (responseProdutos.data.status === 0) {
          console.log('ENTROU AQUIIIIIIIIIii')
          SetVerificacaoMenssagem(true)
          return await setDataServiceprod(responseProdutos.data)
        }
        if (responseProdutos.data.length === 0) {
          const result = {error: false, status: 'vazio', message: 'Produto não encontrado'}
          //console.log(result)
          return await setDataServiceprod(result)
        } else {
          SetVerificacaoMenssagem(true)
          return await setDataServiceprod(responseProdutos.data)
        }  
      }

      if(!keyboardd.keyboardShown) {
        console.log('O QUE ESTA NO VALUE MERCADOPESQUISA: ', valueText)
        if(valueText) {
          console.log('CHAMA FUNCAO PESQUISAR PRODUTO MERCADOPESQUISA', valueText)
          pesquisaProduto()
          
          setValueText('');
        }
      }
    });

    async function salvarProduto(objProduto, userId, descricao, item) {

      if (userId === null) {
        console.log('É NULL userId: ',userId)

        Alert.alert(
          'Atenção',
          `Você precisa logar para adicionar produto na lista.`,
          [{ text: 'Voltar', onPress: () => console.log('cancelou para não criar conta') , 
              cancelable: true,
          },
          { text: 'Entrar', onPress: () => navigation.navigate('LogarCriarConta') },
          ],
        )


      } else {
        const resultUserId = await Storage.buscarUserLogin('value');
        setUserId(resultUserId)
        console.log('userId:::: ',  resultUserId)
        const responseLista = await ServiceListaUser.post('/findlistaall', {
          "id_user": resultUserId
        })
        if (responseLista.data.status === 0) {
          Alert.alert(
            'Atenção',
            `${responseLista.data.message} Você precisa criar uma lista.`,
            [{ text: 'Voltar', onPress: () => console.log('cancelou a criação da lista') , 
                cancelable: true,
            },
            { text: 'Criar', onPress: () => navigation.navigate('MinhasLista') },
            ],
          )
        } else if (responseLista.data.status !== 0) {
          console.log('PESQUISA - PELA IMAGEM PESQUISA')
          const resultList = await Storage.buscarUserLogin('lista');
            console.log('resultList:: ', resultList)
            if (resultList === null) {
              console.log('RESULT LIST NULL')
              navigation.navigate('MinhasLista', { userNull: true})
            } else {
              await setObjProdutoEscolhido(item)
              setModalVisibleAddProduto(true)

            }

        }
        

      }
        
    }

    async function cancelarAddProdutoLista() {
      setModalVisibleAddProduto(false)
      await setObjProdutoEscolhido(null)

      setValueQtd("1")
    }
    async function addProdutoLista() {
      //console.log('valueQtd ', valueQtd )
      
      console.log('listaPadraoAdd:::::::::::', listaPadraoAdd)
      //console.log('nameLista-----------------_> ', listaPadraoAdd )
      //console.log('valueQtd ', valueQtd )
      //console.log('========================', objProdutoEscolhido.preco_venda)
      let preco_total = await valueQtd * objProdutoEscolhido.preco_venda;
      console.log('preco_Total::: ', preco_total)
      const responseCreateProdutoLista = await ServiceListaUser.post('/createprodutolista', {
        "id_user": userId,
        "id_produto": objProdutoEscolhido._id,
        "nome_lista": listaPadraoAdd,
        "primeira_lista_true": false,
        "descricao": objProdutoEscolhido.descricao,
        "codigo_barras": objProdutoEscolhido.codigo_barras,
        "preco_venda": objProdutoEscolhido.preco_venda,
        "quantidade": valueQtd,
        "preco_total": preco_total,
        "unidade_medida": objProdutoEscolhido.unidade_medida,
        "categoria": objProdutoEscolhido.categoria,
        "supermecado": objProdutoEscolhido.supermecado._id,
        
      }) 
      
      console.log('responseCreateProdutoLista: ',responseCreateProdutoLista.data)
      if (responseCreateProdutoLista.data.resposta === "Lista de produto criado com sucesso") {
        
        console.log('CAIUCAIUCAIUCAIUCAIUCAIUCAIU')
        Alert.alert(
          'Atenção',
          `Produto ${objProdutoEscolhido.descricao} adicionado com sucesso!`,
          [
          { text: 'OK'},
          ],
        )
      }
      
      setModalVisibleAddProduto(false)
      await setObjProdutoEscolhido(null)
      setValueQtd("1")
    }

    if (objProdutoEscolhido) {
      console.log('objProdutoEscolhido: --> no IF ', objProdutoEscolhido.descricao)
      //console.log('objProdutoEscolhido: ', objProdutoEscolhido)
      return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleAddProduto}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModalVisibleAddProduto(!modalVisibleAddProduto);
        }}
      >
        <View style={stylesCreate.centeredView2}>
          <View style={stylesCreate.modalView2}>
          <Text style={stylesCreate.modalText2}>Adicionar na lista <Text style={{fontWeight: 'bold',color: '#8B80FC'}}>{listaPadraoAdd}</Text></Text>
             <TouchableOpacity style={{width: '100%', backgroundColor: '#8B80FC', borderRadius: 39, 
               flexDirection: 'row', marginTop: '2%'}}>
                  <Image source={require('../../assets/qrcode/qr-code.png')} 
                    style={{width:68, height:70, borderRadius: 19, marginLeft: 15, marginBottom: 15, marginTop: 15, marginRight: 15}}/>

                    <View style={{marginTop: 15, width: '70%'}}>
                      <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold', width: '90%' }}>{objProdutoEscolhido.descricao} {objProdutoEscolhido.unidade_medida}</Text>
                      <Text style={{color: '#000', fontSize: 10, fontWeight: 'bold' }}>{objProdutoEscolhido.supermecado.nome_fantasia}</Text>
                      <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>R$ {objProdutoEscolhido.preco_venda}</Text>
                    </View>

            </TouchableOpacity>

            
            <View style={{flexDirection:'row', justifyContent: 'space-around', width: '100%',}}>
            <Text style={{color: '#000', marginTop: '10%'}}>Quantidade:</Text>
            <TextInput
                style={{width: 70 ,height: 50,
                  backgroundColor: '#D9D7DB', borderRadius: 20, fontSize: 30, margin: 10, padding: 10, }}
                  placeholder=""
                  multiline={false}
                  keyboardType='number-pad'
                  value={valueQtd}
                  onChangeText={valueQtd => setValueQtd(valueQtd)}
              /> 
            </View>
         
            <View style={{width: '80%' ,flexDirection: 'row', justifyContent: 'space-around'}}>
            <Pressable
                style={[stylesCreate.button, stylesCreate.buttonClose]}
                onPress={() => cancelarAddProdutoLista()}
              >
                <Text style={stylesCreate.textStyle}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[stylesCreate.button, stylesCreate.buttonClose]}
                onPress={() => addProdutoLista()}
              >
                <Text style={stylesCreate.textStyle}>Adicionar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      )
    }

    return (
        <View style={styles.container}>
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

          <View style={{ height: '86%', alignItems: 'center', }}>

                {dataServiceprod?.status === 'vazio' &&
                  <Text style={{fontWeight: '700', fontSize: 20}}>{dataServiceprod.message}</Text>
                  
                }
                {dataServiceprod?.status === 0 &&
                  <Text style={{fontWeight: '700', fontSize: 20, margin: '5%'}}>{dataServiceprod.message}</Text>

                }


                {!valueText && !verificacaoMenssagem && 
                  <View style={{justifyContent:'center', alignItems: 'center', marginTop: '10%'}}>
                  <Text style={{fontSize: 17, fontStyle: 'italic' }}>Você precisa pesquisar o produto</Text>
                  <Text style={{fontSize: 17, fontStyle: 'italic' }}>Para adicionar na sua lista.</Text>
                  </View>
                }
              

                <FlatList
                    data={dataServiceprod}
                    keyExtractor={(item) => item?._id}
                    style={{width: '90%', height: '100%', borderTopColor: '#EBE8EA', borderTopWidth: 2, }}
                    showsVerticalScrollIndicator ={false}
                    renderItem={({ item }) => (
                        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <TouchableOpacity style={{width: '80%', backgroundColor: '#8B80FC', borderRadius: 39, 
                        flexDirection: 'row', marginTop: '3%'}}>
                            <Image source={require('../../assets/qrcode/qr-code.png')} 
                        style={{width:68, height:70, borderRadius: 19, marginLeft: 15, marginBottom: 15, marginTop: 15, marginRight: 15}}/>

                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold', width: '90%' }}>{item?.descricao}</Text>
                            <Text style={{color: '#000', fontSize: 10, fontWeight: 'bold' }}>{item.supermecado?.nome_fantasia}</Text>
                            <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>R$ {item?.preco_venda}</Text>
                        </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={{marginTop: '8%'}} 
                        onPress={() => salvarProduto(dataServiceprod, userId, item?.descricao, item )} >
                            <Icon name="playlist-plus" color={'#000'} size={30} style={{//width:68, height:70, 
                            borderRadius: 19, marginLeft: 15, 
                            marginBottom: 15, marginTop: 15, marginRight: 15}} />

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
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    centeredView2: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 0,
      height: 20,
      flex: 1,backgroundColor: '#8B80FC', height: '100%'
      
    },
    modalView: {
      margin: 20,
      backgroundColor: "#E5E5E5",
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
      backgroundColor: "white",
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
    buttonOpen: {
      backgroundColor: "#8B80FC",
    },
    buttonClose: {
      backgroundColor: "#8B80FC",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 18,
      textAlign: "center",
      fontSize: 15,
      color: '#8B80FC'
    },
    modalText2: {
      marginBottom: 18,
      textAlign: "center",
      fontSize: 15,
      color: '#383838'
    }
  });

/*

 <TouchableOpacity style={{width: '65%', backgroundColor: '#8B80FC', borderRadius: 39, 
                        flexDirection: 'row', marginTop: '3%'}}>
                            <Image source={require('../../assets/qrcode/qr-code.png')} 
                        style={{width:68, height:70, borderRadius: 19, marginLeft: 15, marginBottom: 15, marginTop: 15, marginRight: 15}}/>

                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#FFF', fontSize: 14, fontWeight: 'bold', width: '90%' }}>{item.descricao}</Text>
                            <Text style={{color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>{item.supermecado.nome_fantasia}</Text>
                            <Text style={{color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>R$ {item.preco_venda}</Text>
                        </View>

                        <TouchableOpacity style={{width: '30%', backgroundColor: '#7a6ef5', borderRadius: 39, 
                        flexDirection: 'row', }}>
                            <Icon name="playlist-plus" color={'#FFF'} size={60} style={{//width:68, height:70, 
                            borderRadius: 19, marginLeft: 15, 
                            marginBottom: 15, marginTop: 15, marginRight: 15}} />
                        

                        </TouchableOpacity>

                        </TouchableOpacity>












  <TouchableOpacity style={{width: '85%', backgroundColor: '#8B80FC', borderRadius: 39, 
                    flexDirection: 'row', marginTop: '3%'}} onPress={() => navigation.navigate('ProdutoEscolhido')}>

                </TouchableOpacity>


<TouchableOpacity style={{width: '85%', backgroundColor: '#8B80FC', borderRadius: 39, 
                    flexDirection: 'row', marginTop: '3%'}} onPress={() => navigation.navigate('ProdutoEscolhido')}>
                        <Image source={require('../../assets/qrcode/qr-code.png')} 
                        style={{width:68, height:70, borderRadius: 19, marginLeft: 15, marginBottom: 15, marginTop: 15, marginRight: 15}}/>

                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>Leite Itambé</Text>
                            <Text style={{color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>Dia LTDA 5.6km</Text>
                            <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>R$ 5,90</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: '85%', backgroundColor: '#8B80FC', borderRadius: 39, 
                    flexDirection: 'row', marginTop: '3%'}}>
                        <Image source={require('../../assets/qrcode/qr-code.png')} 
                        style={{width:68, height:70, borderRadius: 19, marginLeft: 15, marginBottom: 15, marginTop: 15, marginRight: 15}}/>

                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>Leite Itambé</Text>
                            <Text style={{color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>Dia LTDA 5.6km</Text>
                            <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>R$ 5,90</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: '85%', backgroundColor: '#8B80FC', borderRadius: 39, 
                    flexDirection: 'row', marginTop: '3%'}}>
                        <Image source={require('../../assets/qrcode/qr-code.png')} 
                        style={{width:68, height:70, borderRadius: 19, marginLeft: 15, marginBottom: 15, marginTop: 15, marginRight: 15}}/>

                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>Leite Itambé</Text>
                            <Text style={{color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>Dia LTDA 5.6km</Text>
                            <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>R$ 5,90</Text>
                        </View>
                    </TouchableOpacity>


















----------------
<Text>MINHA PESQUISA</Text>

                <Button
                title="Ir para Homee"
                onPress={() => {
                    navigation.navigate('Home')
                }}/>



                <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={stylesCreate.centeredView}>
          <View style={stylesCreate.modalView}>
            <Text style={stylesCreate.modalText}>Hello World!</Text>
            <Pressable
              style={[stylesCreate.button, stylesCreate.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={stylesCreate.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[stylesCreate.button, stylesCreate.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={stylesCreate.textStyle}>Show Modal</Text>
      </Pressable>


*/