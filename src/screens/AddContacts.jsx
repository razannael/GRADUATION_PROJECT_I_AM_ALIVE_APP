import { View, Text, StyleSheet, Dimensions} from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors.js'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import Field from '../components/Field.jsx';
import MyButton from '../components/MyButton.jsx';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import CustomAlert from '../components/CustomAlert.jsx';


const screenHeight = Dimensions.get('window').height;

const AddContacts = (props) => {


  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };
  const [contacts, setContacts] = useState(['']); // Initial state with an empty email field

  const handleInputChange = (index, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index] = value;
    setContacts(updatedContacts);
  };

  const handleAddContact = () => {
    setContacts([...contacts, '']); 
  };

  const handleContinue = async () => {
    const hasEmail = contacts.some(email => email.trim() !== '');
    if (hasEmail) {
      try {
        const token = await SecureStore.getItemAsync('secure_token');
        console.log('Retrieved token:', token); // Add this line to check

        if (token) {
          const response = await axios.post('https://graduation-project-plum.vercel.app//victim/setEmergencyContacts', {
            contactsEmail: contacts.filter(email => email.trim() !== '')
          }, {
            headers: {
              Authorization: `IAMALIVE__${token}`
            }
          });
            console.log('Response:', response.data);
            showAlert("Contacts saved successfully", "");

        } else {
          console.error('No token found');
        }
      } catch (error) {
        if (error.response) {
          console.error('Error data:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
      }
    } else {
      props.navigation.navigate('Main');
    }
  };
  

   

  return (
    <GestureHandlerRootView>
    <View style={styles.fullHeightView}>
    <View style={{alignItems: 'center', width: 380}}>
      
          <Text style={styles.welcomeText}>
          Set Emergency Contacts
          </Text>
          <Text  style={{
              color: 'grey',
              fontSize: 15,
              fontWeight: 'bold',
              marginBottom: 47,
              width:"77%"
            }}>Enter the email addresses of your close contacts who you'd like to notify in case of an emergency. You can skip this step if you prefer.</Text>
          
          {contacts.map((email, index) => (
        <Field
          key={index}
          value={email}
          onChangeText={(value) => handleInputChange(index, value)}
          placeholder="Enter email address"
        />
      ))}
      
       <View
            style={{alignItems: 'flex-end', width: '70%', paddingRight: 10, marginBottom: 100}} >
            <Text style={{color: Colors.PRIMARY, fontWeight: 'bold', fontSize: 13}} onPress={handleAddContact}>
            Add More Contacts
            </Text>
          </View>
          <MyButton title="Save" onPress={handleContinue} />

          <CustomAlert
            visible={alertVisible} 
            onClose={() => setAlertVisible(false)} 
            title={alertTitle} 
            message={alertMessage} 
          />
      </View>
    </View>
</GestureHandlerRootView>

  )
}
// Styles
const styles = StyleSheet.create({
  fullHeightView: {
    height: screenHeight,

  },
welcomeText:{
  color: Colors.FONTSCOLOR,
  fontWeight:'bold',
  fontSize:22,
marginBottom:45,
marginTop:70
},
optionalText:{
    color: Colors.PRIMARY,
    fontWeight:'bold',
    fontSize:18,
  marginBottom:22
}
});
export default AddContacts