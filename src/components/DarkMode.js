import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react'
import {View} from 'react-native'
import I18n from './I18n';
const Mode = createContext();

// ContextAPI for updating Theme and Language in the settings page
const ModeProvider = (props) => {
    const [dark, setDark] = useState(null) 
    const [lang, setLang] = useState(null)
    useEffect(()=> {
        async function Settings(){
            const j = await AsyncStorage.getItem('language')
            const k = await AsyncStorage.getItem('theme')
            if(j === null){
            setLang('en')
            }
            else{
                setLang(j)
            }
            if(k === null){
            setDark('light')
            }
            else{
                setDark(k)
            }
        }
        Settings()
    })
    I18n.locale = lang
    return(
            <Mode.Provider value = {{dark, setDark, lang , setLang}}>
                {props.children}
            </Mode.Provider>
    )
}
export {Mode, ModeProvider}