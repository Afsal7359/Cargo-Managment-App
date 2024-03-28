import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScreenNavigations from './src/Components/Navigations/ScreenNavigations';
import QRScanner from './src/Screen/Dashboard/QRScanner';
import Orders from './src/Screen/Orders/Orders';
import Color from './src/Components/Styling Comp/Color';
import store from './src/Redux/Store';
import ToastProvider from 'toastify-react-native';

const Tab = createBottomTabNavigator();

const App = ({navigation}) => {
  return (
   <>
      <NavigationContainer>
         <Tab.Navigator>
        
         <Tab.Screen
  name="Home"
  component={ScreenNavigations}
  options={{
    headerShown: false,
    tabBarIcon: ({ color, size, focused }) => (
      <Icon name="home" color={focused ? Color.whitecolor : Color.Black} size={size} />
    ),
    tabBarStyle: { backgroundColor: Color.maincolor }, // Background color of the tab bar
    tabBarItemStyle: { color: Color.Black }, // Text color of unselected tab 
    tabBarActiveLabelStyle: { color: Color.whitecolor }, // Text color of the selected tab label
    tabBarActiveTintColor: Color.whitecolor, // Text color of the selected tab label
    tabBarInactiveTintColor: Color.Black, // Text color of unselected tab labels
  }}
/>
             <Tab.Screen   name="Scan"
              component={QRScanner}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => (
                  <Icon name="qrcode" color={focused ? Color.whitecolor : Color.Black} size={size} />
                ),
                tabBarStyle: { backgroundColor: Color.maincolor }, // Background color of the tab bar
                tabBarItemStyle: { color: Color.Black }, // Text color of unselected tab 
                tabBarActiveLabelStyle: { color: Color.whitecolor }, // Text color of the selected tab label
                tabBarActiveTintColor: Color.whitecolor, // Text color of the selected tab label
                tabBarInactiveTintColor: Color.Black, // Text color of unselected tab labels
              }}/>
         </Tab.Navigator>
      </NavigationContainer>
      <ToastProvider/>
      </>      
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"green"
  },
  text:{
    fontSize:95,
    fontWeight:"900",
    color:"#fff"
  },
})