import React, {useEffect, useState} from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as Location from 'expo-location';
import api, {key} from '../../services/api-endereco';

export default function MapLocalizacao() {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [cityApi, setCityApi] = useState();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    
      if (!cityApi) {
      let text = 'Waiting..';
        if (errorMsg) {
            text = errorMsg;
        } else if (location) {
            //console.log(location.coords.latitude)
            //console.log(location.coords.longitude)
            //text = JSON.stringify(location);
            //const {latitude} =  text;
            //console.log('latitude: ',text.timestamp)
            const response = await api.get(`weather?key=${key}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`)
            //const response = await api.get('weather?key=7eed1d01&lat=-20.3034835&lon=-40.3465624&user_ip=remote')
            //console.log(response.data.results.city)
            console.log('PEGOU A CIDADE PELO GPS API HG-BRASIL: ',response.data.results.city)
            setCityApi(response.data.results.city)
        }
    }
    })();
  }, []);

  

    return (
        <View>
            <Text>{cityApi}</Text>
        </View>
      
    )
  }