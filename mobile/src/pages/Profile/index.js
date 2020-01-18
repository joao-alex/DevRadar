import React,{useEffect,useState} from 'react';
import { View,Text } from 'react-native';
import {WebView} from 'react-native-webview'


import styles  from './styles';

export default function Profile({navigation}) {
  const [profile,setProfile] = useState('')
  useEffect(()=>{
    const profile_url = navigation.getParam('profile_url');
    setProfile(profile_url)
  },[])
  return (
      <WebView source={{uri:profile}} style={{flex:1}}/>
  );
}
