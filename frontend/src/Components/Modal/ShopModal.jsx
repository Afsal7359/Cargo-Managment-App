import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import Color from '../Styling Comp/Color'
import { SearchBar } from 'react-native-elements'
import { getshop } from '../../Api/Shop'
import { getproducts } from '../../Api/Products'
import { useDispatch, useSelector } from 'react-redux'
import { AddselectedShop, RemoveselectedShop } from '../../Redux/Cartreducer'
import loadinggif from '../../../assets/loading.gif' 
import closeicon from '../../../assets/closeicon.png'

const ShopModal = ({handleclosemodal,navigation}) => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [search,setSearch]=useState('');
    const [shopdata,setShopData]=useState([]);
    const [selectedshop,setSelectedShop]=useState([]);
    const [isloading,setIsLoading]=useState(false)

    const dispatch = useDispatch();
    useEffect(()=>{
      shopdatafetch();
    },[])

    useEffect(()=>{
     
      filterData();
    },[search])
    const filterData = () => {
      const filtered = shopdata.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setShopData(filtered)
    };
    const selectedShop = useSelector((state) => state.cart.selectedshop);
    console.log('Selected Shop:', selectedShop);
    const shopdatafetch =async()=>{
      try {
        if(shopdata.length === 0){
          const response = await getshop();
          setShopData(response.data)
          setIsLoading(true);
          console.log(shopdata,"shoppdaaaaaata");
        }else{
          console.log("data already fetch");
        }
      } catch (error) {
        ToastAndroid.show(error,ToastAndroid.BOTTOM)
      }
    }
   const handleshopclick =(item)=>{
    try {
     
      dispatch(AddselectedShop(item))
      handleclosemodal()
    } catch (error) {
      console.log(error);
      ToastAndroid.show(error,ToastAndroid.SHORT)
    }
   }
 
  return (
    <View>
       <Modal isVisible={isModalVisible}>
       <ScrollView style={styles.modalcontainer}>
       <TouchableOpacity onPress={()=>{handleclosemodal()}} style={styles.btn}>
           <Image source={closeicon}/>
          </TouchableOpacity>
        {isloading ? (
          <View >
          <View style={{alignItems:"center",marginTop:40}}>
              <SearchBar
                placeholder="Type Here..."
                onChangeText={(value) => setSearch(value)}
                value={search} round
            
                containerStyle={{
                  backgroundColor: 'transparent', 
                  borderBottomColor: 'transparent', 
                  borderTopColor: 'transparent',
                  paddingHorizontal:10,
                  
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
              />
                    </View>
              
             
                {shopdata.length !== 0 ?shopdata.map((item) => (
                  <TouchableOpacity style={styles.touchcontainer} key={item._id} onPress={()=>{handleshopclick(item)}}>
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                      <Text style={{ fontSize: 25, fontWeight: "900",color:Color.Black }}>{item.name}</Text>
                    </View>
                    <Text style={{ textAlign: "center",color:Color.Black }}>{item.phone}</Text>
                    <Text style={{ textAlign: "center",color:Color.Black }}>{item.area} , {item.district}</Text>
                  </TouchableOpacity>
                )):("")}
             
        </View>
        ):(
         <ActivityIndicator  size={65} color={Color.maincolor} style={{marginTop:"50%"}}/>
        )}
        </ScrollView>
        
      </Modal>
    </View>
  )
}

export default ShopModal

  const styles = StyleSheet.create({
        scrollview:{
          height:300,
        },
      touchcontainer:{
        backgroundColor:Color.maincolor,
        height:105,
        marginHorizontal:25,
        borderRadius:15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 5, 
        elevation: 5,
        marginVertical:15,
        justifyContent:"center"
      },
    modalcontainer:{
        height:650,
        width:"100%",
        backgroundColor:Color.whitecolor,
        borderRadius:15,
      },
      btn:{
        borderRadius:15,
      
      },
      btntext:{
        textAlign:"center",
        color:Color.Black,
      },
      
      
})