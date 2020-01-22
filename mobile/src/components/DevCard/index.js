import React from 'react';
import { View, Text, Image} from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { withNavigation } from 'react-navigation' 

import styles from './styles'

export default withNavigation( function DevCard({dev,navigation}) {
    function handleNavigate(profile_url){
        navigation.navigate('Profile',{profile_url});
    }
  return (
    <Marker coordinate={{latitude:dev.location.coordinates[1], longitude:dev.location.coordinates[0]}}>
        <Image source={{uri:dev.avatar_url}} style={styles.avatar}/>
        <Callout onPress={()=>handleNavigate(`https://github.com/${dev.github_username}`)}>
            <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name?dev.name:dev.github_username}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
            </View>
        </Callout>
    </Marker>
  );
});
