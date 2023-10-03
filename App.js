import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const initial = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.221
  }

  const [region, setRegion] = useState(initial);
  const [address, setAddress] = useState('');

  const fetchCoordinates = async (address) => {
    const KEY = process.env.EXPO_PUBLIC_MAPQUEST_API_KEY;
    const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${address}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      const lat = data.results[0].locations[0].latLng.lat;
      const lng = data.results[0].locations[0].latLng.lng;

      console.log(lat, lng);
      setRegion({ ...region, latitude: lat, longitude: lng })
    } catch (error){
      console.log('API call failed', error.message);
    }
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
      >
        <Marker coordinate={region} />
      </MapView>
      <View style={styles.search}>
        <TextInput
          style={{ fontSize: 18, width: 200 }}
          placeholder='Hae'
          value={address}
          onChangeText={text => setAddress(text)}
        />
        <Button title="Show" onPress={() => fetchCoordinates(address)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  search: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});