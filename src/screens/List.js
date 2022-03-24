import React, { useContext, useEffect } from 'react'
import { connect,useDispatch, useSelector } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { Modal, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, FlatList,PermissionsAndroid, Image, ScrollView, RefreshControl } from 'react-native'
import {useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Button, Card, Searchbar, TextInput} from 'react-native-paper'
import { reset } from 'redux-form'
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod'
import {useIsFocused} from '@react-navigation/native'
import SearchBar from '../components/SearchBar'
import { Mode } from '../components/DarkMode'
import I18n from '../components/I18n'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchDetails } from './Login/actions';

// Main UI component with flatlist added and searchbar component
// AsyncStorage functionality added for offline working of the data
let List = (props) => {
    const [items, setItem] = useState([])
    const { data,navigation } = props
    const [refresh, setRefresh] = useState(false)
    const [text, setText] = useState('')
    const [filter, setFilter] = useState([])
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const userEmail = useSelector(state => state)
    const obj = {
      token: userEmail.Auth.token,
      entityId: userEmail.Auth.id,
      entityType: userEmail.Auth.user
  }
    useEffect(()=> {
        async function storeToken(){
            await AsyncStorage.setItem('Token', JSON.stringify(userEmail))
        }
        storeToken()

    },[userEmail.Auth.id])
    useEffect(()=> {
      async function fetch(){
      const localdata = await AsyncStorage.getItem('Item')
      if(JSON.parse(localdata) !== null){
      setItem(JSON.parse(localdata))
      setFilter(JSON.parse(localdata))
      }
      }
      fetch()
    },[])
    useEffect(()=> {
      if(isFocused){
      renderSubmittedData();
      }
    },[isFocused])
    useEffect(()=> {
      filterData();
    },[text])
    const {dark} = useContext(Mode)
    // function used to update ui with submitted data in the form
    const renderSubmittedData = async () => {
        setRefresh(true)
        const obj = {Date: data.Date, Task: data.Task, Image: data.Image, Location: data.Location}
        if(obj.Date === undefined || obj.Task === undefined || obj.Image === undefined){
            setTimeout(()=> console.log("Data fields are Empty"),2000)
            setRefresh(false)
        }
        else{
        setItem(i => [...i,obj])
        setRefresh(false)
        dispatch(reset('inputForm'))
        setFilter(i => [...i,obj])
        const local = await AsyncStorage.getItem('Item')
        if(local === null){
          await AsyncStorage.setItem('Item',JSON.stringify(obj))
        }
        else{
          await AsyncStorage.setItem('Item',JSON.stringify([...items,obj]))
        }
    }
    }
    const filterData = ()=> {
      let data = []
      if(text !== ''){
      data = items.filter((i)=> i.Task.toLowerCase().includes(text.toLocaleLowerCase()))
      setFilter(data)
    }
    else{
      setFilter(items)
    }
    }

    return (
      <View style={dark === 'light' ? {backgroundColor: 'white',flex: 1,alignItems: 'center'} : {backgroundColor: 'black',flex: 1,alignItems: 'center'}}>
        {userEmail.Auth.data.length !== 0 ?
        <Text style={dark === 'light'? {color: 'black', paddingTop: 10}: {color:'white', paddingTop: 10}}>Payment count {userEmail.Auth.data[0]} and Total amount Payment {userEmail.Auth.data[1]}</Text>
        :
        <Text style={dark === 'light'? {color: 'black', paddingTop: 10}: {color:'white', paddingTop: 10}}>No Data fetched from the server</Text>
        }
        <Button style={{backgroundColor: 'blue' , alignSelf:'center',marginTop: '5%'}} color={'white'} onPress={()=> dispatch(fetchDetails(obj)) }>Fetch data</Button>
      <Text style={dark === 'light'? {color: 'black', paddingTop: 10}: {color:'white', paddingTop: 10}}>Hi! {userEmail.Auth.id}</Text>
      {items.length !==0 ? (
      <FlatList 
        style = {{top: 30, padding: 5, width: '95%'}}
        data = {filter}
        renderItem = {({item})=>(
            <View style={{flex: 1, flexDirection: 'row',paddingVertical: 10}}>
                <Card style={{margin: 5, elevation: 5, width: '95%'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                <Image source={{uri: item.Image}} resizeMethod={'auto'} resizeMode={'contain'} style={{width: 100, height: 100}}/>
                <View style={{flexDirection: 'column-reverse'}}>
                <Text style={{fontWeight:'bold',marginTop: 10, marginBottom: 10}}>{item.Date}</Text>
                <Text style={{fontWeight:'bold', marginBottom: 10,marginTop: 10}}> {item.Task}</Text> 
                <Text style={{fontWeight:'bold', marginBottom: 10,marginTop: 10}}> {item.Location.latitude} , {item.Location.longitude} </Text> 
                <Text style={{fontWeight:'bold',marginTop: 10, marginBottom: 10}}>{I18n.t('greeting')}</Text>
                </View>
                </View>
                </Card>
            </View>
        )}
        onRefresh={() => renderSubmittedData()}
        refreshing={refresh}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <SearchBar onSearchEnter={(t)=> setText(t)} />
        }
        ListHeaderComponentStyle={{top: 10, marginBottom: 20}}
        ListFooterComponent={(
          <View>
            <Text style={{textAlign: 'center'}}>Copyright 2022</Text>
          </View>
        )}
        ListFooterComponentStyle={{marginBottom: '10%'}}
      />
      
      ): (
        <TouchableOpacity style={{top: 300,height: 60}} onPress={() => renderSubmittedData()}><Ionicons name="reload-circle-sharp" size={60} color={dark==='dark' ? 'blue': 'black'}/></TouchableOpacity>
      )
      }
      <View style={{position: 'absolute', top: '30%', left: '1%'}}>
      </View>
      <TouchableOpacity style = {{color:'white',top: '85%',right: '5%',position: 'absolute'}} onPress={() => navigation.navigate('Modal')}><Ionicons name="add-circle-sharp" size={72} color={'blue'}/></TouchableOpacity>
      <Ionicons style={{position: 'absolute',left: '90%', alignItems: 'flex-start'}} name="settings" size={36} color={dark==='dark' ? 'white': 'black'} onPress={() => navigation.navigate('Settings')}/>
    </View>
    )
    }

const selector = formValueSelector('inputForm')

List = connect(state => {
    const data = selector(state,'Date','Task','Image','Location')
    return {data}
})(List)

export default List
