import React from 'react';
import {View, Modal, StyleSheet, Text, Pressable} from 'react-native';
import constant from '../utils/constant';

const {COLOR: { BLACK }} = constant

const CustomModal = (props) => {
    const {modalVisible = false, setModalVisible, onDone, title, message, buttonText} = props;

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.modalText, styles.modalTitle]}>{title}</Text>
                        <Text style={styles.modalText}>{message}</Text>
                        <Pressable
                            style={styles.button}
                            onPress={onDone}>
                                <Text style={styles.BtntextStyle}>{buttonText}</Text>
                        </Pressable>
                    </View>
                </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 6,
      padding: 10,
      elevation: 2,
      backgroundColor: '#2196F3',
      paddingHorizontal: 26
    },
    BtntextStyle: {
      color: 'white',
      fontWeight: 600,
      textAlign: 'center',
      fontSize: 16
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: BLACK,
      fontSize: 16
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 600
    }
  });

export default CustomModal;