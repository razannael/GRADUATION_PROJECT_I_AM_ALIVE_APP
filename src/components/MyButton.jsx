import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors.js'

const MyButton = ({title, onPress}) => {
  return (

      <TouchableOpacity  style={styles.appButtonContainer}   onPress={onPress}>
      <Text style={styles.appButtonText}>{title}</Text>
      </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: "10%"
    ,marginBottom:5,
  marginTop:15 },
  appButtonText: {
    fontSize: 18,
    color: Colors.FONTSCOLOR,
    fontWeight: "500",
    alignSelf: "center",
  }
})
export default MyButton