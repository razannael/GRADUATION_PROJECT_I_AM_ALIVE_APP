import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import Colors from '../utils/Colors';

const CustomAlert = ({ visible, onClose, title, message }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
  <StatusBar hidden/>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    rowGap: 20,
  },
  modalContainer: {
    width: '86%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.FONTSCOLOR,
    marginBottom: 17,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
    textAlign: 'left',
  },
  modalButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomAlert;
