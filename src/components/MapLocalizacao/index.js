import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MapLocalizacao() {
    return (
        <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}}>
             <Icon name="map-marker-multiple-outline" color={'#8B80FC'} size={20} />
        <Text style={{fontSize: 15}}>Vitória</Text>
        </TouchableOpacity>
      
    )
  }