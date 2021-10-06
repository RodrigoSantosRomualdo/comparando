import React, {useEffect, useState} from 'react';
import {View, Alert, Text, ImageBackground,Linking, Button, StyleSheet, TouchableOpacity, Image, FlatList,Modal, Pressable, Picker, DrawerLayoutAndroidBase, RecyclerViewBackedScrollViewBase} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import sistemaUsuario from '../../services/sistemaUsuario';
import Storage from '../../services/Storage';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import servicesSupIdDescProdUnidade from '../../services/servicesSupIdDescProdUnidade'
import serviceUser from '../../services/serviceUser'
import ServiceListaUser from '../../services/listaUser'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Octicons, Fontisto } from '@expo/vector-icons';

import styles from './styles';

export default function CriarConta(props) {
    //console.log('props.route: ', props.route.params.codigo_barras)
    const navigation = useNavigation();
    const [valueEmail ,setValueEmail] = useState('')
    const [valuePassword ,setValuePassword] = useState('')
    const [valuePasswordConfirmacao ,setValuePasswordConfirmacao] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [userId, setUserId] = useState()
    const [erroLogin, setErroLogin] = useState(false)

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
    //console.log(props.route.params)

      // TRAZ O E-MAIL OU O TOKEN PARA TRAZER O ID DO USUARIO PARA SALVAR PRODUTOS NA LISTA
    
    //console.log('-->> ', dataServiceprod)
    useEffect(() => {
        let id;
       

    }, []);

    // valuePasswordConfirmacao ,setValuePasswordConfirmacao
    async function criandoConta() {

      if (valueEmail === "") {
        return Alert.alert('Error', `Campos E-mail vazio.`,
          [{ text: 'Tentar Criar Novamente', },], )
      }
      else if (valuePassword === "" || valuePasswordConfirmacao === "") {
        return Alert.alert('Error', `Algum campo da senha está vazio.`,
          [{ text: 'Tentar Criar Novamente', },], )
      }
      else if (valuePassword !== valuePasswordConfirmacao) {
        return Alert.alert('Error', `O campo senha e confirmação de senha estão diferentes.`,
          [{ text: 'Tentar Criar Novamente', },], )
      } else if (valueEmail != "" && valuePassword === valuePasswordConfirmacao) {
        console.log('PASSOU AQUI GUERREIRO')
        const data = await sistemaUsuario.post('/signup', {
          email: valueEmail,
          password: valuePassword
        })
        if (data.data.status === 'FAILED') {
          console.log('data: ', data.data)
          return Alert.alert('Error', `${data.data.message}`,
          [{ text: 'Tentar Criar Novamente', },], )

        }  else if (data.data.status === 'SUCCESS') {
          //(data.data.status === 'FAILED')
          console.log('data.data.status ',data.data.data.email)
          let email = data.data.data.email;
          console.log('email: ', email)
          await Storage.armazenarUserLogin('value', email)
          await Storage.buscarUserLogin('value')
          
          //navigation.navigate('MinhasLista', {});
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'MinhasLista',
                params: { email: email },
              },
            ],
          })
        }
        

      }





      }

    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>

            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity style={{display: 'flex', alignSelf: 'center', width: '85%', height: '13%', marginBottom: '2%'}}>
                <ImageBackground source={require('../../assets/mercado/mercado.png')} style={styles.image}>
                <Text style={styles.text}>Logo Ex</Text>
                </ImageBackground>
                </TouchableOpacity>
                
            </View >
            <Text style={{marginTop: '10%'}}>Criar Conta</Text>

            

            <View style={{marginTop: '10%'}}>
              <Text>Endereço E-mail</Text>
              <View style={{paddingLeft: 5,backgroundColor: '#D9D7DB', alignItems: 'center', flexDirection: 'row',  width: '90%', height: 50, borderRadius: 8}}>
              <Octicons name="mail" size={30} color="#6D28D9" />
              <TextInput
                  style={{height: 50, margin: 12, padding: 10, width: '85%',borderTopLeftRadius: 8,borderBottomLeftRadius: 8,padding: 7,
                    backgroundColor: '#D9D7DB', borderRadius: 20, fontSize: 17}}
                    placeholder="Inserir seu email"
                    autoCapitalize = 'none'
                    multiline={false}
                    value={valueEmail}
                    onChangeText={valueEmail => setValueEmail(valueEmail)}
                />
              </View>
            </View>

            <View style={{marginTop: '7%'}}>
              <Text>Senha</Text>
              <View style={{paddingLeft: 5,backgroundColor: '#D9D7DB', alignItems: 'center', flexDirection: 'row',  width: '90%', height: 50, borderRadius: 8}}>
              <Octicons name="lock" size={30} color="#6D28D9" />

              <TextInput
                      style={{height: 50, margin: 12, padding: 10, width: '85%',borderTopLeftRadius: 8,borderBottomLeftRadius: 8,padding: 7,
                      backgroundColor: '#D9D7DB', borderRadius: 20}}
                      isPassword={true}
                      placeholder="* * * * * * * *"
                      multiline={false}
                      secureTextEntry={true}
                      value={valuePassword}
                      onChangeText={valuePassword => setValuePassword(valuePassword)}
                  />
              </View>
            </View>

            <View style={{marginTop: '3%'}}>
              <Text>Confirmar Senha</Text>
              <View style={{paddingLeft: 5,backgroundColor: '#D9D7DB', alignItems: 'center', flexDirection: 'row',  width: '90%', height: 50, borderRadius: 8}}>
              <Octicons name="lock" size={30} color="#6D28D9" />

              <TextInput
                      style={{height: 50, margin: 12, padding: 10, width: '85%',borderTopLeftRadius: 8,borderBottomLeftRadius: 8,padding: 7,
                      backgroundColor: '#D9D7DB', borderRadius: 20}}
                      isPassword={true}
                      placeholder="* * * * * * * *"
                      multiline={false}
                      secureTextEntry={true}
                      value={valuePasswordConfirmacao}
                      onChangeText={valuePasswordConfirmacao => setValuePasswordConfirmacao(valuePasswordConfirmacao)}
                  />
              </View>
            </View>

            <View style={{width: '90%', borderEndColor: 'black', borderBottomWidth: 1}}>
                <TouchableOpacity style={{marginTop: '15%',padding: 15, backgroundColor: '#6D28D9', justifyContent: 'center', alignItems: 'center',
                    borderRadius: 5, marginVertical: 5, height: 60, marginBottom: '5%'}} onPress={() => criandoConta()} >
                    <Text style={{fontSize: 16, padding: 25, color: '#ffffff'}}>Criar Conta</Text>
                </TouchableOpacity>

             </View>

             <View style={{marginTop: '5%',flexDirection: 'row' ,justifyContent: 'center', alignItems: 'center', fontSize: 15}}>
                    <Text style={{justifyContent: 'center', alignItems: 'center', fontSize: 15}}>
                        Já tem conta?</Text>

                        <Text style={{color: 'blue', justifyContent: 'center', alignItems: 'center'}}
                            onPress={() => navigation.navigate('LogarCriarConta')}>
                        <Text style={{fontSize: 15}}> Login</Text>
                        </Text>
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