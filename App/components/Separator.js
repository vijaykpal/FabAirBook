import React from 'react';
import {View, StyleSheet} from 'react-native';

const Separator = ({color, width}) => {
    return(
        <View style={[styles.container, {borderTopColor: color, width: width}]} />
    )
};

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 0.5,
        borderTopColor: '#D3D3D3',
        width: '100%'
    }
});

export default Separator;