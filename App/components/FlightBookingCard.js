import React, {useState} from 'react';
import {
    Pressable,
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Separator from './Separator';
import Calendar from './Calendar';
import TravellersModal from './TravellersModal';
import FeatureNotAvailable from './FeatureNotAvailable';
import {getTodayDate, dateMonthYearFormat, getTravellersInfo} from '../utils/util';
import constant from '../utils/constant';

const {COLOR: {NEW_BLUE, WHITE, GRAY}} = constant;

const FlightBookingCard = ({navigation}) => {
    const [selectedTripType, setSelectedTripType] = useState('oneWay');
    const [cityFrom, setCityFrom] = useState('DELHI');
    const [cityTo, setCityTo] = useState('MUMBAI');
    const [modalVisible, setModalVisible] = useState(false);
    const [travellersModalVisible, setTravellersModalVisible] = useState(false);
    const [depratureDate, setDepratureDate] = useState(dateMonthYearFormat(getTodayDate()));
    const [travellersDetails, setTravellersDetails] = useState({
        adults: 1,
        children: 0,
        cabinClass: 'Economy'
    });
    const [isButtonDisable, setIsButtonDisable] = useState(false)

    const onTripTypePress = (tripType) => {
        if(tripType !== selectedTripType){
            setSelectedTripType(tripType);
        }
    };

    const onSelectDate = (date) => {
        setDepratureDate(dateMonthYearFormat(date));
        setModalVisible(false);
    };

    const onSelectTravellersAndClass = (data) => {
        setTravellersDetails(data);
    }

    const textChangeHandler = (value, handler) => {
        handler(value);
        if(!value.length) setIsButtonDisable(true);
        else setIsButtonDisable(false);
    }

    const onSearchFlights = () => {
        const searchFlightParams = {
            from: cityFrom,
            to: cityTo,
            deptDate: depratureDate,
            travellers: travellersDetails
        }
        navigation.navigate('FlightsList', searchFlightParams);
    };

    return(
        <View style={styles.container}>
            <View style={styles.tripTypeContainer}>
                <TouchableOpacity style={[styles.tripTypeView, {backgroundColor: selectedTripType === 'oneWay'? '#FFF': null}]} onPress={() => onTripTypePress('oneWay')}>
                    <Text style={[styles.tripTypeText, {fontWeight: selectedTripType === 'oneWay'? 'bold': 400}]}>One Way</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tripTypeView, {backgroundColor: selectedTripType === 'roundTrip'? '#FFF': null}]} onPress={() => onTripTypePress('roundTrip')}>
                    <Text style={[styles.tripTypeText, {fontWeight: selectedTripType === 'roundTrip'? 'bold': 400}]}>Round Trip</Text>
                </TouchableOpacity>
            </View>
            {selectedTripType === 'oneWay' ?
            <>
                <View style={styles.cityContainer}>
                    <View style={{width: '40%'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 16, marginRight: 6}}>From</Text>
                            <MaterialIcon name="flight-takeoff" size={24} style={{paddingRight: 12}}  />
                        </View>
                        <TextInput
                            style={styles.cityCodeText}
                            onChangeText={(val) => textChangeHandler(val, setCityFrom)}
                            value={cityFrom}
                            placeholder="Enter City"
                        />
                    </View>
                    <View style={{alignItems: 'flex-end', width: '40%'}}>
                        <View style={{flexDirection: 'row'}}>
                            <MaterialIcon name="flight-land" size={24} style={{paddingRight: 6}}  />
                            <Text style={{fontSize: 16}}>To</Text>
                        </View>
                        
                        <TextInput
                            style={styles.cityCodeText}
                            onChangeText={(val) => textChangeHandler(val, setCityTo)}
                            value={cityTo}
                            placeholder="Enter City"
                            textAlign='right'
                        />
                    </View>
                </View>
                <Separator />

                <View style={styles.departureContainer}>
                    <Text style={{fontSize: 16, marginBottom: 12}}>Departure Date</Text>
                    <Pressable
                        onPress={() => setModalVisible(true)}>
                        <Text style={[styles.tripTypeText, {fontWeight: 700}]}>{depratureDate}</Text>
                    </Pressable>
                    <Calendar 
                        modalVisible={modalVisible} 
                        setModalVisible={setModalVisible}
                        onSelectDate={onSelectDate}
                    />

                </View>
                <Separator />

                <View style={styles.departureContainer}>
                    <Text style={{fontSize: 16}}>Travellers & Class</Text>
                    <Pressable
                        onPress={() => setTravellersModalVisible(true)}>
                        <Text style={[styles.tripTypeText, {fontWeight: 700}]}>{getTravellersInfo(travellersDetails)}{' & ' + travellersDetails.cabinClass}</Text>
                    </Pressable>
                    <TravellersModal 
                        modalVisible={travellersModalVisible} 
                        setModalVisible={setTravellersModalVisible}
                        onDone={onSelectTravellersAndClass}
                    />
                </View>
                <Separator />

                <TouchableOpacity 
                    onPress={onSearchFlights} 
                    style={[styles.searchBtn, {backgroundColor: isButtonDisable ? GRAY : NEW_BLUE}]} 
                    disabled={isButtonDisable}>
                        <Text style={styles.searchBtnTxt}>Search Flights</Text>
                </TouchableOpacity>
            </> : 
            <FeatureNotAvailable />
            }

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 18,
        margin: 12,
        borderColor: '#808080',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0 8 30 0'
    },
    tripTypeContainer: {
        backgroundColor: '#ADD8E6',
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tripTypeView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '48%',
        borderRadius: 2,
        padding: 4
    },
    tripTypeText: {
        fontSize: 18,
        color: '#000',
    },
    cityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 18,
    },
    cityCodeText: {
        fontSize: 24,
        color: '#000',
        paddingHorizontal: 0
    },
    departureContainer: {
        marginTop: 18,
        marginBottom: 10,
    },
    searchBtn:{
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 52
    },
    searchBtnTxt:{
        fontSize: 20, 
        color: WHITE, 
        alignSelf: 'center',
    }
});

export default FlightBookingCard;