import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Modal} from 'react-native';
import {Checkbox} from 'react-native-paper';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Separator from './Separator';
import constant from '../utils/constant';

const {COLOR: {BLACK, WHITE, NEW_BLUE}} = constant;

const FiltersModal = ({isVisible, onClose, onApplyFilter}) => {

    const [airlines, setAirlines] = useState({
        JetSpice: false,
        AirIndia: false,
        Vistara: false,
        Indigo: false
    });
    
    const isCheckboxSelected = (flight) => {
        const markedFlight = {
            [flight] : !airlines[flight]
        }
        const updatedSelection = {...airlines, ...markedFlight}
        setAirlines(updatedSelection);
    };

    const onApplyFilters = () => {
        onClose(false);
        onApplyFilter(airlines)
    }

    return(  
        <Modal
            visible={isVisible}
            style={styles.container}
            onDismiss={() => onClose(false)}>
                <View style={styles.centeredView}>
                    <View style={{alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={() => onClose(false)} style={{width: 40}}>
                            <CommunityIcon name="close" size={32} style={{paddingRight: 12}}  />
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.title}>Filter by</Text>
                    <Text style={styles.subTitle}>Airlines</Text>
                    <View style={{marginBottom: 16}}>
                        <View style={styles.checkboxView}>
                            <Checkbox
                                status={airlines.JetSpice ? 'checked' : 'unchecked'}
                                color={NEW_BLUE}
                                onPress={() => isCheckboxSelected('JetSpice')}/>
                            <Text style={styles.checkboxTxt}>JetSpice</Text>
                        </View>
                        <View style={styles.checkboxView}>
                            <Checkbox
                                status={airlines.AirIndia ? 'checked' : 'unchecked'}
                                color={NEW_BLUE}
                                onPress={() => isCheckboxSelected('AirIndia')}/>
                            <Text style={styles.checkboxTxt}>AirIndia</Text>
                        </View>
                        <View style={styles.checkboxView}>
                            <Checkbox
                                status={airlines.Vistara ? 'checked' : 'unchecked'}
                                color={NEW_BLUE}
                                onPress={() => isCheckboxSelected('Vistara')}/>
                            <Text style={styles.checkboxTxt}>Vistara</Text>
                        </View>
                        <View style={styles.checkboxView}>
                            <Checkbox
                                status={airlines.Indigo ? 'checked' : 'unchecked'}
                                color={NEW_BLUE}
                                onPress={() => isCheckboxSelected('Indigo')}/>
                            <Text style={styles.checkboxTxt}>Indigo</Text>
                        </View>
                    </View>
                    <Separator />
                </View>

                <TouchableOpacity onPress={onApplyFilters} style={styles.filterBtn}>
                        <Text style={styles.filterBtnTxt}>Apply Filters</Text>
                </TouchableOpacity>
        </Modal>
    )
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        marginVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: WHITE
    },
    closeButtonText:{
        fontSize: 16,
        color: BLACK,
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        color: BLACK,
        fontWeight: 700,
        marginBottom: 14,
    },
    subTitle: {
        fontSize: 18,
        color: BLACK,
        fontWeight: 700,
        marginBottom: 14,
    },
    checkboxView:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxTxt:{
        fontSize: 16,
        color: BLACK,
        fontWeight: 500
    },
    filterBtn:{
        backgroundColor: NEW_BLUE,
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 6,
        marginVertical: 12,
        marginHorizontal: 16
    },
    filterBtnTxt:{
        fontSize: 20, 
        color: WHITE, 
        alignSelf: 'center',
    }
})

export default FiltersModal;