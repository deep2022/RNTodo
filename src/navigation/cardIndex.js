import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';
import Home from '../screens/Home';
import Dummy from '../screens/Dummy';
import AddScreen from '../screens/AddScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator()
import {View, Text, TouchableOpacity} from 'react-native'

function MyTabBar(props) {
    const { state, descriptors, navigation } = props
    return (
    <View style={{ flexDirection: 'row'}}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
              const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
                <View key={index} style={{flex:1,height:52}}>
                { isFocused ? 
                <View>
                <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{height:50,borderRadius:10,justifyContent:'center',alignItems:'center', backgroundColor: isFocused && 'white' }}
            >
              <Text style={{ color:'black', fontSize:12,fontWeight:'700' }}>
                {label}
              </Text>
            </TouchableOpacity> 
            <View style={{borderBottomWidth:2, borderColor:'red',alignSelf:'center',width:110}} />
            </View>
            :
            <LinearGradient colors={['#ffffff','#eeeeee','#dddddd','#eeeeee']} useAngle={true} angle={240} angleCenter={{x:0.5,y:0.5}} style={{borderTopLeftRadius: state.index ===0 ? 0:10,borderTopRightRadius: state.index === 1 ? 0:10}}>
                <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              activeOpacity={0.4}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{justifyContent:'center',alignItems:'center',height:50}}
            >
              <Text style={{ color: 'grey', fontSize:12,fontWeight:'bold' }}>
                {label}
              </Text>
            </TouchableOpacity> 
            </LinearGradient>
            }
            </View>
          );
        })}
      </View>
    );
  }

const CardNav = () => {
    return(
                <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({navigation, route }) => {
                    let focus = navigation.getState().index.toString()
                    return(
                        {
                            tabBarPressColor: 'white',
                            tabBarIndicatorStyle:{backgroundColor:'red'}
                        }
                    )
                }}
                tabBar={props => <MyTabBar {...props} /> }
                >
                    <Tab.Screen name="TODAY'S TRANSACTIONS" component={Dummy} />
                    <Tab.Screen name="SETTLEMENTS" component={Dummy}/>
                </Tab.Navigator>
    )
}

export default CardNav