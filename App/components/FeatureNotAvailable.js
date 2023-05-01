import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import constant from '../utils/constant';

const {COLOR: {BLACK}, FEATURE_NOT_AVAILABLE: {MESSAGE_1, MESSAGE_2}} = constant;

const FeatureNotAvailable = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.message}>{MESSAGE_1}</Text>
            <Text style={styles.message}>{MESSAGE_2}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        marginVertical: 52,

    },
    message:{
        fontSize: 16,
        color: BLACK,
        padding: 6,
        textAlign: 'center'
    }
})

export default FeatureNotAvailable;