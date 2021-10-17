import React from 'react';
import { Button, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Updates } from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SvgUri } from 'react-native-svg';
import Storage from '../../services/Storage'
import {Restart} from 'fiction-expo-restart';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
          <MaterialCommunityIcons style={{marginLeft: '15%'}} name="microsoft-xbox-controller-menu" size={30} color="#8B80FC" />
            
        </TouchableOpacity>

      
    )
  }

