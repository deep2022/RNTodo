import React, {createContext, useState} from 'react'
const Context = createContext();

const ContextProvider = (props) => {
    const [update, setUpdate] = useState(null)
    return(
            <Context.Provider value = {{update, setUpdate}}>
                {props.children}
            </Context.Provider>
    )
}
export {Context, ContextProvider}