import React, {useState} from 'react';
import {View, Modal, StyleSheet, Text, TouchableOpacity, Pressable} from 'react-native';
import { RadioButton } from 'react-native-paper';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Separator from './Separator';
import constant from '../utils/constant';

const {COLOR: {NEW_BLUE, WHITE, BLACK, GRAY}} = constant

const DecrimentButton = ({ onDecrement, isDisable}) => {
    return(
        <TouchableOpacity style={[styles.decrimentView, {borderColor: !isDisable ? NEW_BLUE : GRAY}]}  onPress={onDecrement}>
            <View style={{borderBottomWidth: 2, width: 14, borderBottomColor: !isDisable ? NEW_BLUE : GRAY}} />
        </TouchableOpacity>
    );
};

const IncrementButton = ({ onIncrement, isDisable}) => {
    return(
        <TouchableOpacity style={[styles.incrementView, {borderColor: !isDisable ? NEW_BLUE : GRAY}]} onPress={onIncrement}>
            <Text style={{fontSize: 24, color: !isDisable ? NEW_BLUE : GRAY}}>+</Text>
        </TouchableOpacity>
    );
};

const TravellersModal = (props) => {
    const {modalVisible, setModalVisible, onDone} = props;
    const [adultsCount, setAdultsCount] = useState(1);
    const [childrenCount, setChildrenCount] = useState(0);
    const {CABIN_CLASS: {ECONOMY, PREMIMU_ECONOMY, BUSINESS}} = constant;
    const [selectedClass, setSelectedClass] = useState(ECONOMY)

    const onClosePress = () => {
        setAdultsCount(1);
        setModalVisible(false);
    }

    const onAdultsIncrement = () => {
        if(adultsCount < 9){
            setAdultsCount(adultsCount + 1);
        }
        else{
            // Show error
        }
    };

    const onAdultsDecrement = () => {
        if(adultsCount > 1){
            setAdultsCount(adultsCount - 1);
        }  
    };

    const onChildrenIncrement = () => {
        if(childrenCount < 3){
            setChildrenCount(childrenCount + 1);
        }
        else{
            // Show error
        }
    };

    const onChildrenDecrement = () => {
        if(childrenCount > 0){
            setChildrenCount(childrenCount - 1);
        }
    };

    const onClassSelect = (cabinClass) => {
        setSelectedClass(cabinClass)
    };

    const onDonePressed = () => {
        const data = {
            adults: adultsCount,
            children: childrenCount,
            cabinClass: selectedClass
        }
        onDone(data);
        setModalVisible(false);
    }

    return(
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={{alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={onClosePress} style={{width: 40}}>
                            <CommunityIcon name="close" size={32} style={{paddingRight: 12}}  />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Travellers</Text>

                    <View style={styles.adultsContainer}>
                        <View style={{marginLeft: 12}}>
                            <Text style={styles.optionsText}>Adults</Text>
                            <Text style={styles.optionsSubText}>{'>12 years'}</Text>
                        </View>
                        <View style={styles.counterView}>
                            <DecrimentButton onDecrement={onAdultsDecrement} isDisable={adultsCount < 2} />
                            <Text style={styles.counterText}>{adultsCount}</Text>
                            <IncrementButton onIncrement={onAdultsIncrement} isDisable={adultsCount > 8} />
                        </View>
                    </View>

                    <View style={styles.adultsContainer}>
                        <View style={{marginLeft: 12}}>
                            <Text style={styles.optionsText}>Children</Text>
                            <Text style={styles.optionsSubText}>{'<12 years'}</Text>
                        </View>
                        <View style={styles.counterView}>
                            <DecrimentButton onDecrement={onChildrenDecrement} isDisable={childrenCount < 1} />
                            <Text style={styles.counterText}>{childrenCount}</Text>
                            <IncrementButton onIncrement={onChildrenIncrement} isDisable={childrenCount > 2} />
                        </View>
                    </View>
                    <Separator />

                    <Text style={[styles.title, {marginTop: 18}]}>Class</Text>
                    <RadioButton.Group onValueChange={newValue => onClassSelect(newValue)} value={selectedClass}>
                        <Pressable style={styles.radioBtnContainer} onPress={() => onClassSelect(ECONOMY)}>
                            <RadioButton value={ECONOMY} color={NEW_BLUE} />
                            <Text style={styles.optionsText}>{ECONOMY}</Text>
                        </Pressable>
                        <Pressable style={styles.radioBtnContainer} onPress={() => onClassSelect(PREMIMU_ECONOMY)}>
                            <RadioButton value={PREMIMU_ECONOMY} color={NEW_BLUE} />
                            <Text style={styles.optionsText}>{PREMIMU_ECONOMY}</Text>
                        </Pressable>
                        <Pressable style={styles.radioBtnContainer} onPress={() => onClassSelect(BUSINESS)}>
                            <RadioButton value={BUSINESS} color={NEW_BLUE} />
                            <Text style={styles.optionsText}>{BUSINESS}</Text>
                        </Pressable>
                    </RadioButton.Group>

                    <TouchableOpacity onPress={onDonePressed} style={styles.doneBtn}>
                        <Text style={styles.doneBtnTxt}>Done</Text>
                    </TouchableOpacity>

                </View>
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
    adultsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32
    },
    counterView:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    decrimentView:{
        borderWidth: 1,
        borderColor: GRAY,
        height: 36,
        width: 36,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8
    },
    incrementView:{
        borderWidth: 1,
        borderColor: GRAY,
        height: 36,
        width: 36,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8
    },
    radioBtnContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: 180,
    },
    optionsText:{
        fontSize: 16,
        color: BLACK,
        fontWeight: 600
    },
    optionsSubText: {
        fontSize: 12, 
        color: BLACK, 
        fontWeight: 600
    },
    counterText:{
        fontSize: 16, 
        color: BLACK
    },
    doneBtn:{
        backgroundColor: NEW_BLUE,
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 6,
        marginVertical: 52
    },
    doneBtnTxt:{
        fontSize: 20, 
        color: WHITE, 
        alignSelf: 'center',
    }
})

export default TravellersModal;