import React from 'react'
import {View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer,getFocusedRouteNameFromRoute } from '@react-navigation/native'
import Home from '../screens/Home';
import FreeChargeHome from '../screens/FreechargeHome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Loan from '../screens/LoanApplicationScreen'
import PaisaPlus from '../screens/OnBoardingPaisaPlus'
import OnBoard from '../screens/OnBoardingKhata'
import Offers from '../screens/MyOffersTabsLayout'
import DashBoardScreen from '../screens/DashboardScreen'
import Web from '../screens/webRedirection'
import Modal from '../screens/Modal'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()


const StackNav = ({navigation,route}) => {
    return(
        <Stack.Navigator>
            
            <Stack.Screen name="FreeHome" component={TabNav} options={{headerShown:false}}/>
            <Stack.Screen name="LoanApplicationScreen" component={Loan} options={{headerShown:false}} />
            <Stack.Screen name="ModalScreen" component={Modal} options={{presentation: 'transparentModal',
            headerMode: 'none',
            cardOverlayEnabled: true}}/>
            {/* <Stack.Screen name="OnBoardingPaisaPlus" component={PaisaPlus} options={{headerShown:false}} />
            <Stack.Screen name="OnBoardingKhata" component={OnBoard} options={{headerShown:false}} />
            <Stack.Screen name="MyOffersTabsLayout" component={Offers} options={{headerShown:false}} />
            <Stack.Screen name="DashboardScreen" component={DashBoardScreen} options={{headerShown:false}} />
            <Stack.Screen name="webRedirection" component={Web} options={{headerShown:false}} /> */}
        </Stack.Navigator>
    )
}
const TabNav = ({state, descriptors, navigation}) => {
    return (
        <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarStyle:{borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                height:65,
                position: 'absolute',
                elevation: 0,
                },
            headerShown:false,
            tabBarLabelStyle: {fontSize:13,marginBottom:10},
            tabBarActiveTintColor:'red',
            tabBarHideOnKeyboard:true,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName,iconColor;
                if (route.name === 'Home') {
                  iconName = focused? 'home': 'home-outline';
                  iconColor = focused ? 'red':'grey'
                } else if (route.name === 'Transactions') {
                  iconName = focused ? 'document-text' : 'document-text-outline';
                  iconColor = focused ? 'red':'grey'
                }
                else if(route.name === 'Account'){
                    iconName = focused ? 'person' : 'person-outline';
                    iconColor = focused ? 'red':'grey'
                }
        
                // You can return any component that you like here!
                return <Ionicons style={{marginTop:15}} name={iconName} size={20} color={iconColor} />;
              },
        })}
        >
            <Tab.Screen name='Home' component={FreeChargeHome} />
            <Tab.Screen name='Transactions' component={FreeChargeHome} />
            <Tab.Screen name='Account' component={FreeChargeHome} />
        </Tab.Navigator>
    )
}

const Nav = ({navigation,route}) => {
    return(
        <NavigationContainer>
            <StackNav />
        </NavigationContainer>
    )
}

export default Nav