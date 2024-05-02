import { View, Text, StyleSheet, Dimensions, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors.js'
import { GestureHandlerRootView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Field from '../components/Field.jsx';
import MyButton from '../components/MyButton.jsx';
import axios from 'axios';

const screenHeight = Dimensions.get('window').height;

const SignIn = (props) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (text) => {
    setMessage(text);
  };
  const handleSendMessage = () => {
    // Here you can implement the logic to send the message
    console.log('Sending message:', message);
    // After sending the message, you can navigate to any other screen as needed
    // For example, navigate back to the main screen
    props.navigation.navigate("Main")
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
  fontSize:19,
marginBottom:25

}
});
export default SignIn