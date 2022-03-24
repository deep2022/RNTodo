import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import Colors from '../utils/Colors'

const DeleteButton = ({ onDelete }) => {
    return (
        <TouchableOpacity onPress={onDelete}>
            <MaterilaIcons 
                size={25}
                name="delete"
                color={Colors.red}
                style={styles.deleteIcon}
            />
        </TouchableOpacity>
    )
}

export default DeleteButton

const styles = StyleSheet.create({
    deleteIcon : { 
        marginTop : 20 , 
        marginHorizontal : 10
    }
})
