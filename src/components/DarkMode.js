import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react'
import {View} from 'react-native'
import I18n from './I18n';
const Mode = createContext();

// ContextAPI for updating Theme and Language
const ModeProvider = (props) => {
    const [dark, setDark] = useState('light') 
    const [lang, setLang] = useState('en')
    useEffect(()=> {
        async function Settings(){
            const j = await AsyncStorage.getItem('language')
            console.log(j,'language')
            setLang(j)
            const k = await AsyncStorage.getItem('theme')
            console.log(k,'theme')
            setDark(k)
        }
        Settings()
    })
    console.log(dark,lang)
    I18n.locale = lang
    return(
            <Mode.Provider value = {{dark, setDark, lang , setLang}}>
                {props.children}
            </Mode.Provider>
    )
}
export {Mode, ModeProvider}