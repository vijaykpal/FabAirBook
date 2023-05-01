import React from 'react';
import {View} from 'react-native';
import FlightBookingCard from '../../components/FlightBookingCard';

const Home = ({navigation}) => {
    return(
        <View>
            <FlightBookingCard navigation={navigation} />
        </View>
    )
};

export default Home;