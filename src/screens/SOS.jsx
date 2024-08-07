import { View, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../utils/Colors.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Audio } from 'expo-av';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import CustomAlert from '../components/CustomAlert.jsx';

const SOS = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false); // State to track sound playing status
  const [loading, setLoading] = useState(false); // State to track loading status

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const [loaded] = useFonts({
    KalamRegular: require('../assets/fonts/Kalam-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  async function playSound() {
    console.log('Loading Sound');
    if (!isPlaying) {
      const { sound } = await Audio.Sound.createAsync(require('../assets/sound/sos.mp3'));
      setSound(sound);
      console.log('Playing Sound');
      await sound.playAsync();
      setIsPlaying(true); // Update the state to indicate sound is playing
    } else {
      console.log('Stopping Sound');
      await sound.stopAsync();
      setIsPlaying(false); // Update the state to indicate sound is stopped
    }
  }

  const handleSOS = async () => {
    setLoading(true); // Start loading
    const token = await SecureStore.getItemAsync('secure_token');

    if (token) {
      try {
        const response = await axios.post('https://graduation-project-plum.vercel.app//victim/sendSOSMessage', {}, {
          headers: {
            Authorization: `IAMALIVE__${token}`
          }
        });
        console.log('Response:', response.data);
        showAlert('Your emergency message has been sent successfully', 'We will reach out to you shortly.');
      } catch (error) {
        console.error('Error:', error);
        showAlert('Error', 'Failed to send SOS message.');
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      console.error('No token found');
      showAlert('Error', 'No token found. Please log in.');
      setLoading(false); // Stop loading
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      ) : (
        <>
          <Text style={styles.SosText}>Press on the SOS button to Send Email to Your Emergency contacts</Text>
          <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
            <MaterialIcons name="sos" size={58} color="#FF9801" />
          </TouchableOpacity>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 90, marginTop: 50 }}>
            <TouchableOpacity onPress={playSound}>
              <FontAwesome name="bell" size={39} color="#FF9801" />
            </TouchableOpacity>
          </View>
        </>
      )}
      <CustomAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title={alertTitle}
        message={alertMessage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 170,
  },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  SosText: {
    padding: 30,
    margin: 10,
    fontSize: 15,
    color: Colors.FONTSCOLOR,
    textAlign: 'center',
    fontFamily: 'KalamRegular',
  },
  SOS: {
    fontWeight: 'bold',
    fontSize: 30,
    color: Colors.FONTSCOLOR,
  },
  alertButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#666',
    alignItems: 'center',
    marginTop: 20,
    width: '70%',
    marginBottom: 15,
    marginStart: '15%',
  },
  buttonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SOS;
