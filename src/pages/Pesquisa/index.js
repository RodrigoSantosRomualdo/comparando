import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles';

export default function Pesquisa(props) {
    const navigation = useNavigation();

    console.log('------------------------')
    console.log(props)
    console.log('------------------------')
    return (
        <View style={styles.container}>

            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '5%'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Ionicons name="chevron-back-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 22, fontWeight: 'normal'}}>{props.route.params?.namePesquisa}</Text>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="filter-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: '15%', alignItems: 'center' }}>

                    <TouchableOpacity style={{width: '85%', backgroundColor: '#8B80FC', borderRadius: 39, 
                    flexDirection: 'row', marginTop: '3%'}} onPress={() => navigation.navigate('ProdutoEscolhido')}>
                        <Image source={require('../../assets/qrcode/qr-code.png')} 
                        style={{width:68, height:70, borderRadius: 19, marginLeft: 15, marginBottom: 15, marginTop: 15, marginRight: 15}}/>

                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>Leite Itambé</Text>
                            <Text style={{color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>Dia LTDA 5.6km</Text>
                            <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>R$ 5,90</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: '85%', backgroundColor: '#8B80FC', borderRadius: 39, 
                    flexDirection: 'row', marginTop: '3%'}}>
                        <Image source={require('../../assets/qrcode/qr-code.png')} 
                        style={{width:68, height:70, borderRadius: 19, marginLeft: 15, marginBottom: 15, marginTop: 15, marginRight: 15}}/>

                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>Leite Itambé</Text>
                            <Text style={{color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>Dia LTDA 5.6km</Text>
                            <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>R$ 5,90</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: '85%', backgroundColor: '#8B80FC', borderRadius: 39, 
                    flexDirection: 'row', marginTop: '3%'}}>
                        <Image source={require('../../assets/qrcode/qr-code.png')} 
                        style={{width:68, height:70, borderRadius: 19, marginLeft: 15, marginBottom: 15, marginTop: 15, marginRight: 15}}/>

                        <View style={{marginTop: 15}}>
                            <Text style={{color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>Leite Itambé</Text>
                            <Text style={{color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>Dia LTDA 5.6km</Text>
                            <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>R$ 5,90</Text>
                        </View>
                    </TouchableOpacity>

                    

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