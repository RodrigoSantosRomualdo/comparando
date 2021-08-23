import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SvgUri } from 'react-native-svg';

export default function ConfigButton() {
    return (
        <TouchableOpacity>
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