import React, {useState, useEffect} from 'react';
import {View, Modal, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Separator from '../components/Separator';
import {getTodayDate, dateMonthYearFormat, getDateAfter6Months} from '../utils/util';

const CustomCalendar = (props) => {
    const {modalVisible, setModalVisible, onSelectDate} = props;
    const [selectedDate, setSelectedDate] = useState(getTodayDate());
    const [depratureDate, setDepratureDate] = useState(dateMonthYearFormat(getTodayDate()))

    const marked = {
        [selectedDate]: { selected: true }
    };

    const onDateSelection = (dateObj) => {
        const {dateString} = dateObj;
        setSelectedDate(dateString);
        const depDate = dateMonthYearFormat(dateString);
        setDepratureDate(depDate);
    };

    useEffect(() => {
        setSelectedDate(getTodayDate());
        setDepratureDate(dateMonthYearFormat(getTodayDate()));
    }, [modalVisible])

    return(
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={{alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{width: 40}}>
                            <CommunityIcon name="close" size={32} style={{paddingRight: 12}}  />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.selectDate}>Select Date</Text>
                    <Text style={{fontSize: 16}}>Departure Date</Text>
                    <Text style={styles.departureDate}>{depratureDate}</Text>
                    <Separator width='40%' />
                    <Calendar 
                        onDayPress={(day) => onDateSelection(day) }
                        minDate={getTodayDate()}
                        maxDate={getDateAfter6Months()}
                        markedDates={marked}
                        disableAllTouchEventsForDisabledDays={true}
                        onPressArrowLeft={(goToPreviousMonth) => goToPreviousMonth()}
                        onPressArrowRight={(goToNextMonth) => goToNextMonth()}
                    />

                    <TouchableOpacity onPress={() => onSelectDate(selectedDate)} style={styles.selectDateBtn}>
                        <Text style={styles.selectDateBtnTxt}>Select Date</Text>
                    </TouchableOpacity>
                </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        marginVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: '#FFF'
    },
    closeButtonText:{
        fontSize: 16,
        color: '#000',
        marginBottom: 24,
    },
    selectDate: {
        fontSize: 24,
        color: '#000',
        fontWeight: 700,
        marginBottom: 14,
    },
    departureDate:{
        fontSize: 18,
        color: '#000',
        fontWeight: 700,
        marginVertical: 6
    },
    selectDateBtn:{
        backgroundColor: 'rgb(33, 150, 243)',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 6,
        marginVertical: 52
    },
    selectDateBtnTxt:{
        fontSize: 20, 
        color: '#FFF', 
        alignSelf: 'center',
       
    }
})

export default CustomCalendar;