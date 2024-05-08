import React from 'react';
import {TextInput} from 'react-native';
import Colors from '../utils/Colors.js';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 100, color: Colors.FONTSCOLOR,
         paddingHorizontal: 18, width: '70%', 
         marginVertical: 16,
         padding:4,
         borderWidth: 0.8,
    borderColor: 'gray'}}
      placeholderTextColor={Colors.FONTSCOLOR}
      onChangeText={props.onChangeText}
      ></TextInput>
  );
};

export default Field;