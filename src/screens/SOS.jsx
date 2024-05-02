import { View, TouchableOpacity, StyleSheet, Text, Image, Button, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react'
import Colors from '../utils/Colors.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Audio } from 'expo-av';

const SOS = () => {
  const [sound, setSound] = useState();  
  const [isPlaying, setIsPlaying] = useState(false); // New state variable to track sound playing status

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
  })
 
  if(!loaded){
   return null;
  }

  async function playSound() {
    console.log('Loading Sound');
    if (!isPlaying) {
      const { sound } = await Audio.Sound.createAsync( require('../assets/sound/sos.mp3') );
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
  



  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.SosText}>Press on the SOS button to Send Email to Your Emergency contacts</Text>
      <TouchableOpacity style={styles.sosButton}>
      <MaterialIcons name="sos" size={58} color="#FF9801" />
      </TouchableOpacity>
      <View style={{display:'flex', flexDirection:'row', gap:90 , marginTop:50}}>
      <TouchableOpacity onPress={playSound}>
      <FontAwesome name="bell" size={39} color="#FF9801" />
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:170
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
    padding:30,
   margin:10,
   fontSize:15,
   color: Colors.FONTSCOLOR,
   textAlign: 'center',
   fontFamily: 'KalamRegular',
  },
  SOS:{
    fontWeight: 'bold',
    fontSize: 30,
    color: Colors.FONTSCOLOR
  }
});

export default SOS;