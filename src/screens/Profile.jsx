import React, { useState } from "react";
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

  // Function to handle update button press
  const handleUpdatePress = async () => {
    if (!username || !city) {
      setValidationMessage("Please fill in both fields.");
      return;
    }

    try {
      const token = await SecureStore.getItemAsync('secure_token');
      console.log('Retrieved token:', token); // Add this line to check

      if (!token) {
        const response = await axios.put(
          "https://graduation-project-plum.vercel.app/victim/updateInfo",
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
      }

      if (response.data.success) {
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        Alert.alert("Update Failed", response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.fullHeightView}>
        <View
          style={{
            paddingTop: 30,
            alignItems: "center",
            marginTop: 90,
          }}
        >
          <Field
            placeholder="Username"
            value={username}
            onChangeText={setUsername} // Update state when text changes
          />
          <View style={{ marginTop: 20 }} />
          <Field placeholder="City" value={city} onChangeText={setCity} />
          <View style={{ marginTop: 20 }} />

          <TouchableOpacity onPress={() => props.navigation.navigate("ChangePassword")}>
            <Text
              style={{
                color: Colors.PRIMARY,
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
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
            <Text style={{ color: "red", marginBottom: 20 }}>
              {validationMessage}
            </Text>
          )}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          ></View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  fullHeightView: {
    height: screenHeight,
  }
});

export default Profile;
