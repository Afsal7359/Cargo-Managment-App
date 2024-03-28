import { StyleSheet, Text, View,TextInput,ScrollView, ToastAndroid, Image } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-elements'
import Color from '../../Components/Styling Comp/Color'
import { addproduct } from '../../Api/Products'
import { Toast } from 'toastify-react-native'

const AddProduct = () => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productstock,setproductstock]=useState('');
  const [searchdata,setSearchData]=useState([])



  const validateproduct =()=>{
    try {
      if(!productName){
        Toast.warn( "Please enter the product name");
        return false;
      }return true
    } catch (error) {
      console.log(error);
    }
  }
  const validateprice =()=>{
    try {
      if(!productPrice){
        Toast.warn("Please enter a Price")
        return false;
      }else if(productPrice < 0){
        Toast.warn("Please enter a Valide Price")
        return false;
      }return true
    } catch (error) {
      console.log(error);
    }
  }
 

  const handleSubmit = async () => {
    try {
      if(validateproduct() && validateprice()){
          // Create FormData object with product information
          const formData = {
            id: productId,
            name: productName,
            price: productPrice,
            stock:productstock,
          };

          console.log(formData, "formData");

          //  addproduct function
          const response = await addproduct(formData);

          // Check the status in the response
          if (response.success) {
            setProductId('')
            setProductName('')
            setProductPrice('')
            setproductstock('')
            // Show a toast message if the status is "success"
            Toast.success(response.message);
          } else {
            // Product already exists or other errors
            Toast.error(response.message)
          }
      }
     
    } catch (error) {
      console.log(error);
      Toast.error(error);
    }
  };

  // const productSearch = async(payload)=>{
  //   console.log(payload,"payloaaaaaaad");
  //   try {
  //     const response = await SearchProduct(payload);
  //     if(response.success){
  //       console.log(response.data,"ddddddddddddddddddddddddddddddddddddsssss");
  //       setSearchData(response.data)
        
  //     }else{
  //       // Toast.error("No  Product Found")

  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  
  return (
    <ScrollView>
    <View style={styles.Mainview}>
      <TextInput
        placeholder="Product Id"
        placeholderTextColor={Color.Black} 
        style={styles.input}
        value={productId}
        onChangeText={(text) => setProductId(text)}
        
      />
      <TextInput
        placeholder="Product Name"
        placeholderTextColor={Color.Black} 
        style={styles.input}
        value={productName}
        onChangeText={(text) => setProductName(text)}
        onBlur={validateproduct}
      />
      <TextInput
        placeholder="Product Price"
        placeholderTextColor={Color.Black} 
        style={styles.input}
        value={productPrice}
        keyboardType="numeric"
        onChangeText={(text) => setProductPrice(text)}
        onBlur={validateprice}
      />
       <TextInput
        placeholder="Product stock" 
        placeholderTextColor={Color.Black} 
        style={styles.input}
        value={productstock}
        keyboardType="numeric"
        onChangeText={(text) => setproductstock(text)}
      />
     
      <Button
        buttonStyle={styles.button}
        title="Submit"
        onPress={handleSubmit}
      />
    </View>
  </ScrollView>
  )
}

export default AddProduct

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