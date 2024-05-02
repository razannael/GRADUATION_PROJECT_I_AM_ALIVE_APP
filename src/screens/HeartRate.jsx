import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../utils/Colors.js'

const HeartRate = () => {
const [heartRate, setHeartRate] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.heartContainer}>
        <Text style={styles.heartRate}>{heartRate}</Text>
        <Text style={styles.bpm}>BPM</Text>
      </View>
      {/* Additional UI elements like graphs or indicators can be added here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartRate: {
    fontSize: 48,
    color: Colors.PRIMARY ,
    fontWeight: 'bold',
  },
  bpm: {
    fontSize: 24,
    color: 'black',
    marginLeft: 10,
  },
  // Add styles for any additional UI elements here
});

export default HeartRate;
