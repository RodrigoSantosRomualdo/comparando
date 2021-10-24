/*
async function criarLista() {
        console.log('---------------__CHAMOU CRIAR LISTA -------------------------')
        // valueTextSemLista => setValueTextSemLista(valueTextSemLista)
          if (valueTextSemLista === '') {
              console.log('USUARIO NÂO INSERIU NADA')
          } else {
  
              const responseLista = await ServiceListaUser.post('/createlista', {
                "id_user": userId,
                "nome_lista": valueTextSemLista,
                "primeira_lista_true": true
              }) 
  
              console.log('responseLista ', responseLista.data)
              setModalVisibleSemLista(!modalVisibleSemLista)
          }
          
      }


*/


import React, {useEffect, useState} from 'react';
import {View, Text, Alert, Button, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image, FlatList,Modal, Pressable, Picker, DrawerLayoutAndroidBase, RecyclerViewBackedScrollViewBase} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import servicesSupIdDescProdUnidade from '../../services/servicesSupIdDescProdUnidade'
import serviceUser from '../../services/serviceUser'
import ServiceListaUser from '../../services/listaUser'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import Storage from '../../services/Storage';
import * as Location from 'expo-location';
import servicesLocationSup from  '../../services/servicesLocationSup'

export default function PesquisaQrcode(props) {
    console.log('props: ', props.route.params.codigo_barras)

    const navigation = useNavigation();
    const [userId, setUserId] = useState(Storage.buscarUserLogin('value'))
    const [listaPadraoAdd, setListaPadraoAdd] = useState();
    const [supermecadoId, setSupermecadoId] = useState()
    const [supermecadoDistancia, setSupermecadoDistancia] = useState()
    const [modalVisibleKM, setModalVisibleKM] = useState(false);
    
    const [modalVisibleSemLista, setModalVisibleSemLista] = useState(false);
    const [modalVisibleAddProduto, setModalVisibleAddProduto] = useState(false);
    const [valueTextSemLista, setValueTextSemLista] = useState()
    const [valueQtd, setValueQtd] = useState("1")
    const [selectedValue, setSelectedValue] = useState("java");
    const [nameLista, setNameLista] = useState(false)
    const [options, setOptions] = useState(["Home","Savings","Car","GirlFriend"])
    const [objProdutoEscolhido, setObjProdutoEscolhido] = useState(null)
    const [loading, setLoading] = useState(true);
    const [resultProduto, setResultProduto ] = useState()
    const [dataServiceprod, setDataServiceprod ] = useState() 
    const [valueKM, setValueKM] = useState()
 

      useEffect(() => {
        (async () => {
            const listaPadraoAdd = await Storage.buscarListaPadrao('lista')

            const valuesKm = await Storage.buscarKM('valueKM')
            console.log('-------------------->>>> ', valuesKm)
            setValueKM(valuesKm)
            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            //setLocation(location);
            //console.log('Latitude: ',location.coords.latitude)
            //console.log('Longitude: ',location.coords.longitude)      const json = await JSON.stringify({ answer: 42 })
            const responseLocation = await servicesLocationSup.post('/', { coordinates: [location.coords.latitude, location.coords.longitude], maxDistance: valuesKm});
            let date = responseLocation.data;
            
            console.log('date: ',date)
            let arraySupermecado = [];
            let arraySupermecadoDiscancia = [];
            date.map(async function(item) {
            
            await arraySupermecado.push(item._id)
            await arraySupermecadoDiscancia.push(item)
            
            })
            await setSupermecadoId(arraySupermecado)
            await setSupermecadoDistancia(arraySupermecadoDiscancia)

            console.log('arraySupermecado:::: ',arraySupermecado)

            console.log('listaPadraoAddlistaPadraoAddlistaPadraoAddlistaPadraoAdd ', listaPadraoAdd)
            await setListaPadraoAdd(listaPadraoAdd)

            console.log('supermecadoId::::::::::: ', supermecadoId)
            setLoading(false);




           if (arraySupermecado.length === 0) {
              setLoading(false)
              return Alert.alert(
                'Atenção',
                `Não foi possível encontrar supermecados próximos, você precisa alterar o raio de distância.`,
                [
                  { text: 'Ok', onPress: (() => modalKm()) },
                ], )
            } else {
              const response = await servicesSupIdDescProdUnidade.post('/buscar-codigo-barras-findall',{
                codigo_barras: props.route.params?.codigo_barras,
                id: arraySupermecado
            })  
            setLoading(false);
            return await setDataServiceprod(response.data)
          }  

            
            //console.log('useEffect: ',response.data)

             //console.log('FINALIZOU', response.data)
        // TRAZ O E-MAIL OU O TOKEN PARA TRAZER O ID DO USUARIO PARA SALVAR PRODUTOS NA LISTA
            //const responseUser = await serviceUser.post('/finduser', {"email": "rsr@gmail.com"})
        
            //console.log('PRODUTOS: ',response.data )
        
            //console.log('FINALIZOU', response.data )
        
             //console.log('RESPONSE USER: ', responseUser.data[0]._id)
            //setUserId(responseUser.data[0]._id)
            
            //console.log('response.data:::: ', response.data)
            
        })();

      }, [])

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
  
          let arraySupermecado = [];
        let arraySupermecadoDiscancia = [];
        date.map(async function(item) {
          //console.log(item._id)
         //console.log('... ----------------------->',item.location_distance)
         
         await arraySupermecado.push(item._id)
         await arraySupermecadoDiscancia.push(item)
         //await arraySupermecadoDiscancia.push({id: item._id, distancia: item.location_distance})
         navigation.navigate('Scanner')
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

      if (loading) {
        return (
          <View style={styles.containerCenter}>
            <Text style={{ fontSize: 17, fontStyle: 'italic' }}>
              carregando dados...
              </Text>
          </View>
        )
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
          <View style={stylesCreateModal.centeredView}>
            <View style={stylesCreateModal.modalView}>
              <Text style={stylesCreateModal.modalText}>Informe KM entre 1 e 50</Text>
      
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
                  style={[stylesCreateModal.button, stylesCreateModal.buttonClose]}
                  onPress={() => cancelarKM()}
                >
                  <Text style={stylesCreateModal.textStyle}>Cancelar</Text>
                </Pressable>
      
                <Pressable
                  style={[stylesCreateModal.button, stylesCreateModal.buttonClose]}
                  onPress={() => alterarKM()}
                >
                  <Text style={stylesCreateModal.textStyle}>Alterar KM</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      }

      
      async function cancelarAddProdutoLista() {
        setModalVisibleAddProduto(false)
        await setObjProdutoEscolhido(null)
  
        setValueQtd("1")
      }

      let teste = [];
      async function salvarProduto(objProduto, objUser, descricao, item) {
        console.log('CHAMOU O SALVAR PRODUTO')
        if (userId === null) {
          console.log('É NULL  userId: ',userId)
  
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

        //console.log('O QUE VEIO NA DESCRICAO SELECIONADA: ' , descricao)
        //console.log('O QUE VEIO NA item item: ' , item)
        //console.log('O QUE VEIO NA item item: ' , objUser)
        //console.log('O QUE VEIO NA item item: ' , objProduto)
        // objProdutoEscolhido, setObjProdutoEscolhido
       /*   const responseLista = await ServiceListaUser.post('/findlistaall', {
              "id_user": objUser,
          })  
          
          let arraResponseLista = await responseLista.data;
          await setNameLista(arraResponseLista);
          console.log('arraResponseLista: ', arraResponseLista)
          console.log('nameLista: ', nameLista)*/
  
  
          //console.log('objProdutoEscolhido--> ', objProduto)
  
  
          //await setObjProdutoEscolhido(item)
          //teste  = objProduto;
          //await setNameLista(arraResponseLista);
  
          //console.log('------------------------ ', objProdutoEscolhido[0].supermecado.endereco ,'------------------------ ')
          //console.log('------------------------ ', objProdutoEscolhido[0].descricao ,'------------------------ ')
          
          //console.log('teste: ', teste[0].descricao)
          //console.log('objProdutoEscolhidoobjProdutoEscolhidoobjProdutoEscolhidoobjProdutoEscolhido',objProduto)
       /*   if (responseLista.data.status === 0) {
              setModalVisibleSemLista(true);
          } else {
            console.log('ABRIR MODAL DE ADICIONAR PRODUTO NA LISTA')
            setModalVisibleAddProduto(true)
            
  
            // modalVisibleAddProduto, setModalVisibleAddProduto
          }   */
          
          
          /*const responseLista = await ServiceListaUser.post('/createlista', {
              "id_user": '1234',
              "nome_lista": "Nova lista 1",
              "primeira_lista_true": true
          }) */
          // nameLista, setNameLista
          
          //console.log('responseLista',responseLista.data)
         // console.log('objProduto ---> ', objProduto)  objUser._id
         // console.log('objProduto ---> ', objUser)
  
          //setModalVisible(true);
  
          //console.log('responseLista responseLista ',responseLista)
          
      }



      async function addProdutoLista() {
        console.log('valueQtd ', valueQtd )
        console.log('nameLista-----------------_> ', listaPadraoAdd )
        console.log('valueQtd ', valueQtd )
        console.log('========================', objProdutoEscolhido.preco_venda)
        let preco_total = await valueQtd * objProdutoEscolhido.preco_venda;
        console.log('preco_Total::: ', preco_total)
        const responseCreateProdutoLista = await ServiceListaUser.post('/createprodutolista', {
          "id_user": userId,
          "id_produto": objProdutoEscolhido._id,
          "nome_lista":listaPadraoAdd,
          "primeira_lista_true": false,
          "descricao": objProdutoEscolhido.descricao,
          "codigo_barras": objProdutoEscolhido.codigo_barras,
          "preco_venda": objProdutoEscolhido.preco_venda,
          "quantidade": valueQtd,
          "preco_total": preco_total,
          "unidade_medida": objProdutoEscolhido.unidade_medida,
          "categoria": objProdutoEscolhido.categoria,
          "supermecado": objProdutoEscolhido.supermecado._id
        }) 
        
        //console.log('responseCreateProdutoLista: ',responseCreateProdutoLista.data)
        
        console.log('responseCreateProdutoLista: ',responseCreateProdutoLista.data)
      if (responseCreateProdutoLista.data.resposta === "Lista de produto criado com sucesso") {
        
        console.log('CAIU QRCODE')
        Alert.alert(
          'Atenção',
          `Produto ${objProdutoEscolhido.descricao} adicionado com sucesso!`,
          [
          { text: 'OK', onPress: () => navigation.navigate('Scanner') },
          ],
        )
      }


        setModalVisibleAddProduto(false)
        await setObjProdutoEscolhido(null)
        setValueQtd("1")
      }
      
      
      if (objProdutoEscolhido) {
        console.log('objProdutoEscolhido: ', objProdutoEscolhido)
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

                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '5%', height: '10%'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
                        <Ionicons name="chevron-back-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 22, fontWeight: 'normal'}}>{props.route.params?.codigo_barras}</Text>
                    <TouchableOpacity>
                        <Text></Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: '86%', alignItems: 'center', }}>

                <FlatList
                    data={dataServiceprod}
                    keyExtractor={(item) => item?._id}
                    style={{width: '90%', height: '100%', borderTopColor: '#EBE8EA', borderTopWidth: 2, }}
                    showsVerticalScrollIndicator ={false}
                    renderItem={({ item }) => (
                      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                      <TouchableOpacity style={{width: '90%', backgroundColor: '#8B80FC', borderRadius: 39, 
                  flexDirection: 'row', marginTop: '3%'}} onPress={() => salvarProduto(dataServiceprod, userId, item?.descricao, item )}>
                      <Image source={require('../../assets/qrcode/qr-code.png')} 
                  style={{width:68, height:70, borderRadius: 19, marginLeft: 15, marginBottom: 15, marginTop: 15, marginRight: 15}}/>

                    <View style={{marginTop: 15}}>
                        <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold', width: '90%' }}>{item?.descricao}</Text>
                        <Text style={{color: '#000', fontSize: 10, fontWeight: 'bold' }}>{item.supermecado?.nome_fantasia}</Text>
                        <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>R$ {item?.preco_venda}</Text>
                    </View>

                    <View style={{position: 'absolute', marginLeft: '80%', marginTop: '8%'}}>
                    <Icon name="playlist-plus" color={'#000'} size={30} style={{//width:68, height:70, 
                        borderRadius: 19, marginLeft: 15, 
                        marginBottom: 15, marginTop: 15, marginRight: 15}} />
                    </View>
                    

                  </TouchableOpacity>
                 

                  </View>
                        
                    )}
                />

                </View>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleSemLista}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModalVisibleSemLista(!modalVisibleSemLista);
        }}
      >
        <View style={stylesCreate.centeredView}>
          <View style={stylesCreate.modalView}>
            <Text style={stylesCreate.modalText}>Para adicionar produtos você precisa criar uma lista, informe um nome e clique em Criar</Text>

            <TextInput
                style={{width: 200 ,height: 60, margin: 10, padding: 10, 
                  backgroundColor: '#D9D7DB', borderRadius: 20}}
                  placeholder="Criar Lista"
                  multiline={false}
                  value={valueTextSemLista}
                  onChangeText={valueTextSemLista => setValueTextSemLista(valueTextSemLista)}
                  
              />

            
            <View style={{width: '80%' ,flexDirection: 'row', justifyContent: 'space-around'}}>
            <Pressable
                style={[stylesCreate.button, stylesCreate.buttonClose]}
                onPress={() => criarLista()}
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
                
      { // MODAL PARA ADICIONAR PRODUTOS NA LISTA
      //  cancelarAddProdutoLista   addProdutoLista

      }

      {listaPadraoAdd !== false && 
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
                      <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold', width: '90%' }}>{teste.descricao} unidade_medida</Text>
                      <Text style={{color: '#000', fontSize: 10, fontWeight: 'bold' }}>supermecado.nome_fantasia</Text>
                      <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>R$ preco_venda</Text>
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

      }

      
     
        </View>
    )

}

const stylesCreateModal = StyleSheet.create({
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


  <View>
              <Text>COMEÇA AQUI ESSA MERDA DE LISTA</Text>
              {resultProduto &&
                 <FlatList
                 data={resultProduto}
                 keyExtractor={item => item._id}
                 renderItem={({item}) => (
                     <View>
                         <Text>AQUIIIIIIIIIIIiii </Text>
                     </View>
                 )}
               />
               
              
              }
        </View> 
      );

 if (dataServiceprod) {
          return (
        <View style={styles.container}>

                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '5%', height: '10%'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Ionicons name="chevron-back-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 22, fontWeight: 'normal'}}>{resultCodigo.descricao}</Text>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="filter-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={{ height: '86%', alignItems: 'center', }}>

              

                <FlatList
                    data={resultCodigo}
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
                            <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold', width: '90%' }}>{dataServiceprod.codigo_barras}</Text>
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

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleSemLista}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModalVisibleSemLista(!modalVisibleSemLista);
        }}
      >
        <View style={stylesCreate.centeredView}>
          <View style={stylesCreate.modalView}>
            <Text style={stylesCreate.modalText}>Para adicionar produtos você precisa criar uma lista, informe um nome e clique em Criar</Text>

            <TextInput
                style={{width: 200 ,height: 60, margin: 10, padding: 10, 
                  backgroundColor: '#D9D7DB', borderRadius: 20}}
                  placeholder="Criar Lista"
                  multiline={false}
                  value={valueTextSemLista}
                  onChangeText={valueTextSemLista => setValueTextSemLista(valueTextSemLista)}
                  
              />

            
            <View style={{width: '80%' ,flexDirection: 'row', justifyContent: 'space-around'}}>
            <Pressable
                style={[stylesCreate.button, stylesCreate.buttonClose]}
                onPress={() => criarLista()}
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
                
      { // MODAL PARA ADICIONAR PRODUTOS NA LISTA
      //  cancelarAddProdutoLista   addProdutoLista

      }

      {nameLista !== false && 
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
          <Text style={stylesCreate.modalText2}>Adicionar na lista <Text style={{fontWeight: 'bold',color: '#8B80FC'}}>{nameLista[0].nome_lista}</Text></Text>
             <TouchableOpacity style={{width: '100%', backgroundColor: '#8B80FC', borderRadius: 39, 
               flexDirection: 'row', marginTop: '2%'}}>
                  <Image source={require('../../assets/qrcode/qr-code.png')} 
                    style={{width:68, height:70, borderRadius: 19, marginLeft: 15, marginBottom: 15, marginTop: 15, marginRight: 15}}/>

                    <View style={{marginTop: 15, width: '70%'}}>
                      <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold', width: '90%' }}>{teste.descricao} unidade_medida</Text>
                      <Text style={{color: '#000', fontSize: 10, fontWeight: 'bold' }}>supermecado.nome_fantasia</Text>
                      <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>R$ preco_venda</Text>
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

      }

      
     
        </View>
    )

}




















  */