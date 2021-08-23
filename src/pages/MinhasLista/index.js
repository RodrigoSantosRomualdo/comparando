import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import styles from './styles'

export default function MinhasLista({navigation}) {
    return (
      <View style={styles.container}>
        <Text>Tela Minhas Listas</Text>

        <Button
        title="Ir para Home"
        onPress={() => {
          navigation.navigate('Home')
        }}/>
        <Text></Text>
        <Button
        title="Ir para Combustivel"
        onPress={() => {
          navigation.navigate('Combustivel')
        }}/>
        
      </View>
    )
  }


    /*
  NAVIGATION PAGINAS

  <Button
        title="Ir para Home"
        onPress={() => {
          navigation.navigate('Home')
        }}/>
        <Text></Text>
        <Button
        title="Ir para Combustivel"
        onPress={() => {
          navigation.navigate('Combustivel')
        }}/>

  */