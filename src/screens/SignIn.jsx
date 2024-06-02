import { View, Text, StyleSheet, Dimensions, Image, Alert } from "react-native";
import React, { useState } from "react";
import Colors from "../utils/Colors.js";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Field from "../components/Field.jsx";
import MyButton from "../components/MyButton.jsx";
import axios from "axios";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";
import CustomAlert from "../components/CustomAlert.jsx";

const screenHeight = Dimensions.get("window").height;

const SignIn = (props) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };
  const [loaded] = useFonts({
    KaushanScriptRegular: require("../assets/fonts/KaushanScriptRegular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  // State to store input field values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State to store validation messages
  const [validationMessage, setValidationMessage] = useState("");

  // Function to validate email and password
  const validateFields = () => {
    if (!email || !password) {
      setValidationMessage("Please fill in all fields.");
      return false;
    }
    // Add more validation checks as needed
    // Example: Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationMessage("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setValidationMessage("Password must be at least 6 characters long.");
      return false;
    }
    // If all validations pass
    setValidationMessage("");
    return true;
  };

  // Function to handle login button press
  const handleLoginPress = async () => {
    if (validateFields()) {
      try {
        const response = await axios.post(
          "https://graduation-project1-fapf.onrender.com/auth/signIn",
          {
            email: email,
            password: password,
          }
        );
        await SecureStore.setItemAsync("secure_token", response.data.token);
        console.log("Token stored:", response.data.token);

        if (response.data.success) {
        } else {
          if (response.data.user.contactsEmail == false) {
            props.navigation.navigate("Contacts");
          } else {
            props.navigation.navigate("Main");
          }
        }
      } catch (error) {
        // Check if error response is in expected format
        if (error.response && error.response.data && error.response.data.message) {
          showAlert(error.response.data.message , '');
        } else {
          showAlert("An unexpected error occurred" , '');
        }
      }
    }
  };
  

  


  return (
    <GestureHandlerRootView>
      <View style={styles.fullHeightView}>
        <View style={{ alignItems: "center", width: 380 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: 9,
              paddingVertical: 22,
              gap: 120,
            }}
          >
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.image}
            />
            <Text style={styles.generalText}>I Am Alive</Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              height: 700,
              width: 410,
              borderTopLeftRadius: 140,
              paddingTop: 60,
              alignItems: "center",
            }}
          >
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text
              style={{
                color: "grey",
                fontSize: 19,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Login to your account
            </Text>
            <Field
              placeholder="Email"
              keyboardType={"email-address"}
              value={email}
              onChangeText={setEmail} // Update state when text changes
            />
            <Field
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword} // Update state when text changes
            />
            <View
              style={{
                alignItems: "flex-end",
                width: "70%",
                paddingRight: 10,
                marginBottom: 170,
              }}
            >
              <TouchableOpacity onPress={() => props.navigation.navigate("SendCode")}>
                <Text
                  style={{
                    color: Colors.PRIMARY,
                    fontWeight: "bold",
                    fontSize: 13,
                  }}
                >
                  Forgot Password ?
                </Text>
              </TouchableOpacity>
            </View>
            <MyButton title="Login" onPress={() => handleLoginPress()} />
            {/* Display validation message */}
            {!!validationMessage && (
              <Text style={{ color: "red", marginBottom: 15, marginTop: 10 }}>
                {validationMessage}
              </Text>
            )}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 6,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Don't have an account ?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("SignUp")}
              >
                <Text
                  style={{
                    color: Colors.PRIMARY,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Signup
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <CustomAlert
            visible={alertVisible} 
            onClose={() => setAlertVisible(false)} 
            title={alertTitle} 
            message={alertMessage} 
          />
      </View>
    </GestureHandlerRootView>
  );
};
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
  generalText: {
    color: Colors.FONTSCOLOR,
    fontFamily: "KaushanScriptRegular",
    fontSize: 22,
    marginTop: 13,
  },
  welcomeText: {
    color: Colors.FONTSCOLOR,
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
  },
  alertButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#666',
    alignItems: 'center',
    marginTop: 20,
    width: '70%',
    marginBottom: 15,
    marginStart: '15%',
  },
  buttonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default SignIn;
