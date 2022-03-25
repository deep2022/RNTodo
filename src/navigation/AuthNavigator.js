import React from 'react'
import { createStackNavigator , TransitionPresets } from '@react-navigation/stack'

import Login from '../screens/Login/index'
// component to authorise the valid user into the App
const AuthNavigator = () => {
    const Stack = createStackNavigator()

    const stackNavigatorOptions = {
        headerShown : null,
        ...TransitionPresets.SlideFromRightIOS
    }

    return (
        <Stack.Navigator screenOptions={stackNavigatorOptions}>
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}

export default AuthNavigator