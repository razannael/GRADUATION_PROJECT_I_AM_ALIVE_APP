import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DeviceModal from "../../DeviceConnectionModal";
import { PulseIndicator } from "../../PulseIndicator";
import useBLE from "../../useBLE";
import Colors from "../utils/Colors";
import { UserLocationContext } from "../contexts/UserLocationContext";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";


const HeartRate = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    heartRate,
    disconnectFromDevice,
  } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const context = useContext(UserLocationContext);

  if (context === null) {
    throw new Error('UserLocationContext is null');
  }

  const { location } = context;
  const handleheartRateLocation = async () => {
    const token = await SecureStore.getItemAsync('secure_token');
  
    if (token) {
      try {
        const response = await axios.post('https://graduation-project1-fapf.onrender.com/victim/setHeartAndLocation',
          {
            heartRate: heartRate,
            location: {
                latitude: location?.latitude,
                longitude : location?.longitude
            }
        }
        , {
          headers: {
            Authorization: `IAMALIVE__${token}`
          }
        });
  
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('No token found');
    }
  };



  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
        {connectedDevice ? (
          <>
            <TouchableOpacity onPress={handleheartRateLocation} activeOpacity={1}>
               <PulseIndicator />
            </TouchableOpacity>
            <Text style={styles.heartRateTitleText}>Your Heart Rate Is:</Text>
            <Text style={styles.heartRateText}>{heartRate} bpm</Text>
          </>
        ) : (
          <Text style={styles.heartRateTitleText}>
            Please Connect to a Heart Rate Monitor
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {connectedDevice ? "Disconnect" : "Connect"}
        </Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    marginBottom: 0,
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center",
    marginHorizontal: 20,
    color: Colors.FONTSCOLOR,
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: Colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 40,
    marginBottom: 70,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default HeartRate;