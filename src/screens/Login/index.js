import React, { useRef, useEffect } from 'react'
import { Field , reduxForm } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text , Platform, StyleSheet, ScrollView, TouchableOpacity ,KeyboardAvoidingView, SafeAreaView, ActivityIndicator } from 'react-native'
import Colors  from '../../utils/Colors'
import { loginUser } from './actions'
import { FormInput , CustomButton } from '../../components'
import { passwordRequired, emailRequired, validatePassword , validateEmail } from '../../utils/Validations'
import { placeholders, LOGINFORM_BUTTON } from './constants'

// SIGN-IN screen for the user

const Login = (props) => {

    const loading = useSelector( state => state.Auth.loading )

    const passRef = useRef()
    const dispatch = useDispatch()

    const onSubmit = (values) => dispatch(loginUser(values))

    return (
        <SafeAreaView style={styles.screen}>
            <KeyboardAvoidingView
                behavior="height"
                style={styles.flexOne}
                keyboardVerticalOffset = { Platform.OS === 'ios' ? 40 : 0 }
            >
                <ScrollView keyboardShouldPersistTaps="handled">

                    <Field
                        name="email"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        autoCapitalize="none"
                        component={FormInput}
                        keyboardType="email-address"
                        placeholder={placeholders.EMAIL}
                        validate={[emailRequired,validateEmail]}
                        onSubmitEditing={() => passRef.current.focus()}
                    />
                    
                    <Field
                        secureField
                        name="password"
                        refField={passRef}
                        blurOnSubmit={true}
                        returnKeyType="done"
                        component={FormInput}
                        placeholder={placeholders.PASSWORD}
                        validate={[passwordRequired,validatePassword]}
                        onSubmitEditing={props.handleSubmit(onSubmit)}
                    />

                    { loading ? <ActivityIndicator size="large" color={Colors.green} /> : <CustomButton
                        style={styles.button}
                        buttonLabel={LOGINFORM_BUTTON}
                        onPress={props.handleSubmit(onSubmit)}
                    />}

                </ScrollView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default reduxForm({
    form: 'login-form'
})(Login)
 

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        marginHorizontal : 25
    },
    flexOne : {
        flex : 1
    },  
    forgotPass : {
        color : Colors.grey,
        textAlign : 'right',
        marginTop : 10,
        fontSize : 14
    },
    button : {
        marginTop : 20
    },
    signupLinkContainer : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 20,
    },
    signuptext : {
        fontSize : 14
    },  
    signupLink : {
        color : Colors.green,
    },
    errorText : {
        marginTop : 30,
        color : Colors.red,
        textAlign : 'center',
        fontSize : 16
    }
})