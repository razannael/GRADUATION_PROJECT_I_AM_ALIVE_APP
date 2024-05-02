import { View, Text, StyleSheet, Dimensions, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors.js'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import Field from '../components/Field.jsx';
import MyButton from '../components/MyButton.jsx';
import axios from 'axios';

const screenHeight = Dimensions.get('window').height;

const SignIn = (props) => {
  const [contacts, setContacts] = useState(['']); // Initial state with an empty email field

  const handleInputChange = (index, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index] = value;
    setContacts(updatedContacts);
  };

  const handleAddContact = () => {
    setContacts([...contacts, '']); // Add an empty email field
  };


    const handleContinue = () => {
      // Check if any email address is entered
      const hasEmail = contacts.some(email => email.trim() !== '');
  
      if (hasEmail) {
        props.navigation.navigate("Message") // Navigate to the message composition screen
      } else {
        props.navigation.navigate('Main'); // Navigate to the main screen
      }
    // Handle what to do when the user clicks continue (e.g., validation, navigation)
    // For simplicity, let's just log the contacts for now

    console.log('Emergency Contacts:', contacts);
  };

   

  return (
    <GestureHandlerRootView>
    <View style={styles.fullHeightView}>
    <View style={{alignItems: 'center', width: 380}}>
              <View style={{display: 'flex', flexDirection :'row', justifyContent: "flex-start",marginTop:25 , paddingVertical:22 , gap:120}}>
              <Image source={require('../assets/images/logo.png')}  style={styles.image} />
               <Text style={styles.generalText}>I Am Alive</Text>
              </View>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 410,
            borderTopLeftRadius: 140,
            paddingTop: 60,
            alignItems: 'center',
          }}>
          <Text style={styles.welcomeText}>
          Set Emergency Contacts
          </Text>
          <Text style={styles.optionalText}>(Optional)</Text>
          <Text  style={{
              color: 'grey',
              fontSize: 15,
              fontWeight: 'bold',
              marginBottom: 24,
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
            style={{alignItems: 'flex-end', width: '70%', paddingRight: 10, marginBottom: 140}} >
            <Text style={{color: Colors.PRIMARY, fontWeight: 'bold', fontSize: 13}} onPress={handleAddContact}>
            Add More Contacts
            </Text>
          </View>
          <MyButton title="Continue" onPress={handleContinue} />
        </View>
      </View>
    </View>
</GestureHandlerRootView>

  )
}
// Styles
const styles = StyleSheet.create({
  fullHeightView: {
    height: screenHeight,
    backgroundColor: Colors.PRIMARY,
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
  fontSize:22,
marginBottom:5,
},
optionalText:{
    color: Colors.PRIMARY,
    fontWeight:'bold',
    fontSize:18,
  marginBottom:22
}
});
export default SignIn