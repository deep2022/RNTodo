import React, {createContext, useState} from 'react'
import {View} from 'react-native'
const Mode = createContext();
const ModeProvider = (props) => {
    const [dark, setDark] = useState(false) 
    const [lang, setLang] = useState('en')
    return(
            <Mode.Provider value = {{dark, setDark, lang , setLang}}>
                {props.children}
            </Mode.Provider>
    )
}
export {Mode, ModeProvider}