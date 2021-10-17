import React, { useState} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './pages/Home';
import Combustivel from './pages/Combustivel';
import CombustivelPreco from './pages/CombustivelPreco';

import MinhasLista from './pages/MinhasLista';
import Pesquisa from './pages/Pesquisa';
import ProdutoEscolhido from './pages/ProdutoEscolhido';
import MinhaListaProduto from './pages/MinhaListaProduto';
import Scanner from './pages/Scanner';
import PesquisaQrcode from './pages/PesquisaQrCode';
import LogarCriarConta from './pages/LogarCriarConta';
import CriarConta from './pages/CriarConta';
import MercadoPesquisa from './pages/MercadoPesquisa';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// Componente do MENU INFERIOR
const HomeTabs = () => {

    return (
        <Tab.Navigator 
        initialRouteName=""
        activeColor={'#000'}
        barStyle={{backgroundColor: '#E5E5E5'}}>
            <Tab.Screen name="Home" component={Home} 
            options={{
                tabBarLabel: "Inicio",
                tabBarIcon: () => (
                    <Icon name="home-variant-outline" color={'#000'} size={26} />
                    )
                }} 
            />
            <Tab.Screen name="Combustivel" component={Combustivel} 
            options={{
                tabBarLabel: "Combustivel",
                tabBarIcon: () => (
                    <Icon name="gas-station-outline" color={'#000'} size={26} />
                    )
                }} 
            />
            <Tab.Screen name="MinhasLista" component={MinhasLista} 
            options={{
                tabBarLabel: "Lista",
                 
                tabBarIcon: () => (
                    <Icon name="clipboard-list-outline" color={'#000'} size={26} />
                    )
                }} 
            />
            

           
        </Tab.Navigator>
    )
}


const Routes = () => {
   
        return (
            <NavigationContainer>
                <StatusBar
            barStyle = "default"
            hidden = {false}
            backgroundColor = "#E5E5E5"
            translucent = {false}
            networkActivityIndicatorVisible = {true}
          />
            <Stack.Navigator>
              <Stack.Screen
                name="InicioHome"
                component={HomeTabs}
                options={{headerShown: false}}
                
                 />
    
              <Stack.Screen
                name="Combustivel"
                options={{headerShown: false}}
                component={HomeTabs}
                 />

                <Stack.Screen
                name="CombustivelPreco"
                component={CombustivelPreco}
                options={{headerShown: false}}
                />

                <Stack.Screen
                name="MinhasLista"
                component={MinhasLista}
                options={{headerShown: false}}
                 />
    
       
    
            <Stack.Screen
                name="Pesquisa"
                component={Pesquisa}
                options={{headerShown: false}}
                 />
    
            <Stack.Screen
                name="ProdutoEscolhido"
                component={ProdutoEscolhido}
                options={{headerShown: false}}
                 />
    
            <Stack.Screen
                name="MinhaListaProduto"
                component={MinhaListaProduto}
                options={{headerShown: false}}
                />
    
            <Stack.Screen
                name="Scanner"
                component={Scanner}
                options={{headerShown: false}}
                />
    
            <Stack.Screen
                name="PesquisaQrcode"
                component={PesquisaQrcode}
                options={{headerShown: false}}
                />
    
                <Stack.Screen
                name="LogarCriarConta"
                component={LogarCriarConta}
                options={{headerShown: false}}
                />
            
    
                <Stack.Screen
                name="CriarConta"
                component={CriarConta}
                options={{headerShown: false}}
                />

                <Stack.Screen
                name="MercadoPesquisa"
                component={MercadoPesquisa}
                options={{headerShown: false}}
                />
            
            

            </Stack.Navigator>
            


            
            
          </NavigationContainer>
    
        )
    
}

export default Routes;

/*

 <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title:'Tela Inicial'}}  />

          <Stack.Screen
            name="Combustivel"
            component={Combustivel}
            options={{title:'Tela Dois'}}  />
        </Stack.Navigator>
      </NavigationContainer>








*/