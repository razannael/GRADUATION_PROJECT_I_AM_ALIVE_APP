import { View, Text, StyleSheet, Dimensions, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors.js'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import Field from '../components/Field.jsx';
import MyButton from '../components/MyButton.jsx';
import axios from 'axios';


const screenHeight = Dimensions.get('window').height;

const ForgotPassword = (props) => {
    const email = props.route.params.email;
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
  const handleForgetPassword = async() => {
      try {
        const response = await axios.post('https://graduation-project1-fapf.onrender.com/auth/forgetPassword', {
            code: code,
            newPassword: password,
        },
        {
            headers: {
              'Content-Type': 'application/json',
              'email': email
            }
        }
        );
        Alert.alert('Password Reset Successful!');
        props.navigation.navigate('SignIn');
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
          Reset Password
          </Text>
            <Field
              placeholder="Your Code"
              value={code}
              onChangeText={setCode} 
            />
            <Field
              placeholder="Your New Password"
              value={password}
              onChangeText={setPassword} 
            />
        <View style={{marginTop: 60}}>

          <MyButton title="Save" onPress={()=>handleForgetPassword()} />
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
  fontSize:25,
  marginTop:30,
marginBottom:40,
},
});
export default ForgotPassword;