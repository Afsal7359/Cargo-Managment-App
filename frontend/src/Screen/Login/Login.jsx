import { View, Text, StatusBar, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native'
import React,{ useState } from 'react'
import Color from '../../Components/Styling Comp/Color';

const Login = ({navigation}) => {
    const [username, setUserName] = useState('');
    const [password,setPassword]=useState('')
    
  return (
    <ScrollView>
     
    <View style={styles.topcircle}></View>
<Text style={styles.WelcomeText}>Welcome !</Text>
<Text style={styles.LoginText} >Login</Text>
<TextInput
  style={styles.Inputfield}
  placeholder="your name"
  placeholderTextColor={Color.Black} 
  onChangeText={item => setUserName(item)}
  defaultValue={username}
/>
 <TextInput
  style={styles.Inputfield2}
  placeholder="Password"
  placeholderTextColor={Color.Black} 
  onChangeText={item => setPassword(item)}
  defaultValue={password}
/>
<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('location')}><Text style={{color:Color.Black}}>Login</Text></TouchableOpacity>
</ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        backgroundColor:Color.maincolor,
    },
    topcircle:{
        width:160,
        backgroundColor:Color.maincolor,
        height:150,
        borderBottomRightRadius:150
    },
    WelcomeText:{
        fontSize:24,
        marginLeft:25,
        paddingTop:35,
        color:Color.Black
    },
    LoginText:{
        fontSize:26,
        marginLeft:25,
        color:Color.Black
    },
    Inputfield:{
        height:45,
        width:"100",
        marginHorizontal:35,
        marginTop:65,
        marginVertical:15,
        borderColor: Color.maincolor,
        borderWidth:2,
        paddingLeft:25,
        borderRadius:10,
    },
    Inputfield2:{
        height:45,
        width:"100",
        marginHorizontal:35,
        marginVertical:20,
        borderColor: Color.maincolor,
        borderWidth:2,
        paddingLeft:25,
        borderRadius:10,
    },
    button:{
        backgroundColor:Color.maincolor,
        height:45,
        width:"100",
        borderRadius:15,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:25,
        marginHorizontal:100
    },
   
})