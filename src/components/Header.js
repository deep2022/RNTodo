import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Header = ({goBack,title}) => {
    return (
        <View style={styles.header}>

            <TouchableOpacity onPress={goBack}>
                <Ionicons name="md-chevron-back-sharp" size={30} />
            </TouchableOpacity>
            
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
        
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header : {
        flexDirection : 'row',
        alignItems : 'center',
        paddingVertical : 10   
    },
    titleContainer : {
        flex : 1 , 
        alignItems : 'center' , 
        marginLeft : -30,
    },
    title : {
        fontSize : 20
    }
})
