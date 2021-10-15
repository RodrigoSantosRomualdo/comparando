import React, {useEffect, useState} from 'react';
import {View, Text,Alert, ImageBackground, ActivityIndicator, Linking, Button, StyleSheet, TouchableOpacity, Image, FlatList,Modal, Pressable, Picker, DrawerLayoutAndroidBase, RecyclerViewBackedScrollViewBase} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useKeyboard } from '@react-native-community/hooks'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import servicesSupIdDescProdUnidade from '../../services/servicesSupIdDescProdUnidade'
import serviceUser from '../../services/serviceUser'
import ServiceListaUser from '../../services/listaUser'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Octicons, Fontisto } from '@expo/vector-icons';
import sistemaUsuario from '../../services/sistemaUsuario';
import * as Google from 'expo-google-app-auth'
import Storage from '../../services/Storage'

import styles from './styles';

export default function LogarCriarConta(props) {
    console.log('LogarCriarConta props.route: ', props.route)
    const navigation = useNavigation();
    const [valueEmail ,setValueEmail] = useState('')
    const [valuePassword ,setValuePassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [userId, setUserId] = useState(null)
    const [userIdExiste, setUserIdExiste] = useState(false)
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
  /*  async function retornoPagesLista() {
      console.log('EXECUTOU ISSO AQUI retornoPagesLista')
      navigation.navigate('MinhasLista', 'valueEmail');
    } */

    useEffect(() => {
      console.log('EXECUTOU ISSO AQUI EFFECT')
      //retornoPagesLista()
      
    }, []); 

   

    async function funcaoLogin() {
      setIsSubmitting(true)
// valueEmail /  valuePassword
        console.log('PASSOU AQUI')
        if (valueEmail === "" && valuePassword === "") {
            console.log('Campos E-mail e senha estão vazios')
            setIsSubmitting(false)
            return Alert.alert(
                //title
                'Error',
                //body
                `Campos E-mail e senha estão vazios`,
                [
                  {
                    text: 'Tentar Logar Novamente',
                  },
                ],
            )
        }
        else if (valueEmail === "") {
            console.log('Campos E-mail vazio')
            setIsSubmitting(false)
            return Alert.alert(
                //title
                'Error',
                //body
                `Campos E-mail vazio`,
                [
                  {
                    text: 'Tentar Logar Novamente',
                  },
                ],
            )
        }
        else if (valuePassword === "") {
            console.log('Campos senha vazio')
            setIsSubmitting(false)
            return Alert.alert(
                //title
                'Error',
                //body
                `Campos Senha Vazio`,
                [
                  {
                    text: 'Tentar Logar Novamente',
                  },
                ],
            )
        } else {
            console.log('VERIFICAR E-MAIL e SENHA PARA VALIDAÇÃO')
            const data = await sistemaUsuario.post('/signin', {
                email: valueEmail,
                password: valuePassword
            })
            console.log(data.status)
            console.log(data.data.status)
            if(data.data.status === "FAILED") {
              setErroLogin(true) 
              setIsSubmitting(false)
            }
            
            
            if(data.status === 200 && data.data.status === "SUCCESS" ) {
                //Storage.armazenarUserLogin('value', valueEmail)
                
                Storage.armazenarUserLogin('value', email )

                console.log('RESET 1')
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'MinhasLista',
                      params: { email: email },
                    },
                  ],
                })
                // DEPOIS DE BUILD NAO VOLTAR PARA O HOMER SO MEXER AQUI

                //navigation.navigate('MinhasLista', valueEmail);
                setIsSubmitting(false)
            }
            
        }
        

    } 

    const keyboardd = useKeyboard()
    console.log('keyboard isKeyboardShow CONTA: ', keyboardd.keyboardShown)

    async function persistLogin(email, name, photoUrl) {
      console.log('CHAMOU A FUNCAO AQUI')
      console.log(email, name, photoUrl)

      
    const data = await sistemaUsuario.post('/finduser', {
      email: email,
    })
    //console.log('datadata: ', data.data.data[0].email)
    if(data.data.data[0]) {
      console.log('datadata: ', email)
      Storage.armazenarUserLogin('value', email )
      //navigation.navigate('MinhasLista', email)
      console.log('RESET 2')
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'MinhasLista',
            params: { email: email },
          },
        ],
      })
    } else if (!data.data.data[0]) {
      console.log('datadata NAO TEM USUARIO: ', email )
      const data = await sistemaUsuario.post('/create-user-email', {
        email: email,
        outro_sistema_login: true,
        password: 'QUALQUER-PARA-PASSAR-NA-API@#$!1234567890@#$**************!@#(*Y(Y*YYGG&*G*G&7&%&&E%DDDbbhbbdhvbsdbvnslvnsdvnsinvivçinsviboiboçubdvçouboçvbsubvçobozbvosbovosbvosbvobsozvbszbvosbvobsuovoso8h082h0h80h0e9whvhv8zsvçhs0vh0hvz0çwh08gh0gha80whg80hag08hghspghpsp\ghpahg0&T&GCIYGYIVCDG*g8yvd8cv8sd><><><l,lmçlmLKNKNLNLN'
      })
      console.log('data:::: ', data.data.error)
      if (data.data.error === false) {
        Storage.armazenarUserLogin('value', email )
        //navigation.navigate('MinhasLista', email )
        console.log('RESET 3')
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'MinhasLista',
              params: { email: email },
            },
          ],
        })
      } else {
        console.log('CAIU AQUI NO ALERT 01')
        return Alert.alert(
          //title
          'Error',
          //body
          `Não foi possível logar, tente de outra forma`,
          [
            {
              text: 'Tentar Novamente',
            },
          ],
      )
      }
    }
      
    }

    const landleGoogleSignin = () => {
      const config = { 
        androidClientId:`585954713470-qv8pue4nt7mt87d1fv72gub1eu4s154t.apps.googleusercontent.com`,
        scopes: [`profile`,`email`]
      };

      Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type == 'success') {
          const { email, name, photoUrl } = user;
          
        //console.log('datadata: ', data)
         // console.log(email, ' ', name,' ', photoUrl,  'Google signin successful', 'SUCCESS')
          //persistLogin({ email, name, photoUrl }, 'Google signin successful', 'SUCCESS');
          persistLogin(email, name, photoUrl)
        } else {
          //handleMessage('Google Signin was cancelled');
          console.log('Google Signin was cancelled')
        }
        //setGoogleSubmitting(false);
      })
      .catch((error) => {
        //handleMessage('An error occurred. Check your network and try again');
        console.log('An error occurred. Check your network and try again')
        console.log(error);
        //setGoogleSubmitting(false);
      });

    

  }

  
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>

        <View>
          {keyboardd.keyboardShown && 
          <Image
          style={{
            resizeMode: "contain",
            marginTop: '20%',
            height: 110,
            width: 120
          }}
          source={require("../../assets/img-login.png")}
        />}

          {!keyboardd.keyboardShown && 
          <Image
          style={{
            resizeMode: "contain",
            height: 200,
            width: 300
          }}
          source={require("../../assets/img-login.png")}
        />}
          
          
        
        </View>
       
        
          <View style={{ marginTop: '20%'}}>
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
          {erroLogin && (
                <View style={{justifyContent: 'center', alignItems: 'center', }}>
                  <Text style={{ fontSize: 15, fontStyle: 'italic', color: 'red'}}>
                  <Text style={{fontWeight: 'bold'}}>E-mail</Text> ou <Text style={{fontWeight: 'bold'}}>Senha</Text> incorretos tente novamente.
                  </Text>
                  </View>
              )}
              
              {!isSubmitting && (
                <TouchableOpacity style={{marginTop: '10%',padding: 15, backgroundColor: '#6D28D9', justifyContent: 'center', alignItems: 'center',
                borderRadius: 5, marginVertical: 5, height: 60}} onPress={() => funcaoLogin()}  >
                <Text style={{fontSize: 16, padding: 25, color: '#ffffff'}}>Login</Text>
                </TouchableOpacity>
              )}
              {isSubmitting && (
                <TouchableOpacity style={{marginTop: '15%', padding: 15, backgroundColor: '#6D28D9', justifyContent: 'center', alignItems: 'center',
                borderRadius: 5, marginVertical: 5, height: 60}} onPress={() => funcaoLogin()}  >
                <ActivityIndicator size="large" color="#ffffff" />
                </TouchableOpacity>
              )}
              

              <TouchableOpacity style={{marginTop: '3%',flexDirection: 'row', justifyContent: 'center',padding: 15, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center',
                  borderRadius: 5, marginVertical: 5, height: 60}} onPress={landleGoogleSignin} >
                  <Fontisto name="google" size={25} color="#ffffff" />
                  <Text style={{fontSize: 16, padding: 25, color: '#ffffff'}}>Login com Google</Text>
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

/*
<View style={{backgroundColor: 'red', marginTop: '3%',justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
              <TouchableOpacity style={{display: 'flex', alignSelf: 'center', width: '85%', height: '25%', marginBottom: '0%',
             alignItems: 'center'}}>
              <ImageBackground source={require('../../assets/img-login.png')} style={styles.image}>
              </ImageBackground>
              </TouchableOpacity>

              
          </View >


*/


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