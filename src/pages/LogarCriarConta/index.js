import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground,Linking, Button, StyleSheet, TouchableOpacity, Image, FlatList,Modal, Pressable, Picker, DrawerLayoutAndroidBase, RecyclerViewBackedScrollViewBase} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import servicesSupIdDescProdUnidade from '../../services/servicesSupIdDescProdUnidade'
import serviceUser from '../../services/serviceUser'
import ServiceListaUser from '../../services/listaUser'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Octicons, Fontisto } from '@expo/vector-icons';

import styles from './styles';

export default function LogarCriarConta(props) {
    //console.log('props.route: ', props.route.params.codigo_barras)
    const navigation = useNavigation();
    const [valueEmail ,setValueEmail] = useState(null)
    const [valuePassword ,setValuePassword] = useState(null)

    const [userId, setUserId] = useState()
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
        if (props.route.params.arraySupermecado) {
            id = props.route.params.arraySupermecado;
            //loadSupProduto(id, props.route.params.codigo_barras )
        } else {
            id = props.route.params.supermecadoId
            //loadSupProduto(id, props.route.params.codigo_barras)
        }

    }, []);

  /*  function FuncaoLogin() {
// valueEmail /  valuePassword
        console.log('PASSOU AQUI')
        if (valueEmail === "") {

            return (
                <View>
                    <Text>E-mail vazio</Text>
                </View>
            )
        }


    } */


    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>

            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity style={{display: 'flex', alignSelf: 'center', width: '85%', height: '13%', marginBottom: '2%'}}>
                <ImageBackground source={require('../../assets/mercado/mercado.png')} style={styles.image}>
                <Text style={styles.text}>Logo Ex</Text>
                </ImageBackground>
                </TouchableOpacity>

                
            </View >


            <View style={{marginTop: '30%'}}>
            <View style={{paddingLeft: 5,backgroundColor: '#D9D7DB', alignItems: 'center', flexDirection: 'row',  width: '90%', height: 50, borderRadius: 8}}>
            <Octicons name="mail" size={30} color="#6D28D9" />
            <TextInput
                style={{height: 50, margin: 12, padding: 10, width: '85%',borderTopLeftRadius: 8,borderBottomLeftRadius: 8,padding: 7,
                  backgroundColor: '#D9D7DB', borderRadius: 20, fontSize: 17}}
                  placeholder="Inserir seu email"
                  multiline={false}
                  value={valueEmail}
                  onChangeText={valueEmail => setValueEmail(valueEmail)}
              />
            </View>


            <View style={{marginTop: '3%'}}>
            </View>
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

                <TouchableOpacity style={{ marginTop: '15%',padding: 15, backgroundColor: '#6D28D9', justifyContent: 'center', alignItems: 'center',
                    borderRadius: 5, marginVertical: 5, height: 60}}  >
                    <Text style={{fontSize: 16, padding: 25, color: '#ffffff'}}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: '3%',flexDirection: 'row', justifyContent: 'center',padding: 15, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center',
                    borderRadius: 5, marginVertical: 5, height: 60}} >
                    <Fontisto name="google" size={25} color="#ffffff" />
                    <Text style={{fontSize: 16, padding: 25, color: '#ffffff'}}>Login com Goole</Text>
                </TouchableOpacity>
                
                
                <View style={{borderEndColor: 'black', borderTopWidth: 1, marginTop: '5%',flexDirection: 'row' ,justifyContent: 'center', alignItems: 'center', fontSize: 15}}>
                    <Text style={{justifyContent: 'center', alignItems: 'center', fontSize: 15, marginTop: '5%'}}>
                        Ainda não tem uma conta?</Text>

                        <Text style={{color: 'blue', justifyContent: 'center', alignItems: 'center', marginTop: '5%'}}
                            onPress={() => navigation.navigate('CriarConta')}>
                        <Text style={{fontSize: 15}}> Signup</Text>
                        </Text>
                </View>

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