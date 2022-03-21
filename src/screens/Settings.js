import React, { useContext, useEffect, useState } from 'react'
import {View, Text, Switch, } from 'react-native'
import { Mode } from '../components/DarkMode'
import { Picker } from '@react-native-picker/picker';
import I18n from '../components/I18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Setting screen to display theme and language
const Settings = ({navigation}) => {
    const {dark, setDark, lang, setLang} = useContext(Mode)
    const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => (setDark(dark == 'dark'? 'light': 'dark'), setIsEnabled(dark === 'dark'? true: false))
      useEffect(()=>{
      I18n.locale = lang
      async function languageUpdate(){
          await AsyncStorage.setItem('language',lang)
          console.log('Async function Language')
      }
      languageUpdate()
      console.log(lang)
  },[lang])
  useEffect(()=>{
    async function themeUpdate(){
        await AsyncStorage.setItem('theme',dark)
        console.log('Async function Theme')
    }
    themeUpdate()
    console.log(dark)
},[dark])
    return (
        <View style={dark === 'light' ? {flex: 1}: {flex:1, backgroundColor: 'black'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%'}}>
                <Text style={dark=== 'dark' ? {fontSize: 24,fontWeight: 'bold',color: 'white'}: {fontSize: 24,fontWeight: 'bold',color: 'black'}}>Dark Mode</Text>
                <Switch
                    thumbColor={isEnabled ? "#f5dd4b" : "green"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={dark === 'dark'? true: false}
                />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',marginTop: '5%'}}>
            <Text style={dark === 'dark' ? {fontSize: 24,fontWeight: 'bold',color: 'white'}: {fontSize: 24,fontWeight: 'bold',color: 'black'}}>App Language</Text>
            <Picker
                style={dark === 'dark' ? {width: '34%', color: 'white'}: {width: '34%'}} 
                selectedValue={lang}
                onValueChange={(itemValue, indexValue)=> setLang(itemValue)}
            >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Hindi" value="hn" />
            </Picker>
            </View>
        </View>
    )
}
export default Settings