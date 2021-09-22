import React,{useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import ServiceListaUser from '../../services/listaUser'

import styles from './styles'

export default function MinhaListaProduto(props) {
    console.log('props: ', props.route.params)
    const navigation = useNavigation();
    const [mylistProd, setMyListProd] = useState();
    const [userId, setUserId] = useState('6136be273d77ff5c8179eb74')

    async function loadMyLista() {
        console.log('EXECUTOU A PESQUISA DA LISTA')
        const responseMyLista = await ServiceListaUser.post('/findlistprod', {
          "id_user": userId,
          "nome_lista": props.route.params.nameList,
	      "primeira_lista_true": false
        })
        
        if (responseMyLista.data.length === 0) {
            return await setMyListProd(null)
        } else {
            console.log('MY PRODUTOS: ',responseMyLista.data )
            return await setMyListProd(responseMyLista.data)
        }
        
      }

      useEffect(() => {
        console.log('EXECUTOU O USEEFFECT')
        
        loadMyLista()
      
      }, []);

    return (
      <View style={styles.container}>

          <View style={{flexDirection: 'row', justifyContent: 'space-around' ,marginTop: '5%'}}>
            
            <Text style={{color: '#040E2C',fontWeight: 'bold', fontSize: 20,  }}>{props.route.params?.nameList}</Text>

            <TouchableOpacity>
                <MaterialCommunityIcons name="filter-outline" size={24} color="black" />

            </TouchableOpacity>
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
                        <TouchableOpacity style={{width: '50%', backgroundColor: '#8B80FC', borderRadius: 39, justifyContent: 'center', alignItems: 'center'  , }}>
                        
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