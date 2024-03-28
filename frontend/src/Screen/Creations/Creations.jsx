import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AddProduct from './AddProduct'
import AddArea from './AddArea'
import AddShop from './AddShop'
import Color from '../../Components/Styling Comp/Color'

const Creations = () => {
  const [addProduct,setAddProduct]=useState(false)
    const [addShop,setAddShop]=useState(true)
    const [addArea,setAddArea]=useState(false)

    const [Button1,setButton1]=useState(Color.maincolor)
    const [Button2,setButton2]=useState("")
    const [Button3,setButton3]=useState("")   

    const handleAddshop =()=>{
        setAddShop(true);
        setAddProduct(false)
        setAddArea(false)
        setButton1(Color.maincolor)
        setButton2("")
        setButton3("")
    }
    const handleAddProduct =()=>{
        setAddProduct(true)
        setAddShop(false)
        setAddArea(false)
        setButton1("")
        setButton2(Color.maincolor)
        setButton3("")
    }
    const handleAddArea=()=>{
        setAddArea(true)
        setAddProduct(false)
        setAddShop(false)
        setButton1("")
        setButton2("")
        setButton3(Color.maincolor)
    }
    const styles = StyleSheet.create({
   
        button1:{
            backgroundColor: Button1 ?Button1: Color.whitecolor,
            height:55,
            width:120,
            borderRadius:15,
            justifyContent:"center",
            elevation:10,
            margin:15
        },
        button2:{
            backgroundColor: Button2 ? Button2 :Color.whitecolor,
            height:55,
            width:120,
            borderRadius:15,
            justifyContent:"center",
            elevation:10,
            margin:15
        },
        button3:{
            backgroundColor: Button3?Button3:Color.whitecolor,
            height:55,
            width:120,
            borderRadius:15,
            justifyContent:"center",
            elevation:10,
            margin:15
        },
        container:{
            justifyContent:"center",
            alignItems: "center",
        },
       
        text:{
         textAlign:"center"   ,
         fontSize:13,
         fontWeight:"500",
         color:Color.Black
        },
    
    })
 
  return (
    <ScrollView >
 
 <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.button1} onPress={handleAddshop}>
            <Text style={styles.text}>Add a new Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={handleAddProduct}>
            <Text style={styles.text}>Add a new Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3}onPress={handleAddArea}>
            <Text style={styles.text}>Add a new Area</Text>
        </TouchableOpacity>
    </ScrollView>
    {addProduct && <AddProduct/>}
    {addArea && <AddArea/>}
    {addShop && <AddShop/>}
    </ScrollView>
  )
}


export default Creations
