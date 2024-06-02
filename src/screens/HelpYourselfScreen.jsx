import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    <ScrollView style={styles.container}>
      <StatusBar hidden={alertVisible} backgroundColor='#000' barStyle="dark-content" />

      <View style={styles.section}>
        <Text style={styles.subheader}>
          <Icon name="exclamation-circle" size={24} color="#ff4757" />  Emergency Instructions
        </Text>
        <TouchableOpacity style={styles.alertButton} onPress={() => showAlert('Emergency Instructions', '1. Follow the steps for the specific emergency you are facing.\n2. Use the SOS button in the app to alert your emergency contacts.')}>
          <Icon name="info-circle" size={20} color="#ff4757" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>View Instructions</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>
          <Icon name="medkit" size={24} color="#1e90ff" />  First Aid Information
        </Text>
        <TouchableOpacity style={styles.alertButton} onPress={() => showAlert('First Aid: CPR', '1. Place the heel of your hand on the center of the chest.\n2. Place the other hand on top and interlock your fingers.\n3. Press down hard and fast at a rate of 100-120 compressions per minute.')}>
          <Icon name="heartbeat" size={20} color="#1e90ff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>CPR Instructions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.alertButton} onPress={() => showAlert('First Aid: Wounds', '1. Stop the bleeding by applying pressure.\n2. Clean the wound with water.\n3. Apply an antiseptic and cover with a sterile bandage.')}>
          <Icon name="medkit" size={20} color="#1e90ff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Wound Treatment</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>
          <Icon name="leaf" size={24} color="#2ed573" />  Survival Tips
        </Text>
        <TouchableOpacity style={styles.alertButton} onPress={() => showAlert('Finding Water', '1. Look for surface water in streams, rivers, and lakes.\n2. Collect rainwater or dew.\n3. Avoid drinking saltwater or contaminated water without purification.')}>
          <Icon name="tint" size={20} color="#2ed573" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>How to Find Water</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.alertButton} onPress={() => showAlert('Building Shelter', '1. Find a dry, flat location.\n2. Use natural materials like branches and leaves to create a shelter.\n3. Ensure the shelter provides insulation and protection from the elements.')}>
          <Icon name="home" size={20} color="#2ed573" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Shelter Building Tips</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>
          <Icon name="heartbeat" size={24} color="#ff6b81" />  Mental Health Support
        </Text>
        <TouchableOpacity style={styles.alertButton} onPress={() => showAlert('Breathing Exercises', '1. Inhale deeply through your nose for 4 seconds.\n2. Hold your breath for 7 seconds.\n3. Exhale slowly through your mouth for 8 seconds.\n4. Repeat until you feel calm.')}>
          <Icon name="smile-o" size={20} color="#ff6b81" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Breathing Exercises</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.alertButton} onPress={() => showAlert('Crisis Support', 'If you are in crisis, please reach out to a mental health professional or call a crisis hotline immediately.')}>
          <Icon name="phone" size={20} color="#ff6b81" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Crisis Support</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>
          <Icon name="clipboard" size={24} color="#ffa502" />  Safety Checklists
        </Text>
        <TouchableOpacity style={styles.alertButton} onPress={() => showAlert('Emergency Kit Checklist', '1. Water (one gallon per person per day for at least three days).\n2. Food (at least a three-day supply of non-perishable food).\n3. Battery-powered or hand-crank radio.\n4. Flashlight and extra batteries.\n5. First aid kit.\n6. Whistle to signal for help.\n7. Dust mask to help filter contaminated air.\n8. Plastic sheeting and duct tape to shelter in place.\n9. Moist towelettes, garbage bags, and plastic ties for personal sanitation.')}>
          <Icon name="check-square" size={20} color="#ffa502" style={styles.buttonIcon} />
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
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
