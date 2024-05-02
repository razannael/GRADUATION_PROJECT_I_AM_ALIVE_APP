import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Colors from '../utils/Colors.js';
import { AntDesign } from '@expo/vector-icons';

const CustomDrawer = props => {

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: Colors.PRIMARY}}>
        <View  style={{padding:20}}
       >
          <Image
            source={require('../assets/images/logo.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              fontFamily: 'KaushanScriptRegular',
              color: Colors.FONTSCOLOR,
              fontSize: 18,
              marginBottom: 5,
              fontWeight: 'bold',
            }}>
            I Am Alive
          </Text>
        </View>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 20}}>
          <DrawerItemList {...props} 
        />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc',marginBottom:40}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap:3}}>
          <AntDesign name="sharealt" size={18} color="gray" />
            <Text
              style={{
                fontSize: 12,
                marginLeft: 5,
                color:'gray'
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>{props.navigation.navigate('Home')}} 
        style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center',borderRadius: 30,padding:6,width:'50%',backgroundColor:Colors.PRIMARY}}>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 7
                ,color:'#ffffff'
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;