import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../Screen/Login/Login';
import Selection from '../../Screen/Login/Selection';
import Home from '../../Screen/Dashboard/Home';
import Creations from '../../Screen/Creations/Creations';
import Color from '../Styling Comp/Color';
import NewOrder from '../../Screen/Orders/NewOrder';
import AllProducts from '../../Screen/Products/AllProducts';
import Orderhistory from '../../Screen/Orders/Orderhistory';
import Cart from '../../Screen/Orders/Cart';
import Orders from '../../Screen/Orders/Orders';
import Icon from 'react-native-vector-icons/FontAwesome';
import Store from '../../Redux/Store';
import { Provider } from 'react-redux';
import Report from '../../Screen/Orders/Report';
import Shoplocation from '../../Screen/Dashboard/Shoploaction';

const Stack = createNativeStackNavigator();
const ScreenNavigations = () => {
  return (
    <Provider store={Store}>
  <Stack.Navigator>
    <Stack.Screen name='login' component={Login} options={{headerShown:false}}/>
    <Stack.Screen name='location' component={Shoplocation} options={{headerShown:false}}/>
    <Stack.Screen name='Selection' component={Selection} options={{headerShown:false}}/>
    <Stack.Screen name='cart' component={Cart} options={{headerShown:true,headerStyle:{backgroundColor:Color.maincolor}}}/>
    <Stack.Screen name='Dashboard' component={Home} options={{headerShown:false}}/>
    <Stack.Screen name='creations' component={Creations} options={{headerShown:true,headerStyle:{backgroundColor:Color.maincolor}}}/>
    <Stack.Screen name='Report' component={Report} options={{headerShown:true,headerStyle:{backgroundColor:Color.maincolor}}}/>
    <Stack.Screen name='All Products' component={AllProducts} options={{headerShown:true,headerStyle:{backgroundColor:Color.maincolor}}}/>
    <Stack.Screen name='Order History' component={Orderhistory} options={{headerShown:true,headerStyle:{backgroundColor:Color.maincolor}}}/>
    <Stack.Screen
        name="New Order"
        component={NewOrder}
        options={({ navigation }) => ({
          headerTitle: 'New Order',
          headerStyle: {
            backgroundColor: Color.maincolor,
          },
          // headerRight: () => (
          //   <Icon
          //     name="shopping-cart"
          //     size={30}
          //     color="black"
          //     style={{ marginRight: 20 }}
          //     onPress={() => navigation.navigate('cart')}
          //   />
          // ),
        })}
      />
</Stack.Navigator>
</Provider>
  )
}

export default ScreenNavigations
