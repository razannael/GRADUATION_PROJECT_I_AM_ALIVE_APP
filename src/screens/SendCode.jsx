import { View, Text, StyleSheet, Dimensions, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors.js'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import Field from '../components/Field.jsx';
import MyButton from '../components/MyButton.jsx';
import axios from 'axios';


const screenHeight = Dimensions.get('window').height;

const SendCode = (props) => {
  const [email, setEmail] = useState('');

  const handleSendCode = async() => {
      try {
        const response = await axios.patch('https://graduation-project1-fapf.onrender.com/auth/sendCode', {
          email: email
        })
        Alert.alert('Code Sent! Check your email');
        props.navigation.navigate('ForgotPassword');
      } catch (error) {
        console.log(error);
      }
  }


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
          Forget your password?
          </Text>
          <Text  style={{
              color: 'grey',
              fontSize: 15,
              fontWeight: 'bold',
              marginBottom: 57,
              width:"80%"
            }}>Don't worry! Just enter the email address you used to register, and we'll send you a code to reset your password.</Text>
            <Field
              placeholder="Enter Your Email"
              keyboardType={"email-address"}
              value={email}
              onChangeText={setEmail} 
            />
        <View style={{marginTop: 60}}>

          <MyButton title="Submit" onPress={()=>handleSendCode()} />
        </View>
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
  fontSize:23,
  marginTop:30,
marginBottom:35,
},
});
export default SendCode;