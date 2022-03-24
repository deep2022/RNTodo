import React from 'react'
import { StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

import Colors from '../utils/Colors'

const PasswordSwitch = (props) => {
    return(
        <Feather
            size={20}
            color={Colors.grey}
            style={styles.eyeIcon}
            onPress={props.onPress}
            name={props.isVisible ? 'eye' : 'eye-off'}
        />  
    )
}

export default PasswordSwitch

const styles = StyleSheet.create({
    eyeIcon : {
        marginRight : 5
    },
})