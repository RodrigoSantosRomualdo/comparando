import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Updates } from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SvgUri } from 'react-native-svg';
import Storage from '../../services/Storage'
import {Restart} from 'fiction-expo-restart';

export default function ConfigButton() {

  async function mostraMenu() {
    console.log('CLICOU NO MENU')

    Storage.deletarListaPadrao('lista')
    
    Storage.removeUserLogin('value')

    Restart();
    //await Updates.reloadAsync()
  }

  /*const deleteUserLogin = async (chave) => {
    await AsyncStorageUsuario.removeItem(chave)
    console.log('DELETE STORAGE MENU: ')
  } */

    return (
        <TouchableOpacity onPress={() => mostraMenu()}>
            <SvgUri
              width="70"
              height="40"
              uri="https://msmultisistema.com/config.svg"
            />
        </TouchableOpacity>

      
    )
  }

  /*
<SvgUri
              width="70"
              height="40"
              uri="https://msmultisistema.com/config.svg"
            />



<View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <Icon name="map-marker-multiple-outline" color={'#000'} size={20} />
        <Text style={{fontSize: 15}}>Vitóriaaaaa</Text>
      </View>







  */