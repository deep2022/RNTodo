import React, { useEffect } from 'react'
import { connect,useDispatch } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { Modal, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, FlatList,PermissionsAndroid, Image, ScrollView, RefreshControl } from 'react-native'
import {useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Card, Searchbar, TextInput} from 'react-native-paper'
import { reset } from 'redux-form'
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod'
import {useIsFocused} from '@react-navigation/native'
import SearchBar from '../components/SearchBar'

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
      if(isFocused){
      console.log("renderSubmitteddata called");
      renderSubmittedData();
      }
    },[isFocused])
    useEffect(()=> {
      filterData();
    },[text])
    const renderSubmittedData = () => {
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
    }
    }
    console.log(filter)
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
      <View style={{backgroundColor: 'white',flex: 1,alignItems: 'center'}}>
      {items.length !==0 ? (
      <FlatList 
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
                </View>
                </View>
                </Card>
            </View>
        )}
        onRefresh={() => renderSubmittedData()}
        refreshing={refresh}
        ListHeaderComponent={
          <SearchBar onSearchEnter={(t)=> setText(t)} />
        }
        ListHeaderComponentStyle={{top: 10, marginBottom: 20}}
      />
      
      ): (
        <TouchableOpacity style={{top: 300,height: 60}} onPress={() => renderSubmittedData()}><Ionicons name="reload-circle-sharp" size={60} color={'black'}/></TouchableOpacity>
      )
      }
      <TouchableOpacity style = {{color:'white',top: 600,right: 20,position: 'absolute'}} onPress={() => navigation.navigate('Modal')}><Ionicons name="add-circle-sharp" size={72} color={'blue'}/></TouchableOpacity>
    </View>
    )
    }

const selector = formValueSelector('inputForm')

List = connect(state => {
    const data = selector(state,'Date','Task','Image','Location')
    return {data}
})(List)


export default List
