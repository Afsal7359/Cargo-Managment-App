import Geolocation from 'react-native-geolocation-service';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid,Text, Button } from 'react-native';
import { Toast } from 'toastify-react-native';

const Shoplocation = () => {
  const [shopLocation, setShopLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app requires access to your location.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           Geolocation.getCurrentPosition(
//             (position) => {
//               const { latitude, longitude } = position.coords;
//               console.log(`Current Location: ${latitude}, ${longitude}`);
//               setUserLocation({ latitude, longitude });
//               // Add your logic for checking the zone here
//               const shopLocations = { latitude: 10.061502665457681, longitude: 76.34563390610236 };
//               const distanceInMeters = getDistance(userLocation, shopLocations);
//               const zoneRadius = 100; // in meters

//               if (distanceInMeters <= zoneRadius) {
//                 Toast.success("Attendance marked successfully");
//               } else {
//                 Toast.error("Location not correct");
//               }
//             },
//             (error) => {
//               console.log(error.code, error.message);
//             },
//             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//           );
//         } else {
//           console.log('Location permission denied');
//           Toast.error("Location permission denied");
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     };

//     requestLocationPermission();
//   }, []);

const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

const [location, setLocation] = useState(false);
// function to check permissions and get Location
const getLocation = () => {
  const result = requestLocationPermission();
  result.then(res => {
    console.log('res is:', res);
    if (res) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          setLocation(position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          setLocation(false);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  });
  console.log(location);
};
  return (
    <View style={styles.container}>
    <Text>Welcome!</Text>
    <View
      style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
      <Button title="Get Location" onPress={getLocation} />
    </View>
    <Text>Latitude: {location ? location.coords.latitude : null}</Text>
    <Text>Longitude: {location ? location.coords.longitude : null}</Text>
    <View
      style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
      <Button title="Send Location" />
    </View>
  </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Shoplocation;