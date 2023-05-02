import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Card } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Awesome5Icon from 'react-native-vector-icons/FontAwesome5';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import constant from '../../utils/constant';
import {getTimeFromDateTime, getTravellersInfo} from '../../utils/util';
import CustomModal from '../../components/CustomModal';

const {COLOR: {BLACK, GREEN, WHITE, NEW_BLUE}, BOOKING_SUCCESS_URL, BOOKING_SUCCESS_MSG, BOOKING_FAILURE_MSG} = constant;

const FlightDetails = ({navigation, route}) => {
    const {flightDetails, userDetails} = route.params;
    const [showSuccessModal, setShowSuccessModal] = useState();
    const [showFailureModal, setShowFailureModal] = useState(false);
    const [note, setNote] = useState('');
    const {deptDate, travellers, travellers: {adults = 1, children = 0, cabinClass}} = userDetails;

    const { fare, displayData: {totalDuration, stopInfo, airlines, source, destination}} = flightDetails;
    const {airlineName, airlineCode, flightNumber} = airlines[0];
    const {depTime, airport:{cityName: sourceCity}} = source;
    const {arrTime, airport:{cityName: destinationCity} } = destination;

    const netFare = fare*(adults+children);
    
    const onContinuePress = async () => {
        try{
            const res = await fetch(BOOKING_SUCCESS_URL);
            const {data} = await res.json();
            if(data.tripId) setShowSuccessModal(true);
            else setShowFailureModal(true);
        }
        catch(err){
            setShowFailureModal(true);
        } 
    }

    const onSuccessDone = () => {
        setShowSuccessModal(false);
        navigation.navigate('Home');
    };

    const onFailureDone = () => {
        setShowFailureModal(false);
        navigation.navigate('FlightsList', userDetails);
    };

    return(
        <ScrollView>
            <View style={{margin: 14}}>
                <Card style={styles.container}>
                    <Card.Content>
                        <View style={styles.rowContainer}>
                            <Text style={styles.departTxt}>DEPART</Text>
                            <CommunityIcon name="checkbox-blank-circle" size={4} style={{paddingRight: 10}} />
                            <Text style={styles.departTxt}>{deptDate}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.cityTxt}>{sourceCity}</Text>
                            <Awesome5Icon name="plane" size={18} style={{paddingRight: 12}} />
                            <Text style={styles.cityTxt}>{destinationCity}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.timeTxt}>{getTimeFromDateTime(depTime)}</Text>
                            <Text style={styles.timeTxt}>---</Text>
                            <Text style={styles.timeTxt}>{getTimeFromDateTime(arrTime)}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <MaterialIcon name="flight-takeoff" size={24} style={{paddingRight: 12}}  />
                            <Text style={styles.detailsTxt}>{airlineName}</Text>
                            <Text style={styles.detailsTxt}>{airlineCode}-{flightNumber}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <CommunityIcon name="sofa" size={24} style={{paddingRight: 12}}  />
                            <Text style={styles.detailsTxt}>{cabinClass} Class</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <CommunityIcon name="clock-outline" size={24} style={{paddingRight: 12}}  />
                            <Text style={styles.detailsTxt}>{totalDuration}</Text>
                            <CommunityIcon name="checkbox-blank-circle" size={8} style={{paddingRight: 10}} />
                            <Text style={styles.detailsTxt}>{stopInfo}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <CommunityIcon name="bag-checked" size={24} style={{paddingRight: 12}}  />
                            <Text style={styles.detailsTxt}>Cabin baggage 5 kg, allowed {adults} {adults > 1 ? 'pieces' : 'piece'}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <CommunityIcon name="bag-suitcase" size={24} style={{paddingRight: 12}}  />
                            <Text style={styles.detailsTxt}>Check-in baggage 10 kg, allowed {adults} {adults > 1 ? 'pieces' : 'piece'}</Text>
                        </View>

                        <View style={styles.fareContainer}>
                            <View>
                                <Text style={styles.fareTxt}>Travellers info</Text>
                                <Text style={{fontSize: 18, }}>{getTravellersInfo(travellers)}</Text>
                            </View>
                            <View>
                                <Text style={styles.fareTxt}>Fare</Text>
                                <Text style={styles.fareValue}>₹ {netFare}</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>

                <View style={styles.noteContainer}>
                    <Text style={styles.fareTxt}>Add Note</Text>
                    <Card>
                    <Card.Content>
                        <View>
                            <TextInput 
                                style={styles.noteTxt}
                                onChangeText={setNote}
                                value={note}
                                multiline
                                numberOfLines={4}
                                maxLength={300}
                                autoCapitalize='sentences'
                                textAlignVertical='top'
                                placeholder="You can add your note here..."
                            />
                        </View>
                    </Card.Content>
                    </Card>
                </View>

                <View>
                    <Text style={styles.fareTxt}>Important</Text>
                    <View style={styles.rowContainer}>
                        <CommunityIcon name="shield-check-outline" size={14} color={NEW_BLUE} style={{paddingRight: 8}}  />
                        <Text style={styles.imortantSubTitle}>Mandatory Checklist for all travellers</Text>
                    </View>
                    
                    <View style={{flexDirection: 'row', marginVertical: 2, marginHorizontal: 4}}>
                        <CommunityIcon name="checkbox-blank-circle" size={6} style={{paddingRight: 10, marginTop: 6}} />
                        <Text>Passengers are advised to wear masks and practice social distancing in the flights.</Text>
                    </View>
                    <View style={{flexDirection: 'row', margin: 4 }}>
                        <CommunityIcon name="checkbox-blank-circle" size={6} style={{paddingRight: 10, marginTop: 6}} />
                        <Text>Please check the baggage allowance before check-in. The airline has the authority to add any extra charges for excess luggage.</Text>
                    </View>
                </View>
                
                <TouchableOpacity onPress={onContinuePress} style={styles.doneBtn}>
                    <Text style={styles.doneBtnTxt}>Continue</Text>
                </TouchableOpacity>
            </View>

            <CustomModal 
                modalVisible={showSuccessModal} 
                setModalVisible={setShowSuccessModal} 
                onDone={onSuccessDone}
                title='Congratulations..!!'
                message={BOOKING_SUCCESS_MSG}
                buttonText='Ok'
            />

            <CustomModal 
                modalVisible={showFailureModal} 
                setModalVisible={setShowFailureModal} 
                onDone={onFailureDone}
                title='Sorry..!!'
                message={BOOKING_FAILURE_MSG}
                buttonText='Ok'
            />
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container:{
        marginVertical: 6,
    },
    rowContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2
    },
    departTxt:{
        fontSize: 16,
        fontWeight: 600,
        paddingRight: 12
    },
    cityTxt:{
        fontSize: 18,
        fontWeight: 600,
        paddingRight: 12,
        color: BLACK
    },
    timeTxt:{
        fontSize: 16,
        paddingRight: 12,
    },
    detailsTxt:{
        fontSize: 14,
        paddingRight: 12
    },
    fareContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8
    },
    fareTxt:{
        fontSize: 18,
        fontWeight: 600,
        color: BLACK
    },
    fareValue:{
        fontSize: 24,
        color: GREEN,
        fontWeight: 600,
    },
    doneBtn:{
        backgroundColor: NEW_BLUE,
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 12
    },
    doneBtnTxt:{
        fontSize: 20, 
        color: WHITE, 
        alignSelf: 'center',
    },
    noteContainer:{
        marginVertical: 16,
    },
    noteTxt:{
        padding: 0,
        fontSize: 16,
        maxHeight: 86
    },
    imortantSubTitle:{
        fontSize: 14,
        fontWeight: 600,
        color: BLACK
    }
})

export default FlightDetails