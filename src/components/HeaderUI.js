import React, {useState} from 'react'
import {View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import SearchComponent from './SearchBarUI'

const Header = () => {
    const [search, setSearch] = useState(false)
    return(
        <View>
            <View style={{flexDirection:'row', justifyContent:'space-between',marginVertical:15}}>
                <Icon style = {{padding:10,backgroundColor:'black',borderRadius:25,marginLeft:15}} name={'grid'} color={'white'} size={28} />
                <Text style={{padding:10, fontSize:20, fontWeight:'bold',color:'black'}}>Task Manager</Text>
                <Icon style={{padding:10,marginRight:10}} name={'notifications-outline'} color={'black'} size={28} />
            </View>
            <View style={{flexDirection:'row',paddingHorizontal:20,justifyContent:'space-between',marginVertical:15}}>
                <View style={{flexDirection:'column'}}>
                    <Text style={{fontSize:20, color:'black',fontWeight:'500'}}>Welcome back!</Text>
                    <Text style={{fontSize:26,fontWeight:'bold',color:'black',marginTop:10}}>Here's Update Today.</Text>
                </View>
                <Icon style={{backgroundColor:'black', color:'white',padding:20,marginTop:10,borderRadius:40}} name= {'search-outline'} size={26} onPress={()=> setSearch(true)} />
            </View>
            {
                search && <SearchComponent onSearchEnter={t => setSearch(t)} />
            }
        </View>
    )
}

export default Header