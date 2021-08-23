import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import Routes from './src/routes'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const pilha = createStackNavigator();

function TelaHome({navigation}) {
  return (
    <View style={{flex: 1,alignItems:'center',justifyContent: 'center'}}>
      <Text>Tela Home</Text>
      <Text>Tela Home</Text>
      <Text>Tela Home</Text>
      <Button 
      title="Tela Dois"
      onPress={() => navigation.navigate('TDois')}
      />
    </View>
  )
}



function TelaDois({navigation}) {
  return (
    <View style={{flex: 1,alignItems:'center',justifyContent: 'center'}}>
      <Text>Tela Dois</Text>
      <Text>Tela Dois</Text>
      <Text>Tela Dois</Text>
      <Button 
      title="Tela Home"
      onPress={() => navigation.navigate('Home')}
      />
    </View>
  )
}

export default function App() {
  return (
      
      <Routes/>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


/*

<NavigationContainer>
        <pilha.Navigator initialRouteName="Home">
          <pilha.Screen
            name="Home"
            component={Home}
            options={{title:'Tela Inicial'}}  />

          <pilha.Screen
            name="Combustivel"
            component={Combustivel}
            options={{title:'Tela Dois'}}  />
        </pilha.Navigator>
      </NavigationContainer>




*/