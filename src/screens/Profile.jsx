import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Alert,
} from "react-native";
import Colors from "../utils/Colors.js";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Field from "../components/Field.jsx";
import MyButton from "../components/MyButton.jsx";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { useFonts } from "expo-font";

const screenHeight = Dimensions.get("window").height;

const Profile = (props) => {
  const [loaded] = useFonts({
    KaushanScriptRegular: require("../assets/fonts/KaushanScriptRegular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  // State to store input field values
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  // State to store validation messages
  const [validationMessage, setValidationMessage] = useState("");

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await SecureStore.getItemAsync('secure_token');
        if (!token) {
          Alert.alert("Error", "No token found");
          return;
        }

        const response = await axios.get("https://graduation-project-plum.vercel.app//victim/info", {
          headers: {
            Authorization: `IAMALIVE__${token}`
          }
        });
          console.log(response.data.victim.name);
          setUsername(response.data.victim.name);
          setCity(response.data.victim.city);
          console.log(response.data.victim.city);
      } catch (error) {
        console.log(error.message);}
    };

    fetchUserData();
  }, []);

  // Function to handle update button press
  const handleUpdatePress = async () => {
    if (!username || !city) {
      setValidationMessage("Please fill in both fields.");
      return;
    }

    try {
      const token = await SecureStore.getItemAsync('secure_token');
      if (!token) {
        Alert.alert("Error", "No token found");
        return;
      }

      const response = await axios.put(
        "https://graduation-project-plum.vercel.app//victim/updateInfo",
        {
          name: username,
          city: city,
        },
        {
          headers: {
            Authorization: `IAMALIVE__${token}`
          }
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.fullHeightView}>
        <View style={styles.container}>
          <Field
            placeholder="Username"
            value={username}
            onChangeText={setUsername} // Update state when text changes
          />
          <View style={{ marginTop: 20 }} />
          <Field placeholder="City" value={city} onChangeText={setCity} />
          <View style={{ marginTop: 20 }} />

          <TouchableOpacity onPress={() => props.navigation.navigate("ChangePassword")}>
            <Text style={styles.changePasswordText}>
              Change Password ?
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 70 }} />
          <MyButton
            title="Update"
            onPress={handleUpdatePress}
          />
          {/* Display validation message */}
          {!!validationMessage && (
            <Text style={styles.validationMessage}>
              {validationMessage}
            </Text>
          )}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  fullHeightView: {
    height: screenHeight,
  },
  container: {
    paddingTop: 30,
    alignItems: "center",
    marginTop: 90,
  },
  changePasswordText: {
    color: Colors.PRIMARY,
    fontWeight: "bold",
    fontSize: 13,
  },
  validationMessage: {
    color: "red",
    marginBottom: 20,
  },
});

export default Profile;
