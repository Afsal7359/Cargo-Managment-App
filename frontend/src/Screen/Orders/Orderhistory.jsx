import { StyleSheet,ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React,{useEffect, useState} from 'react'
import { Button, SearchBar } from 'react-native-elements'
import Color from '../../Components/Styling Comp/Color';
import { GetAllOrders } from '../../Api/Order';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal'

const Orderhistory = ({navigation}) => {

  const [search,setSearch]=useState('');
  const [data,setData]=useState([]) 
  const [isloading,setIsLoading]=useState(true);

  useEffect(()=>{
    OrderHistoryFetch()
  },[])
  
  const OrderHistoryFetch =async()=>{
    try {
      if(data.length === 0){
        const response = await GetAllOrders();
        if(response.success){
          console.log(response.data);
          setData(response.data)
          setIsLoading(false)
        }
      }else{
        console.log("data already Fetched");
      }
     } catch (error) {
      console.log(error);
    }
  }
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDateSubmit = () => {
    // You can perform any action with the selectedDate here
    console.log('Selected Date:', selectedDate);

    // If needed, you can also close the modal
    setModalVisible(false);
  };
  const handleItemClick = (item) => {
    navigation.navigate('Report', { Data: item });
  }
  return (
    <View>
        <View style={{alignItems:"center"}}>
        <SearchBar
        placeholder="Type Here..."
        onChangeText={(value)=>setSearch(value)}
         value={search} round
    
         containerStyle={{
           backgroundColor: 'transparent', // Set your desired background color
           borderBottomColor: 'transparent', // Hide the border
           borderTopColor: 'transparent', // Hide the border
           paddingHorizontal:30,
          
         }}
         inputContainerStyle={{
           backgroundColor: Color.whitecolor, // Set your desired input background color
           borderRadius: 10, // Set your desired input border radius
           height: 50, // Set your desired input height
           width:"99%",
           shadowColor: '#000',
           shadowOffset: { width: 0, height: 2 },
           shadowOpacity: 0.5,
           shadowRadius: 2,
           elevation: 5, 
           
         }}
         inputStyle={{
           color: '#000', // Set your desired input text color
         }}
         placeholderTextColor="#999" // Set your desired placeholder text color
       />
      
      </View>
      {/* <View>
        <TouchableOpacity  onPress={()=> navigation.navigate('Report')}><Text>REPORT</Text></TouchableOpacity>
      <Button title="Open Modal" onPress={handleOpenModal} />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <DatePicker
              date={selectedDate}
              onDateChange={handleDateChange}
              mode="date"
            />
            <Button title="Submit Date" onPress={handleDateSubmit} />
            <Button title="Close Modal" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>

      <Text>{selectedDate.toDateString()}</Text>
    </View> */}
      {isloading?<ActivityIndicator  size={65} color={Color.maincolor} style={{position:"absolute", top:300,left:165}}/> :(<ScrollView style={{marginBottom:85}}>
        {data?data.map((item,index)=>(
          <TouchableOpacity style={styles.Itemview} key={item._id} onPress={()=> handleItemClick(item)}>
          <View style={styles.texttitle}>
              <Text style={styles.texttitle}>{item?item.shop?.name:""}</Text>
            </View>
            <View style={styles.Itemviews}>
              <Text  style={styles.text}>{item.date}</Text>
              <Text  style={styles.text}>₹ {item.totalprice}</Text>
            </View>
            
          </TouchableOpacity>
        )):<ActivityIndicator/>
      }
    </ScrollView>)}
    </View>
  )
}

export default Orderhistory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color:Color.Black,
    fontSize:16,
    
  },
  container: {
    backgroundColor:Color.Grey,
    justifyContent:"space-around",
  },
  Itemview:{
    // flexDirection:'row',
    // justifyContent:"space-around",
    // alignItems:'center',
    // flexWrap: 'wrap',
    height:125,
    borderColor:Color.Grey,
    margin:"1%",
    backgroundColor:Color.whitecolor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5, 
    marginHorizontal:"5%",
    borderRadius:10,

  },
  Itemviews:{
    flexDirection:'row',
    justifyContent:"space-around",
    alignItems:'center',
    flexWrap: 'wrap',
    margin:20,
  },
  Itemhead:{
    flexDirection:'row',
    justifyContent:"space-around",
    alignItems:'center',
    height:90,
    borderColor:Color.Grey,
    margin:"1%",
    backgroundColor:Color.whitecolor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5, 
    marginHorizontal:"5%",
    borderRadius:10,
  },
  texthead:{
    fontWeight:"900",
    color:Color.Black
  },
  texttitle:{
    textAlign:"center",
    fontSize:25,
    fontWeight:"900",
    color:Color.Black
  },
})