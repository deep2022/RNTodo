import React, { useContext, useEffect } from 'react'
import { connect,useDispatch } from 'react-redux'
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

// Added Flatllist to render Items and asyncstorage for local storage
let List = (props) => {
    const [items, setItem] = useState([])
    const { data,navigation } = props
    const [refresh, setRefresh] = useState(false)
    const [text, setText] = useState('')
    const [filter, setFilter] = useState([])
    console.log(text)
    console.log(data,"raw data")
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    useEffect(()=> {
      async function fetch(){
      const localdata = await AsyncStorage.getItem('Item')
      console.log(localdata,'local asyncStorage')
      setItem(JSON.parse(localdata))
      setFilter(JSON.parse(localdata))
      }
      fetch()
    },[])
    useEffect(()=> {
      if(isFocused){
      console.log("renderSubmitteddata called");
      renderSubmittedData();
      }
    },[isFocused])
    useEffect(()=> {
      filterData();
    },[text])
    const {dark} = useContext(Mode)
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
    console.log(I18n.t('greeting'))
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
    const search = () => {
      return (
        <>
        <TextInput
            style={{
              height: 50,
              width: '100%',
              justifyContent: 'center',
              padding: 5,
              borderColor: 'gray',
              borderBottomWidth: 1,
            }}
            onChangeText={setText}
            value={text}
            />
          </>
      )
    }
    return (
      <View style={dark === 'light' ? {backgroundColor: 'white',flex: 1,alignItems: 'center'} : {backgroundColor: 'black',flex: 1,alignItems: 'center'}}>
      {items.length !==0 ? (
      <FlatList 
        style = {{top: 30, padding: 5}}
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
      />
      
      ): (
        <TouchableOpacity style={{top: 300,height: 60}} onPress={() => renderSubmittedData()}><Ionicons name="reload-circle-sharp" size={60} color={dark==='dark' ? 'blue': 'black'}/></TouchableOpacity>
      )
      }
      <View style={{position: 'absolute', top: '30%', left: '1%'}}>
      </View>
      <TouchableOpacity style = {{color:'white',top: 600,right: 20,position: 'absolute'}} onPress={() => navigation.navigate('Modal')}><Ionicons name="add-circle-sharp" size={72} color={'blue'}/></TouchableOpacity>
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
