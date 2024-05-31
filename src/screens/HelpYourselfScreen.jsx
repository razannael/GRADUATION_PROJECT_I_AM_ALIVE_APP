import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert, StatusBar } from 'react-native';
import Colors from '../utils/Colors';
import CustomAlert from '../components/CustomAlert';

export default function HelpYourselfScreen() {
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
  
    const showAlert = (title, message) => {
      setAlertTitle(title);
      setAlertMessage(message);
      setAlertVisible(true);
    };
    return (
        <ScrollView style={styles.container} >    
      <StatusBar hidden={alertVisible} backgroundColor={Colors.PRIMARY} barStyle="dark-content" />
          <View style={styles.section}>
            <Text style={styles.subheader}>Emergency Instructions</Text>
            <TouchableOpacity style={styles.alertButton} onPress={() => showAlert('Emergency Instructions', '1. Follow the steps for the specific emergency you are facing.\n2. Use the SOS button in the app to alert your emergency contacts.')}>
              <Text style={styles.buttonText}>View Instructions</Text>
            </TouchableOpacity>
          </View>
    
          <View style={styles.section}>
            <Text style={styles.subheader}>First Aid Information</Text>
            <TouchableOpacity style={styles.alertButton} onPress={() => showAlert('First Aid: CPR', '1. Place the heel of your hand on the center of the chest.\n2. Place the other hand on top and interlock your fingers.\n3. Press down hard and fast at a rate of 100-120 compressions per minute.')}>
              <Text style={styles.buttonText}>CPR Instructions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.alertButton} onPress={() => showAlert('First Aid: Wounds', '1. Stop the bleeding by applying pressure.\n2. Clean the wound with water.\n3. Apply an antiseptic and cover with a sterile bandage.')}>
              <Text style={styles.buttonText}>Wound Treatment</Text>
            </TouchableOpacity>
          </View>
    
          <View style={styles.section}>
            <Text style={styles.subheader}>Survival Tips</Text>
            <TouchableOpacity style={styles.alertButton} onPress={() => showAlert('Finding Water', '1. Look for surface water in streams, rivers, and lakes.\n2. Collect rainwater or dew.\n3. Avoid drinking saltwater or contaminated water without purification.')}>
              <Text style={styles.buttonText}>How to Find Water</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.alertButton} onPress={() => showAlert('Building Shelter', '1. Find a dry, flat location.\n2. Use natural materials like branches and leaves to create a shelter.\n3. Ensure the shelter provides insulation and protection from the elements.')}>
              <Text style={styles.buttonText}>Shelter Building Tips</Text>
            </TouchableOpacity>
          </View>
    
          <View style={styles.section}>
            <Text style={styles.subheader}>Mental Health Support</Text>
            <TouchableOpacity style={styles.alertButton} onPress={() => showAlert('Breathing Exercises', '1. Inhale deeply through your nose for 4 seconds.\n2. Hold your breath for 7 seconds.\n3. Exhale slowly through your mouth for 8 seconds.\n4. Repeat until you feel calm.')}>
              <Text style={styles.buttonText}>Breathing Exercises</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.alertButton} onPress={() => showAlert('Crisis Support', 'If you are in crisis, please reach out to a mental health professional or call a crisis hotline immediately.')}>
              <Text style={styles.buttonText}>Crisis Support</Text>
            </TouchableOpacity>
          </View>
    
    
          <View style={styles.section}>
            <Text style={styles.subheader}>Safety Checklists</Text>
            <TouchableOpacity style={styles.alertButton} onPress={() => showAlert('Emergency Kit Checklist', '1. Water (one gallon per person per day for at least three days).\n2. Food (at least a three-day supply of non-perishable food).\n3. Battery-powered or hand-crank radio.\n4. Flashlight and extra batteries.\n5. First aid kit.\n6. Whistle to signal for help.\n7. Dust mask to help filter contaminated air.\n8. Plastic sheeting and duct tape to shelter in place.\n9. Moist towelettes, garbage bags, and plastic ties for personal sanitation.')}>
              <Text style={styles.buttonText}>View Checklist</Text>
            </TouchableOpacity>
          </View>
    
          <CustomAlert
            visible={alertVisible} 
            onClose={() => setAlertVisible(false)} 
            title={alertTitle} 
            message={alertMessage} 
          />
        </ScrollView>
      );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
    paddingTop: 9,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 20,
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
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
