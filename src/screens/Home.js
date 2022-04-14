import React, {useState,useEffect} from 'react'
import {View, Text, Button, StatusBar,TouchableOpacity, FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import data from '../data'
import Header from '../components/Header'

const Home = ({navigation}) => {
    const [time, setTime] = useState('Today')
    const [task, setTask] = useState([])
    const [alert, setAlert] = useState(false)
    const filter = () => {
        const monthData = ['January','February','March','April','May','June','July','August','September','October','November','December']
        if(time === 'Today'){
            const currentDate = new Date();
            const day = currentDate.getDate()
            const month = currentDate.getMonth()
            const year = currentDate.getFullYear()
            const date = day + " " + monthData[month] + " " + year;
          setTask(() => data.filter(i => i.date === date && i.completed === false))
        }
        else if(time === 'Upcoming'){
            setTask(() => data.filter(i => Date.parse(i.date) > Date.parse(new Date())))
        }
        else {
            setTask(() => data.filter(i => i.completed === true))
        }
    }
    useEffect(()=> {
        filter()
    },[time])
    return (
        <View style={{backgroundColor:'white',flex:1}}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <Header />
                <View style={{flexDirection:'row',marginHorizontal:20,marginVertical:20}}>
                    <TouchableOpacity style={{paddingHorizontal:20,paddingVertical:10, backgroundColor: time === 'Today' ? 'black':'white',marginRight:20,borderRadius:28,alignSelf:'center'}} onPress={()=> setTime('Today')}><Text style={{color:time === 'Today' ? 'white':'black', fontSize:18,fontWeight:'500'}}>Today</Text></TouchableOpacity>
                    <TouchableOpacity style={{paddingHorizontal:20,paddingVertical:10, backgroundColor: time === 'Upcoming' ? 'black':'white',marginRight:20,borderRadius:28,alignSelf:'center'}} onPress={()=> setTime('Upcoming')}><Text style={{color:time === 'Upcoming' ? 'white':'black', fontSize:18,fontWeight:'500'}}>Upcoming</Text></TouchableOpacity>
                    <TouchableOpacity style={{paddingHorizontal:20,paddingVertical:10, backgroundColor: time === 'Done' ? 'black':'white',marginRight:20,borderRadius:32,alignSelf:'center'}} onPress={()=> setTime('Done')}><Text style={{color:time === 'Done' ? 'white':'black', fontSize:18,fontWeight:'500'}}>Task Done</Text></TouchableOpacity>
                </View>
                <FlatList 
                data = {task}
                style={{marginHorizontal:20}}
                showsVerticalScrollIndicator={false}
                renderItem = {({item})=> (
                    <View style={{backgroundColor:item.color, elevation:1,marginVertical:10,paddingHorizontal:15,paddingTop:20,paddingBottom:10,borderRadius:15}}>
                        <View style={{flexDirection:'row',marginBottom:15}}>
                            {item.label.map(i => <Text style={{borderColor:'grey',borderWidth:1,borderRadius:15,paddingHorizontal:15,padding:5,marginRight:10}}>{i}</Text>)}
                            {time !== 'Done' && <Icon name={'pencil'} size={20} style={{marginLeft:130,padding:5,backgroundColor:'black',borderRadius:20}} color={'white'} /> }
                        </View>
                        <Text style={{fontSize:22,fontWeight:'bold',marginBottom:25,color:'black'}}>{item.task}</Text>
                        { time !== 'Done' && 
                        <>
                        <View style={{flexDirection:'row',marginBottom:5}}>
                        <Icon name={'calendar-outline'} size={20} style={{marginRight:5}} />
                            <Text style={{fontWeight:'500'}}>{item.date}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Icon name={'time-outline'} size={20} style={{marginRight:5,marginTop:5}} />
                        <Text style={{fontWeight:'500',marginRight:5,marginTop:5}}>{item.time}</Text>
                        <Text style={{fontWeight:'500',marginTop:5}}>{item.reminder}</Text>
                         <Icon1 name={'circle-outline'} size={24} color={'white'} style={{position:'absolute',right:5,marginTop:0}} />
                        </View>
                        </>
                }
                    </View>
                )}
                />
                <View style={{ flex: 1, width:'100%',position:'absolute',bottom:0,height:80,zIndex:2,opacity:0.3, backgroundColor: 'white' }} />
                <View style={{alignSelf:'center',zIndex:10}}>
                        <TouchableOpacity onPress={()=> navigation.navigate('Add')} style={{flexDirection:'row',backgroundColor:'black',position:'absolute',bottom:20,alignSelf:'center',paddingHorizontal:15,elevation:5,paddingVertical:5,borderRadius:25,zIndex:90}}>
                        <Icon name={'add'} size={24} color={'white'} style={{marginTop:5}} />
                        <Text style={{color:'white',fontSize:18,fontWeight:'600',padding:5,zIndex:1}}>Add Task</Text>
                        </TouchableOpacity>
                </View>
        </View>
    )
}

export default Home