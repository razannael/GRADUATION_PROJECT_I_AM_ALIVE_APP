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
import * as SecureStore from 'expo-secure-store';
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
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // State to store validation messages
  const [validationMessage, setValidationMessage] = useState("");

  // Function to validate fields
  const validateFields = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setValidationMessage("Please fill in all fields.");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setValidationMessage("Passwords do not match.");
      return false;
    }

    setValidationMessage("");
    return true;
  };

  // Function to handle password change button press
  const handleChangePasswordPress = async () => {
    if (validateFields()) {
      try {
        const token = await SecureStore.getItemAsync('secure_token');
        if (!token) {
          Alert.alert("Error", "No token found");
          return;
        }

        const response = await axios.patch(
          "https://graduation-project-plum.vercel.app//victim/updatePassword",
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
            cNewPassword: confirmPassword,
          },
          {
            headers: {
              Authorization: `IAMALIVE__${token}`
            }
          }
        );

        if (response.data.success) {
          Alert.alert("Success", "Password changed successfully!");
          props.navigation.navigate("Main");
        } else {
          Alert.alert(response.data.message);
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.fullHeightView}>
        <View style={styles.container}>
          <Field
            placeholder="Your current Password"
            secureTextEntry={true}
            value={oldPassword}
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

          <MyButton
            title="Update"
            onPress={handleChangePasswordPress}
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
    marginTop: 150,
  },
  validationMessage: {
    color: "red",
    marginBottom: 20,
  },
});

export default ChangePassword;
