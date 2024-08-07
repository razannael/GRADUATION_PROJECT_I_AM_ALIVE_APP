import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import SignIn from './src/screens/SignIn';
import Signup from './src/screens/SignUp';
import SOS from './src/screens/SOS';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './src/components/CustomDrawer';
import Colors from './src/utils/Colors';
import Map from './src/screens/Map';
import Profile from './src/screens/Profile';
import HeartRate from './src/screens/HeartRate';
import * as Location from 'expo-location';
import { UserLocationContext } from './src/contexts/UserLocationContext';
import SendCode from './src/screens/SendCode';
import ForgetPassword from './src/screens/ForgetPassword';
import AddContacts from './src/screens/AddContacts';
import AddMessage from './src/screens/AddMessage';
import ChangePassword from './src/screens/ChangePassword';
import HelpYourselfScreen from './src/screens/HelpYourselfScreen';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="MainPage"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          width: 240,
        },
        headerTintColor: 'white', // Color of the header text and icons
        headerStyle: {
          backgroundColor: Colors.PRIMARY, // Background color of the header
        },
        drawerActiveBackgroundColor: 'rgba(236, 68, 68, 0.2)',
        drawerActiveTintColor: Colors.PRIMARY, // Text color for active item
      }}
    >
      <Drawer.Screen name="Contacts" component={AddContacts} />
      <Drawer.Screen name="SOS" component={SOS} />
      <Drawer.Screen name="Message" component={AddMessage} />
      <Drawer.Screen name="Location" component={Map} />
      <Drawer.Screen name="Personal Details" component={Profile} />
      <Drawer.Screen name="Heart Rate" component={HeartRate} />
      <Drawer.Screen name="Help Yourself" component={HelpYourselfScreen} />

    </Drawer.Navigator>
  );
};

  // Add interface for your location state
interface LocationState {
    latitude: number;
    longitude: number;
  }

export default function App() {
    const [location, setLocation] = useState<LocationState | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    
  useEffect(() => {

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      console.log(location.coords);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }



  return (
    <UserLocationContext.Provider
    
    value={{ location, setLocation}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={Signup} />
          <Stack.Screen name="Main" component={MainDrawer} />
          <Stack.Screen name="SendCode" component={SendCode} />
          <Stack.Screen name="ForgotPassword" component={ForgetPassword} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
      </NavigationContainer>
      </UserLocationContext.Provider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
