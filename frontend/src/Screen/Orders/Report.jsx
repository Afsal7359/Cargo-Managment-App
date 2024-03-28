import React, { useRef, useState } from 'react';
import { View, Button, Text, ToastAndroid, StyleSheet ,ScrollView, TouchableOpacity} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { Toast } from 'toastify-react-native';
import Color from '../../Components/Styling Comp/Color';
import RNFS from 'react-native-fs';
// import Pdf from 'react-native-pdf';

const Report = ({ route }) => {
  const data = route && route.params ? route.params.Data : null;

  console.log(data, "Data DDDDDDDDDDDD");
  const [pdfPath, setPdfPath] = useState(null);

  const generateTableRows = (cartItems) => {
    return cartItems.map((item, index) => `
    <tr key=${index + 1} style="border-right :1px solid; text-align: center">
    <td><div style="padding: 10px; border :1px solid">${index + 1}</div></td>
    <td><div style="padding: 10px; border :1px solid">${item.name}</div></td>
    <td><div style="padding: 10px; border :1px solid">${item.price}</div></td>
    <td><div style="padding: 10px; border :1px solid">${item.quantity}</div></td>
    <td><div style="padding: 10px; border :1px solid">${item.price * item.quantity}</div></td>
  </tr>
    `).join('');
  };

  const captureAndGeneratePDF = async () => {
    try {
      
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '-');
  console.log(formattedDate,"dddddteeeee");
      // Generate HTML content with the captured image
      const htmlContent = `<html> <head>
      <style>
        
  
        tr {
          margin-bottom: 40px;
        }
      </style>
    </head><body style="margin:25px">
      <div style="border-bottom: 3px solid black; background-color:#FFC300">
      <h3 style='text-align:center; padding-top:70px'>${data.shop.name}  ${data.shop.address}</h3>
      <h3 style='text-align:center'>${data.shop.area} ${data.shop.district}</h3>
      <h3 style='text-align:center'>${data.shop.pincode} ph:${data.shop.phone}</h3>
      <h3 style='text-align:right;margin-right:25px;'> Date : ${data.date}</h3>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-top:100px;">
          <thead>
              <tr style="text-align: center;border-right :1px solid">
                  <th><div style="padding: 10px; border :1px solid"> NO</div></th>
                  <th><div style="padding: 10px; border :1px solid">Product Name</div></th>
                  <th><div style="padding: 10px; border :1px solid">Price</div></th>
                  <th><div style="padding: 10px; border :1px solid">Quantity</div></th>
                  <th><div style="padding: 10px; border :1px solid">Total</div></th>
              </tr>
          </thead>
          <tbody>
          ${generateTableRows(data.cartitem)}
          </tbody>
      </table>
      <h3 style="text-align:right;margin-top:50px; margin-right:45px;"> Total Amount : ${data.totalprice}</h3>
  </body></html>`;
  

      const options = {
        html: htmlContent,
        fileName: `${data.shop.name}_${formattedDate}`,
        directory: 'Documents',
      };
   
      const pdfFilePath = await RNHTMLtoPDF.convert(options);

      // Check if filePath is defined before moving
      if (pdfFilePath.filePath) {
        // Create the target directory if it doesn't exist
        const targetDirectory = `${RNFS.ExternalStorageDirectoryPath}/Download/MF360`;
        await RNFS.mkdir(targetDirectory);
  
        // Move the file to the target directory
        const destinationPath = `${targetDirectory}/${options.fileName}.pdf`;
        await RNFS.moveFile(pdfFilePath.filePath, destinationPath);
        Toast.success("PDF Downloaded Successfully")
        console.log(`PDF moved to: ${destinationPath}`);
      } else {
        console.error('PDF file path is undefined.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <ScrollView style={styles.container}  showsVerticalScrollIndicator={false}>
      <View style={styles.headview}>
        <Text style={styles.texthead}>{data.shop.name}</Text>
        <Text style={styles.texthead}>{data.shop.address}</Text>
        <Text style={styles.texthead}>{data.shop.pincode}   ph: {data.shop.phone}</Text>
      </View>
      <View style={styles.tableheadView}>
        <Text style={[styles.tableheadText, { flex: 0.5 }]}>N.O</Text>
        <Text style={[styles.tableheadText, { flex: 2 }]}>Product Name</Text>
        <Text style={[styles.tableheadText, { flex: 1 }]}>Price</Text>
        <Text style={[styles.tableheadText, { flex: 1 }]}>Q/t</Text>
        <Text style={[styles.tableheadText, { flex: 1 }]}>Total</Text>
      </View>

      {data ? data.cartitem.map((item, index) => (
        <View style={styles.tableRow} key={index + 1}>
          <Text style={[styles.tableCell, { flex: 0.5 }]}>{index + 1}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{item.name.substring(0, 10)}...</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{item.price}</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{item.quantity}</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{item.price * item.quantity}</Text>
        </View>
      ))
        : "No Data Available"}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.downloadbtn} onPress={captureAndGeneratePDF}>
            <Text style={{color:Color.Black}}>Download PDF</Text>
          </TouchableOpacity>
          <Text style={styles.totaltext}>Total : {data.totalprice}</Text>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  headview: {
    backgroundColor: Color.maincolor,
    padding: 20,
  },
  texthead: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight:"bold"
  },
  tableheadView: {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    borderTopWidth:1,
    paddingVertical: 15,
    borderColor: 'black',
  },
  tableheadText: {
    color: 'black',
    textAlign: 'center',
    fontWeight:"bold"
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: 15,
  },
  tableCell: {
    textAlign: 'center',
    flex: 1,
    color:Color.Black
  },
  footer:{
    marginVertical:30,
    flexDirection:"row",
    justifyContent:"space-between"

  },
  totaltext:{
  fontSize:20,
  color:Color.Black,
  fontWeight:"400"

  },
  downloadbtn:{
    backgroundColor:Color.maincolor,
    borderRadius:15,
    width:125,
    height:45,
    justifyContent:'center',
    alignItems:"center"
  }
}); 
export default Report;
