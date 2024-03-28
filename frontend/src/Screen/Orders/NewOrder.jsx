import { View, Text, StyleSheet, ScrollView, Touchable,SafeAreaView,Button, TouchableOpacity, ToastAndroid, ActivityIndicator, Image, TextInput, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SearchBar } from 'react-native-elements'
import Color from '../../Components/Styling Comp/Color'
import { useDispatch, useSelector } from 'react-redux'
import { AddProductdata, RemoveselectedShop, addToCart } from '../../Redux/Cartreducer'
import { Picker } from '@react-native-picker/picker'
import { SearchProduct, getproducts } from '../../Api/Products'
import ShopModal from '../../Components/Modal/ShopModal'
import loadinggif from '../../../assets/loading.gif'
import { Toast } from 'toastify-react-native'
import Modal from 'react-native-modal'
import closeicon from "../../../assets/closeicon.png"

const NewOrder = ({navigation}) => {
  const [filteredData, setFilteredData] = useState('');
  const [District, setDistrict] = useState('option1');
  const [isloading,setIsLoading]=useState(false)
  const [searchdata,setSearchData]=useState([])
  const [isAddmodal,setAddModal]=useState(false)
  const [ismodal,setismodal]=useState(false)
  const [quantity, setQuantity] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem,setSelectedItem]=useState([]);

  // const Data = data && data ? data : [];
  const [Data,setData]=useState([])
  const [search,setSearch]=useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
 
  const cartItems = useSelector((state) => state.cart.cartItems);
  const selectedShopss = useSelector((state) => state.cart.selectedshop);
  console.log(selectedShopss,"dddddddddddddddd");

  console.log(cartItems);
 

  const Addtocart = (item, quantity) => {
    const parsedQuantity = parseInt(quantity, 10);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      // Handle invalid quantity
      Toast.error('Invalid quantity. Please enter a valid number greater than 0.');
      return;
    }

    console.log(item, 'selected item');
    // Add to redux
    dispatch(addToCart({ ...item, quantity: parsedQuantity }));
    // Filter fetched data and selected item
    // const filterDatass = cartItems.filter(cartItem => cartItem.name === item.name);
    // console.log(filterDatass, 'filterData');
    Toast.success(`${parsedQuantity} ${item.name} Added to cart`);
    setAddModal(false); // Close the modal after adding to cart
    setQuantity('')
  };
 
  
  const productdatafetch =async()=>{
    try {
      if(Data.length===0){
      const response = await getproducts()
      if (response.success){
        setData(response.data)
        setIsLoading(true)
        // dispatch(AddProductdata(Data));
        console.log(Data,"daaata");
      }
    }else{
      console.log("already fetched");
    }
    } catch (error) {
      console.log(error);
      Toast(error)
    }
  }
  useEffect(()=>{
    productdatafetch();
  },[])

   
  const handleclosebutton=()=>{
    try {
      setAddModal(false)
    } catch (error) {
      console.log(error);
    }
  }
  const handlesubmit = () => {
    try {
      if (cartItems.length === 0) {
        Toast.warn("Please Select an Item");
      } else if (selectedShopss.length === 0) {
        Toast.warn("Please Select a Shop");
      } else {
        navigation.navigate('cart');
      }
    } catch (error) {
      console.log(error);
    }
  }
 
    const toggleModal = () => {
      setModalVisible(true);
      dispatch(RemoveselectedShop())
    };
    const handleclosemodal=()=>{
      setModalVisible(false)
    }
    const productSearch = async(payload)=>{
      console.log(payload,"payloaaaaaaad");
      try {
        const response = await SearchProduct(payload);
        if(response.success){
          console.log(response.data,"ddddddddddddddddddddddddddddddddddddsssss");
          setSearchData(response.data)
          
        }else{
          // Toast.error("No  Product Found")

        }
      } catch (error) {
        console.log(error);
      }
    }
    const styles = StyleSheet.create({
 
      buttonss: {
        height: 45,
        width: 100,
        backgroundColor: Color.maincolor,
        justifyContent:"center",
        borderRadius: 13,
        marginTop: 45,
        justifyContent:"space-around"
      },
      modalscrollview:{
        height:Dimensions.get("screen").width-150,
        width:Dimensions.get("screen").width-48,
        backgroundColor:Color.whitecolor,
        borderRadius:10
      },
      modalhead:{
        fontSize:20,
        textAlign:"center",
        marginTop:25,
        color:Color.Black
      },
      modalinput:{
        borderRadius: 15,
        height: 45,
        width: 100,
        borderWidth: 2,
        borderColor: Color.maincolor,
        backgroundColor: Color.whitecolor,
        marginTop: 45,
        color:Color.Black
      },
      itemText:{
        color:Color.Black,
      },
    
      savebtn:{
        backgroundColor:Color.maincolor,
        width:"50%",
        alignItems:"center",
        justifyContent:"center",
        alignContent:"center",
        marginTop:10,
        marginHorizontal:"25%",
        height:45,
        borderRadius:10,
        position:"relative",
        bottom:0
      },
      productcontainer:{
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: 'space-between', 
        paddingHorizontal: 16,
      },
      
      
        itemScrollview:{
          height:selectedShopss.name?"74%":"78%"
        },
        itemView:{  
          width:150,
          height:95,
          borderRadius:15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5, 
          alignItems:"center",
          justifyContent:"center",
          margin:10,
          backgroundColor:Color.whitecolor 
        },
        pickerView:{
          borderWidth: 3,
          borderColor: Color.whitecolor,
          backgroundColor:Color.whitecolor,
          borderRadius: 13,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5, 
          margin: 10,
          height:50,
          width:"100",
          justifyContent:"center",
          fontStyle:"italic",
          marginHorizontal:15,
        },
      
    })
console.log(search,"search");
  return (
    <SafeAreaView>

      <View  style={styles.pickerView}>
        <TouchableOpacity><Text style={{textAlign:"center",fontWeight:"900",color:Color.Black}} onPress={toggleModal}>Select Shop</Text></TouchableOpacity>
      {isModalVisible&&<ShopModal handleclosemodal={handleclosemodal} navigation={navigation}/>}
      
         </View>
        {selectedShopss.name&& <View style={{alignItems:"center"}}>
          <Text style={{color:Color.Black,fontSize:15}}>{selectedShopss?selectedShopss.name:""}</Text>
          <Text style={{color:Color.Black,fontSize:15}}>{selectedShopss?selectedShopss.address:""}</Text>
         </View>}
         <View style={{alignItems:"center"}}>
    <SearchBar
      placeholder="Type Here..."
      onChangeText={(e)=>{setSearch(e);productSearch(e)}}
       value={search} round
  
       containerStyle={{
         backgroundColor: 'transparent', 
         borderBottomColor: 'transparent', 
         borderTopColor: 'transparent',
         paddingHorizontal:13,
        
       }}
       inputContainerStyle={{
         backgroundColor: Color.whitecolor, 
         borderRadius: 10,
         height: 50, 
         width:"100%",
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.5,
         shadowRadius: 2,
         elevation: 5, 
         
       }}
       inputStyle={{
         color: '#000',
       }}
       placeholderTextColor="#999" 
       onClear={() => {
        if (!search) {
          handleClear();
        }
      }}
     />
    </View>
         {isloading ? (
    <View> 
           {Data.length !==0 ?   <View>  
    
    
   
    <ScrollView style={styles.itemScrollview}>
    <View style={styles.productcontainer}>
    {/* {Data.map((item, index) => (
      <TouchableOpacity key={index} style={styles.itemView} onPress={()=>{setAddModal(true) ,setSelectedItem(item)}}>
        <Text style={styles.itemText}> {item.name}</Text>
        <Text style={styles.itemText}>₹ {item.price}</Text>
        <Text style={styles.itemText}>Stock: {item.stock}</Text>
      </TouchableOpacity>
    ))} */}
     {search && Array.isArray(searchdata) && searchdata.length !== 0 ? (
          searchdata.map((item, index) => (
            <TouchableOpacity key={index} style={styles.itemView} onPress={()=>{setAddModal(true) ,setSelectedItem(item)}}>
            <Text style={styles.itemText}> {item.name}</Text>
            <Text style={styles.itemText}>₹ {item.price}</Text>
            <Text style={styles.itemText}>Stock: {item.stock}</Text>
          </TouchableOpacity>
          ))
        ) : (
          Data.map((item, index) => (
            <TouchableOpacity key={index} style={styles.itemView} onPress={()=>{setAddModal(true) ,setSelectedItem(item)}}>
            <Text style={styles.itemText}> {item.name}</Text>
            <Text style={styles.itemText}>₹ {item.price}</Text>
            <Text style={styles.itemText}>Stock: {item.stock}</Text>
          </TouchableOpacity>
          ))
        )}
  </View>   
    </ScrollView>
    
  <TouchableOpacity style={styles.savebtn} onPress={()=>handlesubmit()}>
    <Text  style={{color:Color.Black}}>Save  </Text>
  </TouchableOpacity>
   </View> :(
              <View style={{alignItems:"center",marginVertical:100}}>
                  <Text style={{fontSize:20,color:Color.Black}}>No Data available</Text>
                   <Image
                      source={loadinggif}
                      style={{ width: 350, height: 350,}}
                    />
                    <TouchableOpacity onPress={()=>{ navigation.navigate('creations')}}><Text>Add Products</Text></TouchableOpacity>
                  </View>
              )
  }
   
 
       </View>
   )  : (
    <ActivityIndicator  size={65} color={Color.maincolor} style={{position:"absolute", top:300,left:165}}/>
   )}
    <Modal isVisible={isAddmodal}>
      <View style={styles.modalscrollview}>
      <TouchableOpacity onPress={()=>handleclosebutton()}>
          <Image source={closeicon}/>
        </TouchableOpacity>
      <ScrollView>
     
      <Text style={styles.modalhead}>{selectedItem?selectedItem.name:""}</Text>
      <View style={{flexDirection:"row",justifyContent:"space-around",marginHorizontal:25}}>
        <View>
          <Text></Text>
        </View>
             <TextInput
              style={styles.modalinput}
              keyboardType="numeric"
              value={quantity}
              onChangeText={text => setQuantity(text)}
              onSubmitEditing={() => Addtocart(selectedItem, quantity)}
            />
      <TouchableOpacity style={styles.buttonss} onPress={() => Addtocart(selectedItem, quantity)}><Text style={{textAlign:"center",color:Color.Black}}>Add</Text></TouchableOpacity>
     </View>
      </ScrollView>
      </View>
    </Modal>
  </SafeAreaView>
  )
}



export default NewOrder