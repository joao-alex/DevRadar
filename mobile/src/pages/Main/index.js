import React,{useEffect, useState} from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'

import styles  from './styles';

export default function Main() {
    const [currentRegion,setCurrentRegion] = useState(null);
    useEffect(()=>{
        function loadInitialPosition(){
            Geolocation.getCurrentPosition(position =>{
                console.log(position)
                setCurrentRegion({
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                });
            },null,{enableHighAccuracy:true});
        }
        loadInitialPosition()
    },[])

    if(!currentRegion)
        return null;

    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{latitude:-23.4007749, longitude:-49.3463161}}>
                <Image source={{uri:'https://avatars1.githubusercontent.com/u/44981295?s=460&v=4'}} style={styles.avatar}/>

                <Callout>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Joao Alex</Text>
                        <Text style={styles.devBio}>lets code</Text>
                        <Text style={styles.devTechs}>techs</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    );
}