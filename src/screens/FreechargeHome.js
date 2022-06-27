import React,{useState,useEffect} from "react"
import {View, Text, StatusBar,Image,TextInput,TouchableOpacity,Dimensions,FlatList} from 'react-native'
import FlatScrollView from "../components/FlatScrollView"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import data from "../localdata/uidata"
import CardNav from "../navigation/cardIndex"
import Header from "../components/HeaderFreeCharge"
import PushNotification from 'react-native-push-notification'
import remoteConfig from '@react-native-firebase/remote-config'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Cibil from "../components/Cibil"

const FreeChargeHome = ({navigation}) => {
    const [open,setOpen] = useState(true)
    const [text,setText] = useState('')
    const [category, setCategories] = useState([])
    const setVal = async (params) => {
        await AsyncStorage.setItem('Category',JSON.stringify(params))
    } 
    const getVal = async () => {
        const a = await AsyncStorage.getItem('Category')
        if(a!=null){
        setCategories(JSON.parse(a))
        }
    }
    useEffect(()=> {
        async function remote(){
                remoteConfig()
                  .setDefaults({
                    categories: {"items":[]},
                  })
                  .then(() => remoteConfig().fetchAndActivate())
                    .then(fetchedRemotely => {
                        if (fetchedRemotely) {
                        } else {
                        }
                    })
                    .then(() => remoteConfig().getValue('categories'))
                    .then(awesomeNewFeature => {
                        if(awesomeNewFeature.getSource()=='remote'){
                            setCategories(JSON.parse(awesomeNewFeature._value))
                            setVal(awesomeNewFeature._value)
                        }
                        else{
                            getVal()
                        }
                    })
                }
                remote()
    },[])
    const handleNotification = (item, index) => {

        // PushNotification.localNotification({
        //     channelId: "test-channel",
        //     title: "You clicked on " + item,
        //     message: item,
        //     color: "red",
        //     id: index
        // });

        PushNotification.localNotificationSchedule({
            channelId: "test-channel",
            title: "Alarm",
            message: "You clicked on " + item + " 60 seconds ago",
            date: new Date(Date.now() + 60 * 1000),
            allowWhileIdle: true,
        });
    }
    const [value, setValue] = useState(700)
    return(
        <>
        <FlatScrollView style={{backgroundColor:'#eff1f6',flex:1,marginBottom:40}} showsVerticalScrollIndicator={false}>
            <StatusBar backgroundColor={'#eff1f6'} barStyle={'dark-content'} />
            <Header />
            <Cibil sliderRange={[500,1000]} value={value} />
            <View style={{flex:1,backgroundColor:'white',height:open ? 400: 355,marginHorizontal:10,borderRadius:10,marginTop:20,marginBottom:5}}>
                <CardNav />
                <View style={{height:60,paddingHorizontal:20,paddingVertical:10}}>
                    <Text style={{fontSize:18,fontWeight:'700',color:'black'}}>₹ 5304</Text>
                    <Text style={{color:'black'}}>38 Transactions <Text style={{fontStyle:'italic'}}>(Total amount received today)</Text></Text>
                </View>
                { open &&
                <View style={{height:55,backgroundColor:'#ffeee6',padding:2,paddingHorizontal:9,flexDirection:'row',borderBottomLeftRadius:10,borderBottomRightRadius:10,justifyContent:'center',alignItems:'center',paddingHorizontal:15}}>

                    <Text style={{color:'black',width:'85%',fontSize:10,justifyContent:'center',paddingHorizontal:5}}>Instant settlement for ₹5304 was failed & the same will be transferred with the next automatic settlement</Text>
                    <TouchableOpacity onPress={()=> setOpen(false)} style={{justifyContent:'center'}}><Text style={{color:'#ff7744',fontWeight:'700'}}>GOT IT</Text></TouchableOpacity>
                </View>
                }
            </View>
            <View style={{borderRadius:10,backgroundColor:'#222222',padding:15,marginVertical:10,marginHorizontal:10}}>
                <View style={{flexDirection:'row',marginBottom:10}}>
                <FontAwesome name={'rupee'} size={16} style={{color:'white',paddingVertical:9,paddingHorizontal:5}} />
                <Text style={{fontSize:16,color:'white',padding:5,fontWeight:'700'}}>Payment Link</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <TextInput style={{backgroundColor:'#444444',borderWidth:1,borderRadius:8,width:'54%',color:'white',paddingLeft:10,letterSpacing:1,marginRight:10,fontSize:20,textAlign:'center'}} keyboardType={'number-pad'} placeholder={''} placeholderTextColor={'white'} onChangeText={(e)=> setText(e)} />
                <TouchableOpacity style={{backgroundColor:'#ff7744',alignItems:'center',justifyContent:'center',marginVertical:7,paddingVertical:8,paddingHorizontal:13,borderRadius:20}} onPress={()=> {if(text !== ''){navigation.navigate('ModalScreen',{amount: text})}}}><Text style={{color:'white',textAlign:'center',fontWeight:'600',fontSize:12}}>GENERATE & SHARE</Text></TouchableOpacity>
                </View>
            </View>
            <View style={{marginHorizontal:10,marginVertical:10}}>
                <Text style={{color:'#444444',fontSize:16,fontWeight:'600'}}>GROW YOUR BUSINESS</Text>
                <FlatList
                data={category.items}
                horizontal={true}
                style={{borderRadius:10}}
                extraData={category.items}
                renderItem={({item})=> (
                    <TouchableOpacity style={{backgroundColor:'white',height:80,justifyContent:'center',padding:10}} onPress={()=> navigation.navigate(item.screen)}>
                        <Image style={{width:50,height:50}} source={{uri: item.icon}} />
                        <Text style={{textAlign:'center'}}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                />
            </View>
            <View style={{marginHorizontal:10}}>
                <FlatList
                data = {data.list1}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                initialNumToRender={1}
                removeClippedSubviews={true}
                style={{marginBottom:30}}
                pagingEnabled={true}
                renderItem = {({item}) => (
                    <View style={{backgroundColor:'white',width:Dimensions.get('screen').width -25 ,paddingVertical:10,paddingHorizontal:10,borderRadius:10,justifyContent:'center'}}>
                        <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'column',width:240}}>
                        <Text style={{fontSize:18,marginVertical:7,fontWeight:'700',color:'#444444'}}>{item.label}</Text>
                        <Text style={{fontSize:17,marginVertical:4,color:'#444444'}}>{item.text}</Text>
                        <TouchableOpacity style={{backgroundColor:'#ff7744',justifyContent:'center',alignItems:'center',width:110,marginVertical:15,paddingHorizontal:10,paddingVertical:10,borderRadius:20,elevation:6,shadowColor:'#ff7744'}}><Text style={{textAlign:'center',color:'white',fontWeight:'600'}}>APPLY NOW</Text></TouchableOpacity>
                        </View>
                        <View style={{}}>
                            <Image style={{height:130, width:80}} source={{uri:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHBhUTBxIWFRIXFxUYExIYFhIZGRgXGhIWFxYdGBkaHSsjGRolGxUXIzIiJikrLjA6GiA3ODcsPDQuMCsBCgoKDg0OGhAQGy0mICUvLS0wLS8tLS0vLy0tLS0tLS0vLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUDBgcCAf/EADoQAAIBAwEGAwMKBgMBAAAAAAABAgMEEQUGEiExQVEiYXETgaEVIzJCUpGxwdHwBxQzYpLhJHLx0v/EABoBAQACAwEAAAAAAAAAAAAAAAADBAECBQb/xAAuEQEAAgIBAwQBAwQBBQAAAAAAAQIDEQQSITETIkFRkQVhoUJxgeHwMjOxwdH/2gAMAwEAAhEDEQA/AO4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeak1Thmo0kubbwl7xvQ+5yB9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOTfxI2p+Ubl21jL5mD+ckuU5rp5xi/vfojj83k9U9FfClnyb9seGDY/baro8VTv1KpbLCzzlS7YfWP8Aa/d2evG5s49Vt4YxZpr58OsWN7T1C1jUspqcJcpL98H5HYreLRuq7ExPeEg2ZAAAAAAAAAAAAAAAAAAAAAAAAAAAAaXt/tJK0grXS3/yKi8Uk/6cH59JNfcsvsc/ncqMVZrHlBmyTHtr5aTKjR03T0q6TS7pNyl5L94PLxbJlv7UOq1jupoapKNfO6vZ8nSSW7j07+ZanDEx+/2i6+680m+raHU9voMt6lLjUoPLT78OjXfmvNcCXjc2+G3Tb/UpKzNPdTx9OnbN7SUNobbNo8TX06TxvR/WPmv9Ho8OeuWN1W6ZIv4XJM3AAAAAAAAAAAAAAAAAAAAAAAAABSbW7Qw2e0xzliVSXhpU/tS8/wC1c393VEHIzRiruUeTJ0Rtyv238kpVtRbncVW2+7b6eS/0l0PKZb25F/2+1X/p7z5l9tLGVzV9pqXF/Vp9IrzX5feR3yxSOjGVrM97Id7C2tangTnL7Cl4V6v8iXHOW0d+zW3TDxY3TtPnKS+abxUgvqvo15dvu7M2yUi/tnz8MVtru83l9K21j2umy3JLdcZx4Zyk2/POcNPn1JOPN8dYnfdi1tW3Druw+vVNoNJc7unuyjLdc19GeFxcV081y/Bej42actNzC7ivN43LYiwlAAAAAAAAAAAAAAAAAAAAAAAEbUr6nptlKreS3YQWW/wS7tvCS8zW94pHVLFrRWNy4xq2tS1XU3c3azJ8Lahz3Y54N/vi8+WPNcrNbPefr/19f/VG1+qeqf8ADDSjCwl7TUZb1Z8VHm1/v4dinM2ye3H2hjtXvPlm3K+p/wBT5qn2+s1+/T0ZrvHi8d5be63l5utBjKK/lHhrmpZefPPRinKn+picX0jwt3pNaP8AM4lTn4Z88L1z++ZJ1RlienzHhiI6J7sdxpsLbUYK5m40JSWZpZcY5W9w6tJ/+8ibj5K5Jjq7fbFqxE9/Duum0KVtYQjYJKkorc3eK3ccGn1zzz1yeopERWIr4dCsREdkk3ZAAAAAAAAAAAAAAAAAAAAAAPjeFxA43t9tR8t33s7N/wDHpvh2qS5OX/Xove+vDiczk+pbpr4hRzZOqdR4UljSqVIudPw/arS6L+3tw7fA5mS1I7T3/ZpWJ8pFrc21nUyt6cutRr8Mvh+JHemW8fX7MxNYXVvcRuYZoSTX4eq6FO9JrOpSxMT4RbzVoWlxuTTb4Zxjhn3ktMFrRtra8ROmavSjqFlhPKksxfn0ZpWZx3bTHVDVbupNzxcc4Ld9ybOlWI1uvyrTM/LrX8MbS6tdGfyjwpNp0IPO9FPO8/KL4NL1fU7vCrkjH7v8LvHraK925F1OAAAAAAAAAAAAAAAAAAAAAxXVzCzoOd1OMILnKTSS97MWtFY3LEzEeXONrNsvlqjK22fUnGXCpWfhzHqop8VF54t4fTHE5HM59YrNa+PtVyZer21U2j7MqTTr+Lza8K9F9Y5FIyZ59vaPtNxuFbJP7Mm2lorXToOi3uuajJd/C2vwfwLE8WmL3V2l5/GripE1+1HQsqXyfGd5Jwy3xXHK6YWCtbJfrmtY250VjW5Qra5dndb1B5Wf8o56kt6ReupaxOp7LLVLCV3NVbNbykk2uGeXn5EGLJFPZb4b3pvvCz0q3lbWKjV58Xjtl5wVs94tfcJKRqO6BcX1Oy2ip1dxVNyUXUg0mpY7Z+sl8UjocK049Wt4R2tEX27fa143VvGdu8wklKMl1TWUz1VZiY3C/E7jbKZZAAAAAAAAAAAAAAAAAAAAhXGp06POWX2jx/0Q2z0r8pqYL2+Gp7WWdPaSdP2znBU97gpLjvY5pppNY5+bKPItGbUN7fp0X112/CFYaDb2E80IeLGN6Tb+HLp2K/o0+YWMfCw4+8R+VmSrTUttq381apW7TVOfjxxw8Y+9Z+JRz54m/puL+pZYvqtfjyodPv5OnGl7KNRrO4njzfX3lTJjjfXvTm1t8ae9dpxhCDcVGo87yjywYwTM777hnJEdlnoTb0yOe8sf5Mr8j/uN8f8A0pdetGhTzWaS7v8AfEirWbTqG8zEeVPpmztxtFfSemwfs3Jt1Z+GCy+/V+Sy/Q7fH42TJEREIK47Xnt4dh2Z0h6Ho8KEqjqbufE1jm28JdFx7new4/TpFd7XqV6a6WhK3AAAAAAAAAAAAAAAAACNe3kbSGanPpHqyPJkikd0mPFbJOoa/d387p+N4j9lcvf3KN81rujjwUp+8opEmAIl7qVOyqxjXfjnlwjh8Us9eXNYIs2WMVeqVfNyseKdTPf6UW0GoV61rjT/AAr6yj9JryfT3cTn1583trxDmcnmZLxqnaP5Vmh2bpUpqsnuvhhrg8Z3uHYi5MR2mJ7wpY6+doV5o9S3q71llrph4kv1FORW0asjnHMeGBWde5wrjKjH60+CiuvPmb9eOvj+GOm0+VvZVJ3OKOhU3UcVxnyjFd5N8F14vC9TXFw75rbn/n+UlZmfbSNr7RtnrandKWv1HcVMrwxT9lH15Oa9yXkzscfjYcfae/8A4Xafp99dV/w6VSpqlTUaSSiuCSSSS8kuR14jXhl7MgAAAAAAAAAAAAAAAA+Se6gIl3dK2jvVOeOC79jS94pG5b0pN51DW69eVeo5VXxf7wc60zady6lKxSuoY8mum+zPcaNmRpiZZttdIjrmhKdivnaPjp454SW9Dlzwk15xRZ5OKubF7fj/AJpw+TimfPlpVnfwr2sZTlFN5WG0uK5/r7zyt8ExOohXraJjaWpb6WHnPoRzv5bINxqMYTUbdb83yUcv144JsfFm7Xe51XvLPp2z1XVqm9q892C4uKeIxXm118lx8zq8fg1jz2WqcKfOX8Q2ThKgqGkU3GjHlCK4yf2p45v1L0zuOikdnSxYaYo3OoWel2ELKftNSaUl9Gnza82l17EmOlad7/hjJe2T2447fawqa4lL5uDa83j9TeeVHxCOOHPzK0oVVWoqUeTWSzWdxtVtXpmYlkNmoAAAAAAAAAAAAADTdpduoadW9npiVWon4pNvcj5cPpP04L4F3Bw5vG7doVMvKis6r3l70jbD5WsX4FGquElnKx0cfjwfLHUp86luNMRHeJ+Vzg65ETM/Hw81JurPNR5fc5Nrzady7FaRWNQ84MbZ0+YGzRgbNGBs0yUqsqM80m0/IzF5r4YtStvKgvNl6FzWck5Qbbb3WsZbbeE1wWW+CIbY4mdqV/03FbvG4Rnso4UdyhcSUePhcM5z3xJEc8eu9/KGf0ztqL/wvtH0y10uzUY0XOePFUc2nJ9eXJdkW8c46Rrp/lPh4c4o1W38LF3MFTUaVGCS4pPMuPfj1JPWjWoqm9Cd7m0vE7ypL62F9mPhXwNJzXlvXBSO+vyxU4OpPFNNvsjSImZ7JLWisd1xY6Njjd/4L82W8fG+bKWXlb7U/K4SwuBbUn0AAAAAAAAAAAAMVzcQtaDncyUYRWZSbwkjMRMzqGJmIjcuZbV7az1LNLS24UeTnylP/wCY+XN9ccjq8fhxT3X8udm5M27V8NQLyomaTfPT76M+nKa7xfP9fcVuXx4z4pp8/H91nicicGWL/Hz/AGdBjJTinF5T4p+R46YmJ1L10TExuH0wyAAAAAAA+pZfAaJnXlJo6fVrfRg15vh+JLXDefhDbPjr8rG30RLjcSz5L9SevFj+qVa/Mn+mFpQoRoRxRil+/iWa0isdoVbWm07mWQ2agAAAAAAAAAAAAANU/iTazuNnc0OUJxnUXeKjJfBtP3Z6FvhWiuXv8q3LrM4+zlJ2XLAAG3bJah7a3dKo/FDjHzjn8n+KPOfq3F6L+rXxPn+/+3of0rk9VPSt5jx/b/TYDjuuAS7XT53KzFYj9p/l3JaYbXQ5M9KdvlZ0dEhH+q3J/cizXjVjyqW5d58dkuGnUocoL38fxJYw0j4RTnyT8vatKa5U4/4x/Qz0V+mvqX+5ff5Wn9iP+MR0V+mOu33LJGCgvCkvRG2ohjcy9GWAAAAAAAAAAAAAAAAAA81IKrTcaiymmmnyaaw0wTG3FNpdIeiavOk/ofSpvvB8veuKfod7Bl9SkWcfNj6LaVZMiAM9ldSs7qM6XOL5d11XvRFnwxmxzSflLhy2xXi9fh0S2qq6oxlQ4qSTj7/zPGZMdqXmkx3h7CmSt6RePEtg07SVTW9dLMukei9e7LeLjxHeylm5M27V8LYsqgAAAAAAAAAAAAAAAAAAAAAAAAANY2+0T5U0jforNWlmUe7j9eP3LK815lriZvTvqfEq3JxddNx5hyU7TlgADeP4Z6lGN5Khcc2nKi30fOcV5tcfdI5fO49d+tEd/EujxORbp9KZ7OknPXAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHtttF+R9ZfslilUzOn2XHxR9zf3NHa4mb1Kd/MOVyMXRft4lr5aVwDaNhNDq32q06yTjRpy3nN/Wa+rHvx59OZT5eataTT5la42K1rRb4h1k47pgAAAAAAAAAAAAAAAAAAAAAAAAAAAKXa3RvlrR5Qh/Uj4qT/uS5ejWV7yfj5fSvE/Hyhz4/UrpxhrdeJcH1T6M7rkN32V2Hlc4q60nGHONHlKX/AH+yvLn6defyObEe3H+V3Dxd97/h0elTjRpqNJJRSwopJJJckl0Ry5nc7lfiNdnsMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAED5Ftnfe2dGHtc5391Zz39fPmb+rfp6d9mnp131a7p5o3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Z'}} />
                        </View>
                        </View>
                    </View>
                )}
                ItemSeparatorComponent = {()=> (
                    <View style={{marginRight:5}}></View>
                )}
                />
            </View>
        </FlatScrollView>
    </>
    )
}

export default FreeChargeHome