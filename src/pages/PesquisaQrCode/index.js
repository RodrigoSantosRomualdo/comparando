import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image, FlatList,Modal, Pressable, Picker, DrawerLayoutAndroidBase, RecyclerViewBackedScrollViewBase} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import servicesSupIdDescProdUnidade from '../../services/servicesSupIdDescProdUnidade'
import serviceUser from '../../services/serviceUser'
import ServiceListaUser from '../../services/listaUser'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

export default function PesquisaQrcode(props) {

    const navigation = useNavigation();
    const [userId, setUserId] = useState()
    
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
 

      useEffect(() => {
        (async () => {
            const response = await servicesSupIdDescProdUnidade.post('/buscar-codigo-barras-findall',{
                codigo_barras: '7899090162933', 
            })
            console.log('useEffect: ',response.data)

             //console.log('FINALIZOU', response.data)
        // TRAZ O E-MAIL OU O TOKEN PARA TRAZER O ID DO USUARIO PARA SALVAR PRODUTOS NA LISTA
            const responseUser = await serviceUser.post('/finduser', {"email": "rsr@gmail.com"})
        
            console.log('PRODUTOS: ',response.data )
        
            //console.log('FINALIZOU', response.data )
        
             //console.log('RESPONSE USER: ', responseUser.data[0]._id)
            setUserId(responseUser.data[0]._id)
            setLoading(false);
            return await setDataServiceprod(response.data)
            //console.log('response.data:::: ', response.data)
            
        })();

      }, [])

      if (loading) {
        return (
          <View style={styles.container}>
            <Text style={{ fontSize: 17, fontStyle: 'italic' }}>
              carregando dados...
              </Text>
          </View>
        )
      }

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
      async function cancelarAddProdutoLista() {
        setModalVisibleAddProduto(false)
        await setObjProdutoEscolhido(null)
  
        setValueQtd("1")
      }
      async function addProdutoLista() {
        console.log('valueQtd ', valueQtd )
        console.log('nameLista-----------------_> ', nameLista[0].nome_lista )
        console.log('valueQtd ', valueQtd )
        console.log('========================', objProdutoEscolhido.preco_venda)
        const responseCreateProdutoLista = await ServiceListaUser.post('/createprodutolista', {
          "id_user": userId,
          "id_produto": objProdutoEscolhido._id,
          "nome_lista": nameLista[0].nome_lista,
          "primeira_lista_true": false,
          "descricao": objProdutoEscolhido.descricao,
          "codigo_barras": objProdutoEscolhido.codigo_barras,
          "preco_venda": objProdutoEscolhido.preco_venda,
          "quantidade": valueQtd,
          "unidade_medida": objProdutoEscolhido.unidade_medida,
          "categoria": objProdutoEscolhido.categoria,
          "supermecado": objProdutoEscolhido.supermecado._id
        }) 
        
        //console.log('responseCreateProdutoLista: ',responseCreateProdutoLista.data)
        
        setModalVisibleAddProduto(false)
        await setObjProdutoEscolhido(null)
  
  
  
  
        setValueQtd("1")
      }
      let teste = [];
      async function salvarProduto(objProduto, objUser, descricao, item) {
        console.log('O QUE VEIO NA DESCRICAO SELECIONADA: ' , descricao)
        console.log('O QUE VEIO NA item item: ' , item)
        // objProdutoEscolhido, setObjProdutoEscolhido
          const responseLista = await ServiceListaUser.post('/findlistaall', {
              "id_user": objUser,
          })
          
          let arraResponseLista = await responseLista.data;
          await setNameLista(arraResponseLista);
          console.log('arraResponseLista: ', arraResponseLista)
          console.log('nameLista: ', nameLista)
  
  
          //console.log('objProdutoEscolhido--> ', objProduto)
  
  
          await setObjProdutoEscolhido(item)
          //teste  = objProduto;
          //await setNameLista(arraResponseLista);
  
          //console.log('------------------------ ', objProdutoEscolhido[0].supermecado.endereco ,'------------------------ ')
          //console.log('------------------------ ', objProdutoEscolhido[0].descricao ,'------------------------ ')
          
          //console.log('teste: ', teste[0].descricao)
          //console.log('objProdutoEscolhidoobjProdutoEscolhidoobjProdutoEscolhidoobjProdutoEscolhido',objProduto)
          if (responseLista.data.status === 0) {
              setModalVisibleSemLista(true);
          } else {
            console.log('ABRIR MODAL DE ADICIONAR PRODUTO NA LISTA')
            setModalVisibleAddProduto(true)
            
  
            // modalVisibleAddProduto, setModalVisibleAddProduto
          }
          
          
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
      
      if (objProdutoEscolhido) {
        console.log('objProdutoEscolhido: ', objProdutoEscolhido)
        //console.log('objProdutoEscolhido: ', objProdutoEscolhido)
        return (
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleAddProduto}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
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
                        <MaterialCommunityIcons name="filter-outline" size={24} color="black" />
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
          Alert.alert("Modal has been closed.");
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
          Alert.alert("Modal has been closed.");
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
          Alert.alert("Modal has been closed.");
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
          Alert.alert("Modal has been closed.");
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