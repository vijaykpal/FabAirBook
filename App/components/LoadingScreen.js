import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import constant from '../utils/constant';

const {LOADING:{MESSAGE_1, MESSAGE_2}, COLOR: {BLACK}} = constant;

const LoadingScreen = ({loaderSize = 'large'}) => {
    return(
        <View style={styles.container}>
            <ActivityIndicator size={loaderSize} />
            <Text style={styles.loaderMsg1}>{MESSAGE_1}</Text>
            <Text style={styles.loaderMsg2}>{MESSAGE_2}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        marginVertical: 48
    },
    loaderMsg1:{
        fontSize: 24,
        fontWeight: 700,
        color: BLACK,
        textAlign: 'center',
        marginTop: 48
    },
    loaderMsg2:{
        fontSize: 16,
        color: BLACK,
        textAlign: 'center',
        marginTop: 6
    }
})

export default LoadingScreen;