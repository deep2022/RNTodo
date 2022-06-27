import React, {useEffect, useState } from 'react'
import {View,StyleSheet, Dimensions} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { useAnimatedStyle,useSharedValue,withTiming } from 'react-native-reanimated'
import PropTypes from 'prop-types'

const Red = 0             // degree on the color wheel for red is 0 or 360
const Yellow  = 0.6       // degree on the color wheel for yellow is 60
const Green = 1.2         // degree on the color wheel for green is 120
const Range = (props) => {
    const {value,widthPercentage,sliderScale,sliderRange} = props
    const sliderWidth = (Dimensions.get('screen').width)* widthPercentage*0.01  // total width of slider
    const initialValue = sliderRange[0]
    const finalValue = sliderRange[1]
    const [relativeWidth, setRelativeWidth] = useState(sliderWidth) // width covered by slider with respect to the sliderRange and current value.
    const animatedWidth = useSharedValue(sliderWidth)               // the width which will be animated using react native reanimated

    // Logic to animate the width using withTiming
    const animateGradientWidth = useAnimatedStyle(() => {
        if(value >= initialValue && value <= finalValue){
          animatedWidth.value = withTiming(relativeWidth, {
            duration: 3000,
          })
        }
        else{
          if(value < initialValue && relativeWidth >= sliderWidth ){
            animatedWidth.value = withTiming(sliderWidth, {
              duration: 3000,
            })
          }
          else if(value > finalValue && relativeWidth <= 0){
            animatedWidth.value = withTiming(0, {
              duration: 3000,
            })
          }
        }
      return {
          width: animatedWidth.value,
      }
    })
  // animating the thumb for current value as the width changes
  const animatethumb = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: sliderWidth -animatedWidth.value
        },
      ],
      borderColor: `hsl(${((sliderWidth - animatedWidth.value)/sliderWidth)*100*Green},100%,45%)`,
      backgroundColor: `hsl(${((sliderWidth - animatedWidth.value)/sliderWidth)*100*Green},100%,50%)`
    }
  })

  // Effect is used because the withtiming function was not working if we were directly implementing it in the first re-render (even when I create dependency array for animated styles ).
  useEffect(()=> {
    setRelativeWidth((1 - Math.round(value-initialValue)/((finalValue-initialValue)))*sliderWidth)
  },[])
    return(
        <View>
            <View style={[styles.container]}>
            <View style={[styles.subContainer,{width: `${widthPercentage}%`,height:sliderScale}]}>
            <LinearGradient colors={['hsl(0,100%,50%)','hsl(60,100%,50%)','hsl(120,100%,50%)']} style={[{height:sliderScale},styles.lineargradient]} useAngle={true} angle={90} />
            <Animated.View style={[animateGradientWidth,{backgroundColor:'#eeeeee',borderRadius:5,height:sliderScale,top:-sliderScale,width:20,alignSelf:'flex-end'}]} />
            <Animated.View style={[{height:4*sliderScale,width:4*sliderScale,borderRadius:3*sliderScale,top:-3.5*sliderScale,left:-3*sliderScale,borderWidth:2,},animatethumb]} />
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent:'center',
    marginBottom:20,
  },
  subContainer: {
    backgroundColor:'#eeeeee',
    borderRadius:10,
  },
  lineargradient: {
    borderRadius:10,
    width:'99%',
  },
})
Range.propTypes = {
  value: PropTypes.number,
  sliderHeight: PropTypes.number,
  sliderRange: PropTypes.arrayOf(PropTypes.number),
  widthPercentage : PropTypes.number,
}
Range.defaultProps = {
  value: 0,
  sliderHeight: 5,
  sliderRange: [300,900],
  widthPercentage: 90,
}
export default Range