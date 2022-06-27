import React,{useState,useEffect} from 'react'
import {View,Text,Animated as Animate} from 'react-native'
import { Easing } from 'react-native-reanimated'
import Range from './GradientSlider'
const Cibil = (props) => {
    const {value} = props
    const [val,setVal] = useState(0)
    const v = new Animate.Value(val)
    const duration = 3000
    function textAnimate(){
        v.addListener(({value})=> setVal(Math.round(value)))
        Animate.timing(v,{
            toValue: value,
            duration: duration,
            easing:Easing.inOut(Easing.ease),
            useNativeDriver: false
        }).start()
    }
    useEffect(()=> {
        textAnimate()
    },[value])
    return(
        <>
        <View style={{backgroundColor:'white',borderRadius:10,marginHorizontal:10}}>
            <View onLayout={(e) => e.nativeEvent.layout.width} style={{justifyContent:'center',padding:'2%',margin:'2%',alignItems:'center'}}>
            <Animate.View>
                <Text style={{color:'black',fontSize:36,fontWeight:'bold',paddingVertical:0}}>{val}</Text>
            </Animate.View>
            </View>
        </View>
        <View style={{top:-10}}> 
            <Range {...props} widthPercentage={80} sliderScale={4}  /> 
        </View>
        </>
    )
}

export default Cibil

// Range component cannot inherit parents styling on its x-axis, be it margin or padding or width. Kindly refrain from doing so, else it will alter the working of our slider. 