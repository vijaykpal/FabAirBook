import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import constant from '../utils/constant';

const {COLOR: {BLACK, GRAY}} = constant;

const Pill = ({onPress, containerStyle={}, title, iconName, showIcon}) => {
    return(
        <Pressable style={[styles.container, {...containerStyle}]} onPress={onPress}>
            {showIcon ? <CommunityIcon name={iconName} size={18} style={{paddingRight: 6}} /> : null }
            <Text style={styles.btnTxt}>{title}</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderRadius: 24,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        flexDirection: 'row',
        borderColor: GRAY,
        paddingHorizontal: 8,
    },
    btnTxt:{
        fontSize: 16,
        color: BLACK
    }
})

export default Pill;