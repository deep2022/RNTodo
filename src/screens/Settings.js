import React, { useContext, useEffect, useState } from 'react'
import {View, Text, Switch, } from 'react-native'
import { Mode } from '../components/DarkMode'
import { Picker } from '@react-native-picker/picker';
import I18n from '../components/I18n';

const Settings = ({navigation}) => {
    const {dark, setDark, lang, setLang} = useContext(Mode)
    const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => (setDark(previousState => !previousState), setIsEnabled(!isEnabled))
  useEffect(()=>{
      I18n.locale = lang
  },[lang])
  useEffect(()=>{
},[dark])
    return (
        <View style={!dark ? {flex: 1}: {flex:1, backgroundColor: 'black'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={dark ? {fontSize: 24,fontWeight: 'bold',color: 'white'}: {fontSize: 24,fontWeight: 'bold',color: 'black'}}>Dark Mode</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "green"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={dark}
                />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={dark ? {fontSize: 24,fontWeight: 'bold',color: 'white'}: {fontSize: 24,fontWeight: 'bold',color: 'black'}}>App Language</Text>
            <Picker
                style={dark ? {width: '34%', color: 'white'}: {width: '34%'}} 
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