import React, { useState } from "react";
import {
  View,
  Text,
  Touchable,
  Dimensions,
  StyleSheet,
  Image,
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

const ChangePassword = (props) => {
  const [loaded] = useFonts({
    KaushanScriptRegular: require("../assets/fonts/KaushanScriptRegular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  // State to store input field values
  const [oldpassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // State to store validation messages
  const [validationMessage, setValidationMessage] = useState("");
  // Function to validate fields
  const validateFields = () => {
    // Add your validation logic here
    // Example: Check if all fields are filled
    if (!username || !email || !city || !password || !confirmPassword) {
      setValidationMessage("Please fill in all fields.");
      return false;
    }
    // Example: Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationMessage("Please enter a valid email address.");
      return false;
    }
    // Example: Check if passwords match
    if (password !== confirmPassword) {
      setValidationMessage("Passwords do not match.");
      return false;
    }
    // If all validations pass
    setValidationMessage("");
    return true;
  };
  // Function to handle signup button press
  const handleSignupPress = async () => {
    if (validateFields()) {
      try {
        // Replace 'YOUR_SIGNUP_API_ENDPOINT' with your actual API endpoint
        const response = await axios.post(
          "https://graduation-project1-fapf.onrender.com/auth/signup",
          {
            name: username,
            email: email,
            city: city,
            password: password,
            isVictim: isVictim,
          }
        );

        // Check if signup was successful based on the response
        if (response.data.success) {
          // Signup successful
          Alert.alert("Success", "Account created successfully!");
          // Navigate to the sign-in screen or other actions
          props.navigation.navigate("SignIn");
        } else {
          // Signup failed
          Alert.alert("Signup Success", response.data.message);
          console.log(response.data.message);
        }
      } catch (error) {
        // Handle network error, parsing error, etc.
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.fullHeightView}>
        <View
          style={{
            paddingTop: 30,
            alignItems: "center",
            marginTop: 150,
          }}
        >
          <Field
            placeholder="Your current Password"
            secureTextEntry={true}
            value={oldpassword}
            onChangeText={setOldPassword} // Update state when text changes
          />
          <View style={{ marginTop: 20 }}></View>

          <Field
            placeholder="New Password"
            secureTextEntry={true}
            value={newPassword}
            onChangeText={setNewPassword} // Update state when text changes
          />
          <View style={{ marginTop: 20 }}></View>
          <Field
            placeholder="Confirm New Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <View style={{ marginTop: 20 }}></View>

          <View style={{ marginTop: 20 }}></View>
          <MyButton
            title="Update"
            onPress={() => {
              props.navigation.navigate("Main");
            }}
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
  },
});
export default ChangePassword;
