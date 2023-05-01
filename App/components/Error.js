import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import constant from '../utils/constant'

const {COLOR: {BLACK, WHITE, NEW_BLUE}} = constant;

const Error = ({onButtonClick, message, buttonText}) => {

    return(
        <View style={styles.container}>
            <Text />
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity onPress={onButtonClick} style={styles.okBtn}>
                <Text style={styles.okBtnTxt}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 12,
        marginVertical: 24,
        justifyContent: 'space-between',

    },
    message:{
        fontSize: 16,
        color: BLACK,
        padding: 6,
        textAlign: 'center'
    },
    okBtn:{
        backgroundColor: NEW_BLUE,
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 52
    },
    okBtnTxt:{
        fontSize: 20, 
        color: WHITE, 
        alignSelf: 'center',
    }
})

export default Error;