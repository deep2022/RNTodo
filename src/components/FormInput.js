import React , { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import Colors from '../utils/Colors'
import PasswordSwitch from './PasswordSwitch'
import { removeSpaces } from '../utils/Validations'
// FORM INPUT DATA FOR SIGN-IN FORM
const FormInput = (props) => {
    const { active , touched , error } = props.meta

    const [isPasswordVisible,setIsPasswordVisible] = useState(false)

    const eyePressHandler = () => setIsPasswordVisible(prevState => !prevState)
    
    const isPasswordTogglerVisible = () => 
        props.secureField 
        ? <PasswordSwitch isVisible={isPasswordVisible} onPress={eyePressHandler} />
        :null 
    
    const isErrorVisible = () => 
        touched && error
        ? <Text style={styles.errorText}>{error}</Text> 
        : null

    const formInputContainerStyle = {
        ...styles.formInputContainer,
        borderBottomColor : active ? Colors.green : Colors.grey
    }

    const textChangeHandler = (term) => {
        let value = !props.allowSpaces ? removeSpaces(term) : term
        props.input.onChange(value)
    }

    return (
        <View>
            <View style={formInputContainerStyle}>
                <TextInput
                    {...props}
                    ref={props.refField}
                    style={styles.input}
                    value={props.input.value}
                    onBlur={props.input.onBlur}
                    onFocus={props.input.onFocus}
                    onChangeText={textChangeHandler}
                    placeholderTextColor={Colors.black}
                    secureTextEntry={ props.secureField && !isPasswordVisible }
                />
                {isPasswordTogglerVisible()}
            </View>
            {isErrorVisible()}
        </View>
    )
}

export default FormInput

const styles = StyleSheet.create({
    formInputContainer :{
        marginTop : 20,
        borderBottomWidth : 1,
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    input : {
        flex  :1,
        color : Colors.black,
        fontSize : 14
    },
    errorText :  {
        color : Colors.red
    }
})
