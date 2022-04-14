import React, {useState} from 'react'
import {View, Text, Button, FlatList, TouchableOpacity, TextInput, Keyboard, ScrollView, StatusBar} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
const AddScreen = ({navigation}) => {
    const [select, setSelect] = useState(null)
    const [type, setType] = useState('Basic')
    
    const data = [{color: 'red'},{color: 'blue'},{color: 'green'},{color: 'black'},{color: 'magenta'},{color: 'purple'},{color: 'pink'},{color: 'violet'}]
    return (
        <ScrollView style={{backgroundColor:'white', flex:1}}>
            <StatusBar backgroundColor='white' barStyle="dark-content"/>
            <View style={{flex:1,flexDirection:'row',alignSelf:'center'}}>
                <Icon style={{paddingLeft:15, color:'black',alignSelf:'center',paddingVertical:5}} name='arrow-back' size={28} onPress={()=> navigation.goBack()} />
                <View style={{flexGrow:1}}>
                <Text style={{fontSize:21, color:'black',left:-20, fontWeight:'bold',alignSelf:'center',padding:5,zIndex:10}}>Edit Task</Text>
                </View>
            </View>
            <View>
                <Text style={{fontSize:20, fontWeight:'600', marginLeft:20,marginVertical:10}}>Color Task</Text>
                <FlatList 
                data={data}
                style={{marginHorizontal:20,marginTop:20}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item})=> (
                <TouchableOpacity style={{backgroundColor:item.color, width: 25, height: 25, marginBottom:30, borderRadius: 12.5, alignItems:'center', justifyContent:'center'}} onPress={()=> setSelect(item.color)} >
                {item.color === select && <Icon name={'checkmark-outline'} size={24} color ={item.color === 'white'? 'black':'white'} />}
                </TouchableOpacity>
                )}
                ItemSeparatorComponent={()=> (
                <View style={{paddingHorizontal:15}}></View>
                )}
                />
                <View style={{marginHorizontal:20,borderWidth:0.25, borderColor:'#cccccc'}} />
            </View>
            <View>
                <Text style={{fontSize:18, fontWeight:'600', marginHorizontal:15,marginTop:10,paddingLeft:5}}>Deadline</Text>
                <View style={{flexDirection:'row'}}>
                    <TextInput autoCorrect={false} style={{fontWeight:'600', fontSize:20,marginLeft:15,width:'85%',marginBottom:5}} onBlur={Keyboard.dismiss()} />
                    <Icon name={'calendar-outline'} size={26} color={'black'} style={{marginTop:7}} />
                </View>
            </View>
            <View style={{marginHorizontal:20,borderWidth:0.2, borderColor:'#cccccc',marginTop:5}} />
            <View>
                <Text style={{fontSize:18, fontWeight:'600', marginHorizontal:15,marginTop:9,paddingLeft:5}}>Place</Text>
                <View style={{flexDirection:'row'}}>
                    <TextInput autoCorrect={false} style={{fontWeight:'600', fontSize:20,marginLeft:15,width:'85%',marginBottom:5}} onBlur={Keyboard.dismiss()} />
                    <Icon name={'location-outline'} size={26} color={'black'} style={{marginTop:7}} />
                </View>
            </View>
            <View style={{marginHorizontal:20,borderWidth:0.2, borderColor:'#cccccc',marginTop:5}} />
            <View>
                <Text style={{fontSize:18, fontWeight:'600', marginHorizontal:15,marginTop:15,paddingLeft:5}}>Task Type</Text>
                <View style={{flexDirection:'row',marginHorizontal:20,marginVertical:13}}>
                    <TouchableOpacity style={{paddingHorizontal:25,paddingVertical:10, backgroundColor: type === 'Basic' ? 'black':'white',marginRight:20,borderRadius:28,alignSelf:'center',borderColor:type==='Basic'?'white':'black',borderWidth:1.5}} onPress={()=> setType('Basic')}><Text style={{color:type === 'Basic' ? 'white':'black', fontSize:18}}>Basic</Text></TouchableOpacity>
                    <TouchableOpacity style={{paddingHorizontal:25,paddingVertical:10, backgroundColor: type === 'Urgent' ? 'black':'white',marginRight:20,borderRadius:28,alignSelf:'center',borderColor:type==='Urgent'?'white':'black',borderWidth:1.5}} onPress={()=> setType('Urgent')}><Text style={{color:type === 'Urgent' ? 'white':'black', fontSize:18}}>Urgent</Text></TouchableOpacity>
                    <TouchableOpacity style={{paddingHorizontal:20,paddingVertical:10, backgroundColor: type === 'Important' ? 'black':'white',marginRight:20,borderRadius:32,alignSelf:'center',borderColor:type==='Important'?'white':'black',borderWidth:1.5}} onPress={()=> setType('Important')}><Text style={{color:type === 'Important' ? 'white':'black', fontSize:18}}>Important</Text></TouchableOpacity>
                </View>
            </View>
            <View style={{marginHorizontal:20,borderWidth:0.3, borderColor:'#cccccc',marginBottom:15}} />
            <View>
                <TouchableOpacity style={{alignSelf:'center',backgroundColor:'#00cc99',width:'90%',paddingVertical:15,borderRadius:28,marginTop:5}}>
                    <View style={{flexDirection:'row',alignSelf:'center'}}>
                        <Icon name={'document'} color={'black'} size={24} />
                        <Text style={{textAlign:'center',color:'black',fontSize:18, fontWeight:'500',marginLeft:10}}>Attach file</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity style={{alignSelf:'center',backgroundColor:'black',width:'90%',paddingVertical:15,borderRadius:28,marginTop:5,marginTop:120}}><Text style={{textAlign:'center',color:'white',fontSize:20, fontWeight:'500',marginLeft:10}}>Save Task</Text></TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default AddScreen