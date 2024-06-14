import { View, Text, StyleSheet, Dimensions, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors.js'
import { GestureHandlerRootView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Field from '../components/Field.jsx';
import MyButton from '../components/MyButton.jsx';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import CustomAlert from '../components/CustomAlert.jsx';

const screenHeight = Dimensions.get('window').height;

const AddMessage = (props) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };
  const [message, setMessage] = useState('');

  const handleMessageChange = (text) => {
    setMessage(text);
  };
  const handleSendMessage = async () => {
    const token = await SecureStore.getItemAsync('secure_token');
  
    if (token) {
      try {
        const response = await axios.post('https://graduation-project-plum.vercel.app//victim/setEmergencyMessage', {
          message: message
        }, {
          headers: {
            Authorization: `IAMALIVE__${token}`
          }
        });
  
        console.log('Response:', response.data);
        showAlert("Message saved successfully" , '');
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('No token found');
    }
  };

  
  return (
    <GestureHandlerRootView>
    <View style={styles.fullHeightView}>
    <View style={{alignItems: 'center', width: 380}}>

        <Text style={styles.welcomeText}>
                  Compose Emergency Message
          </Text>
          <Text  style={{
              color: 'grey',
              fontSize: 15,
              fontWeight: 'bold',
              marginBottom: 24,
              width:"70%"
            }}>Enter the message you'd like to send to your emergency contacts.</Text>
          
      <TextInput
      style={{borderRadius: 20, color: Colors.FONTSCOLOR,
        paddingHorizontal: 10, width: '70%', 
        marginVertical: 25,
        marginBottom:130,
        borderWidth: 0.8,
   borderColor: 'gray',
   textAlignVertical: 'top',
  paddingTop:10}}
        multiline
        numberOfLines={6}
        value={message}
        onChangeText={handleMessageChange}
        placeholder="Enter your emergency message"
      />
          <MyButton title="Save" onPress={handleSendMessage} />
      </View>
    </View>
    <CustomAlert
            visible={alertVisible} 
            onClose={() => setAlertVisible(false)} 
            title={alertTitle} 
            message={alertMessage} 
          />
</GestureHandlerRootView>

  )
}
// Styles
const styles = StyleSheet.create({
  fullHeightView: {
    height: screenHeight,
  },
  image: {
    width: 60, 
    height: 60, 
  },
  generalText:{
    color: Colors.FONTSCOLOR,
    fontFamily: 'KaushanScriptRegular',
    fontSize:22,
    marginTop:13,

},
welcomeText:{
  color: Colors.FONTSCOLOR,
  fontWeight:'bold',
  fontSize:19,
marginBottom:35,
marginTop:80

}
});
export default AddMessage