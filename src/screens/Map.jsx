import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { UserLocationContext } from '../contexts/UserLocationContext.tsx'

const Map = () => {  const { location } = useContext(UserLocationContext);

if (!location) {
  return <Text>No location data available</Text>; // Fallback UI
}

return location?.latitude && (
    <View>
      <MapView style={styles.map} 
      provider='google'
      region={{
        latitude: location?.latitude,
        longitude: location?.longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0421
      }}>
        <Marker
        coordinate={{
          latitude: location?.latitude,
         longitude: location?.longitude}}/>
      </MapView>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});