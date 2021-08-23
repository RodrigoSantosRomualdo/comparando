import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import styles from './styles'

export default function Combustivel({navigation}) {
    return (
      <View style={styles.container}>
        <Text>Tela Combustivel</Text>

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
        title="Ir para Minha Lista"
        onPress={() => {
          navigation.navigate('MinhasLista')
        }}/>

  */