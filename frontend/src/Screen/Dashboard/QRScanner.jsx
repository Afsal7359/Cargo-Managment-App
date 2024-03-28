import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RNCamera } from 'react-native-camera';
import Color from '../../Components/Styling Comp/Color';
import { useEffect } from 'react';

const QRScanner = () => {

  const onBarCodeRead = async (e) => {
    console.log(e.data);
  };
  

  return (
    <View style={styles.container}>
        <StatusBar style="auto" translucent={false} backgroundColor={Color.maincolor}/>
      <Text style={styles.text}>SCAN FOR MARK SHOP VISIT</Text>
    <View style={styles.cameraview}>
          <RNCamera
            style={styles.camera}
            onBarCodeRead={onBarCodeRead}
            captureAudio={false}
          />
        </View>
    </View>
   
  )
}

export default QRScanner

const styles = StyleSheet.create({
  container:{
    backgroundColor:Color.whitecolor,
    flex:1
  },
  cameraview:{
    height:350,
    width:250,
    marginVertical:"20%",
    marginHorizontal:"18%",
    borderWidth:10,
    borderLeftWidth:10,
    alignSelf:'center',
    borderRadius:25,
    padding:20,
    backgroundColor:Color.whitecolor,
    borderColor:Color.whitecolor
  },
  text:{
    fontSize:25,
    fontWeight:"900",
    color:Color.Black,
    textAlign:"center",
    marginTop:"25%",
  },
  camera:{
    flex:1,
  }

})