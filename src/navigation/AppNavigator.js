import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from 'react-native-vector-icons'

import ListScreen from '../screens/List'
import ModalScreen from '../screens/Modal'
import SettingScreen from '../screens/Settings'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
// App Navigator after successfully logging the user
export default function MainStackNavigator() {
  return (
         <Stack.Navigator>
        <Stack.Screen name='List' component={ListScreen} options={{headerShown: false}} />
        <Stack.Screen name='Modal' component={ModalScreen} options={{headerShown: false}} />
        <Stack.Screen name='Settings' component={SettingScreen} />
      </Stack.Navigator>
  )
}