import React, { useState } from 'react'
import { View, Text, StyleSheet, Touchable, TouchableOpacity, Image, ScrollView, ActivityIndicator, ProgressBarAndroid, StatusBar,  } from 'react-native'
import imageneworder from "../../../assets/neworder.png"
import orderhistoryimg from "../../../assets/ordershistory.png"
import productsimage from "../../../assets/product.png";
import creationsimage from "../../../assets/creations.png";
import Color from '../../Components/Styling Comp/Color';
import Icon from 'react-native-vector-icons/FontAwesome';
import dashimg from "../../../assets/dashboardimg.png"


const Home = ({navigation}) => {
  const [user,setuser]=useState("Afsal")
  const [value,setValue]=useState(0)

  
  return (
    <View>
    <StatusBar style="auto" translucent={false} backgroundColor={Color.maincolor}/>
    <View style={styles.topview}> 
    <TouchableOpacity style={{position:"absolute",top:15,right:30}}>
    <Icon  name='sign-out' size={30} color={Color.Black} />
    </TouchableOpacity>
    <View style={{position:"absolute",top:18,left:35}}>
      {/* <Text style={{fontSize:24,color:Color.Black}}>Dashboard</Text> */}
      <Icon
              name="home"
              size={30}
              color="black"/>
    </View>
    <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
          style={{ height: 60, width: 235, transform: [{ scaleY: 5 }] }}
        />
    <View style={{marginBottom:45 ,justifyContent:"space-between",flexDirection:"row",width:235}}>
      <Text style={{fontSize:10,color:Color.Black}}>Monthly Target : 25000</Text>
      <Text style={{fontSize:10,color:Color.Black}}> Target Achieved : 0 </Text>
    </View>
    {/* <View style={{ marginBottom: 45 }}>
       <Image source={dashimg} style={{ width: 150, height: 150 }} />
    </View> */}
    {/* <View style={styles.progressbar}> */}
    {/* <View style={styles.container}>
  <Text>
    Loading.....
  </Text>
  <View style={styles.progressBar}></View>
</View> */}
        {/* <CircularProgress
        radiux={90}
        value={85}
        textColor='#222'
        fontSize={20}
        valueSuffix={'%'}
        inActiveStrokeColor={'#2ecc71'}
        inActiveStrokeOpacity={0.2}
        inActiveStrokeWidth={6}
        duration={3000}
        onAnimationComplete={() => setValue(50)}
        /> */}
    {/* <CircularProgress
      value={15666}
      radius={60}
      duration={2000}
      activeStrokeColor={'#f39c12'}
      inActiveStrokeColor={'#fff'}
      progressValueColor={'#fff'}
      maxValue={20000}
      title={"Target"}
      titleColor={'white'}
      titleStyle={{fontWeight: 'bold'}}
      /> */}
      {/* </View> */}
         {/* <Text style={styles.nametext}>{user}</Text> */}
    </View>
    <TouchableOpacity style={styles.card1} onPress={()=> navigation.navigate('New Order')}>
        <Image style={styles.neworderimg} source={imageneworder}/> 
        <Text style={styles.cardText}>New Order</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.card2} onPress={()=> navigation.navigate('Order History') }>
        <Image style={styles.orderhistoryimg} source={orderhistoryimg}/>
        <Text style={styles.cardText}>Orders History</Text>
    </TouchableOpacity>
    <View style={styles.cardview}>
    <TouchableOpacity style={styles.card3} onPress={()=> navigation.navigate('All Products')}>
    <Image style={styles.neworderimg} source={productsimage}/> 
        <Text style={styles.cardText}>All Products</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.card4} onPress={()=> navigation.navigate('creations')}>
    <Image style={styles.creationimg} source={creationsimage}/>
        <Text style={styles.cardText}>Creations</Text>
    </TouchableOpacity>
    </View>
    <View>
    
      </View>
</View>
  )
}
const styles = StyleSheet.create({
    progressBar: {
        height: 20,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
      },
     
  topview:{
      height:350,
      backgroundColor:Color.maincolor,
      borderBottomLeftRadius:150,
      borderBottomRightRadius:150,
      alignItems:"center",
      justifyContent:"center"
  },
  nametext:{
      color:"#fff",
      marginBottom:60,
      fontWeight:"900",
  },
 
  card1:{
      backgroundColor:"#fff",
      height:135,
      width:135,
      borderRadius:10,
      position:"absolute",
      elevation:55,
      top:"75%",
      left:"8%"
      
  },
  card2:{
    backgroundColor:"#fff",
    height:135,
    width:135,
    borderRadius:10,
    elevation:55,
    position:"absolute",
    top:"75%",
    right:"8%",
},
card3:{
    backgroundColor:"#fff",
    height:135,
    width:135,
    borderRadius:10,
    position:"absolute",
    marginVertical:125,
    elevation:55,
    left:"8%"
},
card4:{
    backgroundColor:"#fff",
    height:135,
    width:135,
    borderRadius:10,
    elevation:55,
    position:"absolute",
    marginVertical:125,
    right:"8%"
},

  cardview:{
    //   flexDirection:"row",
    //   marginVertical:15,
    //   justifyContent:"center"
  },
  cardText:{
      fontSize:15,
      textAlign:"center",
      color:Color.Black
  },
  neworderimg:{
      marginHorizontal:35,
      marginVertical:20
  },
  orderhistoryimg:{
      height:60,
      width:60,
      marginHorizontal:40,
      marginVertical:15
  },
  creationimg:{
      height:60,
      width:60,
      marginHorizontal:40,
      marginVertical:20
  },
 
  progressbar:{
     marginBottom:10
     
  }


})

export default Home