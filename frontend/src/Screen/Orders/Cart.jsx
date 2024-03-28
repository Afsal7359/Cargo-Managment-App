import { Alert, Image, ScrollView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../../Components/Styling Comp/Color'
import { useDispatch, useSelector } from 'react-redux';
import plusicon from "../../../assets/plus.png"
import minusicon  from "../../../assets/minus.png"
import deleteicon  from "../../../assets/delete.png"
import { Increasequantity, RemoveselectedShop, addToCart, decreaseCartItem, removeFromCart } from '../../Redux/Cartreducer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddOrders } from '../../Api/Order';
import { Toast } from 'toastify-react-native';


const Cart = ({navigation}) => {

    const cartItems = useSelector((state) => state.cart.cartItems);
    const selectedShopss = useSelector((state) => state.cart.selectedshop);
    console.log(selectedShopss?selectedShopss._id:"","selectedshop");
    const dispatch = useDispatch();
  
    const [totalprice,setTotalPrice]=useState("")
  useEffect(() => {
    console.log('Cart items fetched:', cartItems);
  }, []);
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  console.log(totalPrice,'Total Priceeeeee');

  const handleincreaseitem =(item)=>{
    console.log(item);
    try {
      dispatch(Increasequantity(item));
    } catch (error) {
      console.log(error);
    }
  }
  const handledecreaseitem =(item)=>{
    try {
      dispatch(decreaseCartItem(item))
    } catch (error) {
      console.log(error);
    }
  }

  const handledeleteitem =(item)=>{
    try {
      Alert.alert('Confirm', 'Are you sure you want to delete the item from the cart ?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Delete', onPress: () =>dispatch(removeFromCart(item))},
      ])
      
    } catch (error) {
      console.log(error);
    }
  }
  const currentDate = new Date();
const formattedCurrentDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

console.log(formattedCurrentDate);

  const onsubmit =async()=>{
    try {
      const formdata = {
        shop:selectedShopss._id,
        date :formattedCurrentDate,
        cartitem:cartItems?cartItems:[],
        totalprice:totalPrice
      }
      console.log(formdata,"Formmmmmmmmmmmmmmmdaaaaaataaaa");
      const response = await AddOrders(formdata)
      if(response.success){
        Toast.success("Order Confirmed Sucessfully");
        dispatch({type: 'REMOVE_SELECTED_SHOP'});
        dispatch({ type: 'CLEAR_CART' });
          navigation.navigate('New Order');
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleSave = () => {
    Alert.alert('Confirm','Are you sure you want to save the item ?',[
      {
        text:'Cancel',
        onPress :()=>console.log('Cancel Pressed') ,
        style:'cancel',
      },{
        text:'Save',
        onPress: () => {
          onsubmit()
          // dispatch({ type: 'CLEAR_CART' });
          // navigation.navigate('New Order');
        },
        style:'save',
      }
    ])
  };


  return (
    <SafeAreaView style={{marginBottom:55}}>
         <StatusBar
        animated={true}
        backgroundColor={Color.maincolor}
        barStyle={'light-content'} />
     
     
      <View style={[styles.cartview,styles.headingview]} >
          <View style={styles.subcontainer1}>
          <Text style={[styles.carttext,styles.headingtext]}>Name</Text>
          </View>
          <View style={styles.subcontainer1}>
          <Text style={[styles.carttext,styles.headingtext]}>price</Text>
          </View>
          <View style={styles.subcontainer}>
          <TouchableOpacity   style={styles.btnplus}>
            {/* <Image source={minusicon} style={{ width: 25, height: 25 }}/> */}
          </TouchableOpacity>
              <Text style={[styles.carttext,styles.btnplus,styles.headingtext]}>quantity</Text>
          <TouchableOpacity  style={styles.btnplus} >
            {/* <Image source={plusicon} style={{ width: 25, height: 25 }}/> */}
          </TouchableOpacity>
          <TouchableOpacity  style={styles.btnplus} >
            {/* <Image source={deleteicon} style={{ width: 25, height: 25 }}/> */}
          </TouchableOpacity>
          <Text  style={[styles.carttext,styles.btnplus,styles.headingtext]}>Total</Text>
       </View>
      </View>
      <ScrollView style={styles.scrollview}>
      {cartItems.map((item, index) => (
        <View style={styles.cartview}  key={index}>
          <View style={styles.subcontainer1}>
          <Text style={styles.carttext}>{item.name.substring(0, 10)}...</Text>

          </View>
          <View style={styles.subcontainer1}>
          <Text style={styles.carttext}>{item.price}</Text>
          </View>
          <View style={styles.subcontainer}>
          <TouchableOpacity onPress={()=>{handledecreaseitem(item)} }  style={styles.btnplus}>
            <Image source={minusicon} style={{ width: 20, height: 20 }}/>
          </TouchableOpacity>
          
              <Text style={[styles.carttext,styles.btnplus]}>{item.quantity}</Text>
          <TouchableOpacity onPress={()=>{handleincreaseitem(item)}} style={styles.btnplus} >
            <Image source={plusicon} style={{ width: 20, height: 20 }}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{handledeleteitem(item)}} style={styles.btnplus} >
            <Image source={deleteicon} style={{ width: 20, height: 20 }}/>
          </TouchableOpacity>
          <Text  style={[styles.carttext,styles.btnplus]}>{item.price*item.quantity}</Text>
       </View>
      </View>
        
      ))}
    
    </ScrollView>
    <View style={styles.btnviews} >
      <View style={styles.priceview}>
        <Text style={{color:Color.Black}}>₹ {totalPrice?totalPrice:""}</Text>
      </View>
    <TouchableOpacity style={styles.savebtn} onPress={handleSave}><Text style={{color:Color.Black}}>Confirm </Text></TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  headingview:{
    marginVertical:25,
    shadowColor: Color.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 15, 
  },
  headingtext:{
    fontWeight:"900"
  },
  scrollview:{
    height:"80%"
  },
  btnplus:{
    margin:10,
  },
  savebtn:{
    backgroundColor:Color.maincolor,
    width:"50%",
    alignItems:"center",
    justifyContent:"center",
    height:45,
    borderRadius:10,
  },
  priceview:{
    justifyContent:"center"
  },
  btnviews:{
    flexDirection:"row",
  justifyContent:"space-between",
  paddingHorizontal:30,
  height:55,
  backgroundColor:Color.whitecolor,
  alignItems:"center"
  },
  subcontainer1:{
    flexDirection:'row',
    justifyContent:"center",
    alignItems:"center",
    marginLeft:"5%"
  },
  subcontainer:{
    flexDirection:'row',
    right:0,
    position:"absolute"
  },
  cartview:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:Color.whitecolor,
    margin:10,
    borderRadius:8,
    height:64,
    shadowColor:"000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5, 
  },
  carttext:{
    color:Color.Black,
  },
})
export default Cart

