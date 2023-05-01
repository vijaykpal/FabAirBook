import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import constant from '../utils/constant';
import {getTimeFromDateTime} from '../utils/util';

const {COLOR: {GREEN, LIGHT_BLUE, NEW_BLUE}} = constant;

const FlightCard = ({flightDetails, navigation, userDetails}) => {
    
    const {fare, displayData: {totalDuration, stopInfo, source, destination}} = flightDetails;
    const {airlineName} = flightDetails.displayData.airlines[0];

    const onCardPress = () => {
        navigation.navigate('FlightDetails', {flightDetails: flightDetails, userDetails: userDetails});
    };

    return(
        <Card style={styles.container} onPress={onCardPress}>
            <Card.Content>
                <View style={{flexDirection: 'row'}}>
                    <MaterialIcon name="flight-takeoff" size={24} style={{paddingRight: 12}} color={NEW_BLUE} />
                    <Text variant="titleMedium" style={{color: NEW_BLUE}}>{airlineName}</Text>
                </View>
                
                <View style={styles.detailsContainer}>
                    <View style={styles.scheduleView}>
                        <Text style={styles.scheduleTime}>{getTimeFromDateTime(source.depTime)} - {getTimeFromDateTime(destination.arrTime)}</Text>
                        <Text style={styles.scheduleDuration}>{totalDuration} | {stopInfo}</Text>
                    </View>
                    <View style={styles.fareView}>
                        <Text style={styles.fareTxt}>₹ {fare}</Text>
                        <Text>per head</Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    ) 
};

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 18,
        marginVertical: 12,
        backgroundColor: LIGHT_BLUE
    },
    detailsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 6
    },
    scheduleView:{},
    scheduleTime:{
        fontSize: 16,
        fontWeight: 700
    },
    scheduleDuration:{
        fontSize: 14
    },
    fareView:{},
    fareTxt:{
        fontSize: 18,
        fontWeight: 700,
        color: GREEN
    }
})

export default FlightCard;