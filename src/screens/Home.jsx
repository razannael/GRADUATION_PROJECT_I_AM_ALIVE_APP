import { View, Text, Image ,StyleSheet, Button} from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors.js';
import MyButton from '../components/MyButton.jsx'
import { useFonts } from 'expo-font';



const Home = (props) => {
 const [loaded] = useFonts({
   KaushanScriptRegular: require('../assets/fonts/KaushanScriptRegular.ttf'),
 })

 if(!loaded){
  return null;
 }
  return (
  <View style={styles.container}>
    <Image source={require('../assets/images/logo.png')}  style={styles.image} />
    <Text style={styles.generalText}>I’m Alive</Text>
    <MyButton title="Sign In" onPress={() => props.navigation.navigate("SignIn")}/>
    <MyButton title="Sign up" onPress={() => props.navigation.navigate("SignUp")}/>
    </View>

  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 160, 
      height: 160, 
      resizeMode: 'contain', // This ensures the image scales correctly within the bounds
    },
    generalText:{
        color: Colors.FONTSCOLOR,
        fontFamily: 'KaushanScriptRegular',
        fontSize:33,
        marginTop:20,
        marginBottom:28
    }
  });
  

export default Home