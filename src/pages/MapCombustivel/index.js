import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView,  { Marker } from 'react-native-maps';
import {MaterialCommunityIcons} from '@expo/vector-icons'

export default function MapCombustivel(props) {
   //console.log('--------PROPS: ', )
  const [mapRegion, setmapRegion] = useState({
    latitude: props.route.params.location.coords.latitude,
    longitude: props.route.params.location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  /*const [mapPosto, setMapPosto] = useState([
    {
        id: '1',
        title: 'title',
        description: 'description',
        location: {
            latitude:-20.321498948476485,
            longitude: -40.351652188483214
        },
        icon: 'gas-station'
    }
  ]) */

  return (
    <View style={styles.container}>
    <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        initialRegion={mapRegion}
        region={mapRegion}
        showsUserLocation={true}
        
    >
    {props.route.params.datePosto 
        ? props.route.params.datePosto.map(mapPosto => (

        <Marker
        key={mapPosto._id}
        coordinate={{latitude:mapPosto.posto_combustivel.location.coordinates[0], longitude:mapPosto.posto_combustivel.location.coordinates[1]}}
        title={`R$ ${mapPosto.preco_venda} - ${mapPosto.posto_combustivel.nome_fantasia}`}
        description={`${mapPosto.descricao}`} 
        >
             <MaterialCommunityIcons name={"gas-station"} size={26} color="red" />
        </Marker>

        

        
        
        
        
    )): null}
    
        
      </MapView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


/*
<Marker 
        coordinate={mapPosto.posto_combustivel.location.coordinates}
        title={mapPosto.posto_combustivel.nome_fatasia}
        description={mapPosto.descricao} 
        >
            <MaterialCommunityIcons name={mapPosto.icon} size={26} color="red" />
        </Marker>

    
*/