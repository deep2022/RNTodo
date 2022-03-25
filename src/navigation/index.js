import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage'


const RootNavigator = () => {
    const dispatch = useDispatch()
    useEffect(()=> {
        let d;
        async function fetchToken(){
            d = await AsyncStorage.getItem('Token')
            if(d !== null){
                d = JSON.parse(d)
                dispatch({type: 'LOGIN_SUCCESS',response: [d.Auth.id, d.Auth.user, d.Auth.token]})
            }
        }
        fetchToken()
    },[])
    const isAuth = useSelector(state => state.Auth.user)
    
    return (
        isAuth 
        ? <AppNavigator />
        : <AuthNavigator />
    )
}

export default RootNavigator
