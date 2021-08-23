import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

export default function ProdutoEscolhido(props) {
    const navigation = useNavigation();

    console.log('------------------------')
    console.log(props)
    console.log('------------------------')
    return (
        <View style={styles.container}>

            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '5%'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Pesquisa')}>
                        <Ionicons name="chevron-back-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 22, fontWeight: 'normal'}}>Leite Itambé</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="post-add" size={30} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: '20%', marginLeft: '15%'}}>
                    
                    <View>
                        <Text style={{fontSize: 30, fontWeight: 'normal'}}>Leite Itambé 1L</Text>
                    </View>

                    <View>
                    <Text style={{color: '#8B80FC', fontSize: 18}}><Icon name="map-marker-multiple-outline" color={'#8B80FC'} size={20} />Dia LTDA, 5.6KM</Text>
                    </View>

                    <View>
                        <Text style={{color: '#8B80FC', fontSize: 14, marginLeft: '6%'}}>Belo Horizonte, Rua Amazonia</Text>
                    </View>

                </View>

                <View style={{marginTop: '30%', marginLeft: '15%'}}>
                    <Text style={{color: '#8B80FC', fontSize: 18}}>Preço:</Text>

                    <Text style={{color: '#040E2C', fontSize: 64,}}>R$5,90</Text>


                   

                </View>


                

            </View>

        </View>
    )
}


/*
<Text>MINHA PESQUISA</Text>

                <Button
                title="Ir para Homee"
                onPress={() => {
                    navigation.navigate('Home')
                }}/>


*/