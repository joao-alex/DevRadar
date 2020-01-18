import React,{useEffect, useState} from 'react';
import { View, Image,TextInput, TouchableOpacity  } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import DevCard from '../../components/DevCard'


import styles  from './styles';
import MyLocation from '../../../assets/my_location.png';

import api from '../../services/api'

export default function Main() {
    const [currentRegion,setCurrentRegion] = useState(null);
    const [techs,setTechs] = useState('');
    const [devs,setDevs] = useState([]);
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
    },[]);

    async function loadDevs(){
        const {latitude,longitude} = currentRegion;
        const response = await api.get('/search',{
            params:{
                latitude,
                longitude,
                techs
            }
        })
        setDevs(response.data)
    }

    function handleRegionChanged(region){
        setCurrentRegion(region)
    }

    if(!currentRegion)
        return null;

    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
                {devs.map((dev)=>(
                    <DevCard key={dev._id} dev={dev}/>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                    returnKeyType={'done'}
                    onSubmitEditing={loadDevs}
                    />
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <Image source={MyLocation} style={{width:20,height:20}}/>
                </TouchableOpacity>
            </View>
        </>
    );
}