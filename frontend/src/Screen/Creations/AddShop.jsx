import { StyleSheet, Text, View,TextInput,ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-elements'
import Color from '../../Components/Styling Comp/Color'
import { addshop } from '../../Api/Shop'

const AddShop = () => {
  const [shopName, setShopName] = useState('');
  const [district, setDistrict] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  const validateShopName = () => {
    // Your validation logic for shop name goes here
    if (!shopName) {
      alert('Please enter a valid shop name.');
      return false;
    }
    return true;
  };

  const validateDistrict = () => {
    // Your validation logic for district goes here
    if (!district) {
      alert('Please enter a valid district.');
      return false;
    }
    return true;
  };

  const validateArea = () => {
    // Your validation logic for area goes here
    if (!area) {
      alert('Please enter a valid area.');
      return false;
    }
    return true;
  };

  const validateAddress = () => {
    // Your validation logic for address goes here
    if (!address) {
      alert('Please enter a valid address.');
      return false;
    }
    return true;
  };

  const validatePincode = () => {
    // Your validation logic for pincode goes here
    const pincodeRegex = /^\d{6}$/; // Assuming pincode is a 6-digit number
    if (!pincode.match(pincodeRegex)) {
      alert('Please enter a valid 6-digit pincode.');
      return false;
    }
    return true;
  };

  const validatePhoneNumber = () => {
    // Your validation logic for phone number goes here
    const phoneNumberRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number
    if (!phoneNumber.match(phoneNumberRegex)) {
      alert('Please enter a valid 10-digit phone number.');
      return false;
    }
    return true;
  };
  const handleSubmit = async() => {
      try {
        if (validateShopName() &&validateDistrict() &&validateArea() && validateAddress() &&validatePincode() && validatePhoneNumber()) {
          const formData = {
            name: shopName,
            area: area,
            district:district,
            address:address,
            phone:phoneNumber,
            pincode:pincode,
          }
          console.log(formData);
          const response = await addshop(formData);
         if (response.success){
          setShopName('');
           setAddress('');
           setArea('');
           setDistrict('');
           setPhoneNumber('');
           setPincode('')
          ToastAndroid.show(response.message , ToastAndroid.TOP)
         }else {
          ToastAndroid.show(response.message, ToastAndroid.SHORT);
        }
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      }

    
  };
  return (
    <ScrollView>
    <View style={styles.Mainview}>
      <TextInput
        placeholder="Shop Name"
        placeholderTextColor={Color.Black} 
        style={styles.input}
        value={shopName}
        onChangeText={(text) => setShopName(text)}
        onBlur={validateShopName}
      />
      <TextInput
        placeholder="District"
        placeholderTextColor={Color.Black} 
        style={styles.input}
        value={district}
        onChangeText={(text) => setDistrict(text)}
        onBlur={validateDistrict}
      />
      <TextInput
        placeholder="Area"
        placeholderTextColor={Color.Black} 
        style={styles.input}
        value={area}
        onChangeText={(text) => setArea(text)}
        onBlur={validateArea}
      />
      <TextInput
        placeholder="Address"
        placeholderTextColor={Color.Black} 
        style={styles.input}
        value={address}
        onChangeText={(text) => setAddress(text)}
        onBlur={validateAddress}
      />
      <TextInput
        placeholder="Pincode"
        placeholderTextColor={Color.Black} 
        style={styles.input}
        value={pincode}
        onChangeText={(text) => setPincode(text)}
        onBlur={validatePincode}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Phone Number"
        placeholderTextColor={Color.Black} 
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        onBlur={validatePhoneNumber}
        keyboardType="numeric"
      />
      <Button buttonStyle={styles.button} title="Submit" onPress={handleSubmit} />
    </View>
  </ScrollView>
  )
}

export default AddShop

const styles = StyleSheet.create({
    input: {
        borderRadius: 15,
        height: 45,
        width: 195,
        borderWidth:2,
        borderColor: Color.maincolor,
        backgroundColor: Color.whitecolor,
        marginTop: 45,
        paddingLeft: 25,
        color:Color.Black
      },
      
    Mainview:{
        alignItems:"center",
        borderRadius:45,
        borderWidth:2,
        marginHorizontal:25,
        borderColor:Color.maincolor
    },
    button:{
        height:35,
        width:145,
        backgroundColor:Color.maincolor,
        margin:55,
        borderRadius:45,
    }
})