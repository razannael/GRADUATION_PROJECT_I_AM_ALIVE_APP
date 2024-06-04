import React, { useState } from 'react';
import {View, Text, Touchable, Dimensions, StyleSheet, Image, Alert} from 'react-native';
import Colors from '../utils/Colors.js'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import Field from '../components/Field.jsx';
import MyButton from '../components/MyButton.jsx';
import axios from 'axios';
import { useFonts } from 'expo-font';
import CustomAlert from '../components/CustomAlert.jsx';

const screenHeight = Dimensions.get('window').height;


const Signup = props => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };
    
 const [loaded] = useFonts({
    KaushanScriptRegular: require('../assets/fonts/KaushanScriptRegular.ttf'),
  })
 
  if(!loaded){
   return null;
  }
  // State to store input field values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVictim, setIsVictim] = useState(true);
  // State to store validation messages
  const [validationMessage, setValidationMessage] = useState('');
 // Function to validate fields
 const validateFields = () => {
  // Add your validation logic here
  // Example: Check if all fields are filled
  if (!username || !email || !city || !password || !confirmPassword) {
    setValidationMessage('Please fill in all fields.');
    return false;
  }
  // Example: Check for valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setValidationMessage('Please enter a valid email address.');
    return false;
  }
  // Example: Check if passwords match
  if (password !== confirmPassword) {
    setValidationMessage('Passwords do not match.');
    return false;
  }
  // If all validations pass
  setValidationMessage('');
  return true;
};
  // Function to handle signup button press
  const handleSignupPress = async () => {
    if (validateFields()) {
      try {
        const response = await axios.post('https://graduation-project-plum.vercel.app//auth/signup', {
          name: username,
          email: email,
          city: city,
          password: password,
          isVictim: isVictim
        });
  
        if (response.data.success) {
          showAlert('Success', 'Account created successfully!');
          props.navigation.navigate('SignIn');
        } else {
          showAlert( response.data.message, '');
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          showAlert(error.response.data.message ,'');
        } else {
          showAlert('An unexpected error occurred. Please try again later.','');
        }
      }
    }
  };
  
    
  return (
    <GestureHandlerRootView>
           <View style={styles.fullHeightView}>
           <View style={{alignItems: 'center', width: 380}}>
              <View style={{display: 'flex', flexDirection :'row', justifyContent: "flex-start",marginTop:6 , paddingVertical:22 , gap:120}}>
              <Image source={require('../assets/images/logo.png')}  style={styles.image} />
               <Text style={styles.generalText}>I Am Alive</Text>
              </View>
        
              <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 410,
            borderTopLeftRadius: 140,
            paddingTop: 30,
            alignItems: 'center',
          }}>
                <Text
          style={{
            color: Colors.FONTSCOLOR,
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Create a new account
        </Text>
          <Field placeholder="Username" value={username}
        onChangeText={setUsername} // Update state when text changes
          />
<Field 
  placeholder="Email" 
  value={email} 
  onChangeText={setEmail} 
  keyboardType={'email-address'} 
/>
<Field 
  placeholder="City" 
  value={city} 
  onChangeText={setCity} 
/>
<Field 
  placeholder="Password" 
  value={password} 
  onChangeText={setPassword} 
  secureTextEntry={true} 
/>
<Field 
  placeholder="Confirm Password" 
  value={confirmPassword} 
  onChangeText={setConfirmPassword} 
  secureTextEntry={true} 
/>

     <View style={{marginTop: 6, marginBottom: 7}}>
     <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '60%',
              paddingRight: 20
            }}>
            <Text style={{color: 'grey', fontSize: 10}}>
              By signing in, you agree to our{' '}
            </Text>
            <Text style={{color: Colors.PRIMARY, fontWeight: 'bold', fontSize: 10}}>
              Terms & Conditions
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent :"center",
              width: '78%',
              paddingRight: 70,
              marginBottom: 10
            }}>
            <Text style={{color: 'grey', fontSize: 10}}>
              and {" "}
            </Text>
            <Text style={{color: Colors.PRIMARY, fontWeight: 'bold', fontSize: 10}}>
              Privacy Policy
            </Text>
          </View>
     </View>
          <MyButton
            title="Sign up"
            onPress={() => {
              handleSignupPress();
            }}
          />
          {/* Display validation message */}
      {!!validationMessage && (
        <Text style={{ color: 'red', marginBottom: 20 }}>
          {validationMessage}
        </Text>
      )}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop:10
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignIn')}>
              <Text
                style={{color: Colors.PRIMARY, fontWeight: 'bold', fontSize: 16}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomAlert
            visible={alertVisible} 
            onClose={() => setAlertVisible(false)} 
            title={alertTitle} 
            message={alertMessage} 
          />
    </View>
    </GestureHandlerRootView>

  );
};

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
})
export default Signup;