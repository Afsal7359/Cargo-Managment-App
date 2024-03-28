import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SearchBar } from 'react-native-elements'
import Color from '../../Components/Styling Comp/Color';
import data from '../../Components/Styling Comp/Data';
import { SearchProduct, getproducts } from '../../Api/Products';
import { Toast } from 'toastify-react-native';

const AllProducts = () => {
    const [search,setSearch]=useState('');
    const [productdata,setProductData]=useState([]);
    const[prostate,setProstate]=useState(true)
    const[searchstate,setsearchstate]=useState(false)
    const [searchdata,setSearchData]=useState([])
    

 
    const productdatafetch =async()=>{
      try {
        if(productdata.length===0){
        const response = await getproducts()
        if (response.success){
          setProductData(response.data)
        }
      }else{
        console.log("already fetched");
      }
      } catch (error) {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      }
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


    useEffect(() => {
      // filterData();
      productdatafetch();
    }, []);

  return (
    <SafeAreaView>
        <View style={{alignItems:"center"}}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={(e)=>{setSearch(e);productSearch(e)}}
           value={search}
            round
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
      { !productdata ? (
       <ActivityIndicator  size={65} color={Color.maincolor} style={{position:"absolute", top:300,left:165}}/>
      ):( <View style={styles.mainview}>
        <View style={styles.prohead}>
          <Text style={styles.protext}>Id</Text>
          <Text style={styles.protext} >Product</Text>
          <Text style={styles.protext}>price</Text>
          <Text style={styles.protext}>Stock</Text>
        </View>
        <ScrollView style={styles.scroll}>
        {search && Array.isArray(searchdata) && searchdata.length !== 0 ? (
          searchdata.map((item, index) => (
            <TouchableOpacity key={index} style={styles.proview}>
              <Text style={{color:Color.Black}}>{item.id}</Text>
              <Text style={{color:Color.Black}}>{item.name}</Text>
              <Text style={{color:Color.Black}}>{item.price}</Text>
              <Text style={{color:Color.Black}}>{item.stock}</Text>
            </TouchableOpacity>
          ))
        ) : (
          productdata.map((item, index) => (
            <TouchableOpacity key={index} style={styles.proview}>
              <Text style={{color:Color.Black}}>{item.id}</Text>
              <Text style={{color:Color.Black}}>{item.name}</Text>
              <Text style={{color:Color.Black}}>{item.price}</Text>
              <Text style={{color:Color.Black}}>{item.stock}</Text>
            </TouchableOpacity>
          ))
        )}
        </ScrollView>
        {/* {searchstate&& <ScrollView style={styles.scroll}>
        {searchdata?searchdata.map((item,index)=>(
          <TouchableOpacity key={index} style={styles.proview} >
           <Text> {item.id}</Text> 
          <Text> {item.name}</Text>
          <Text> {item.price}</Text>
          <Text> {item.stock}</Text>
        </TouchableOpacity>
        )):(
          <Text>No Data....</Text>
        )}
        </ScrollView>} */}
        </View>)
    }
    </SafeAreaView>
  )
}

export default AllProducts

const styles = StyleSheet.create({
  scroll:{
    height:"70%"
  },
    prohead:{
      
        marginTop:"5%",
        flexDirection:'row',
        justifyContent:"space-around",
        borderRadius:10,
        marginTop:25,
        paddingVertical:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5, 
        backgroundColor:Color.whitecolor,
        marginHorizontal:10,
        height:95,
        alignItems:"center",
    },
    mainview:{

    },
    protext:{
        fontWeight:"900",
        fontSize:15,
        color:Color.Black
    },
    proview:{
        flexDirection:'row',
        justifyContent:"space-around",
        borderRadius:10,
        marginTop:25,
        paddingVertical:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5, 
        backgroundColor:Color.whitecolor,
        marginHorizontal:10,
        height:95,
        alignItems:"center",
    }
 })