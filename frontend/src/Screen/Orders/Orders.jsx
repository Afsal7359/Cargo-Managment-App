import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import QRScanner from '../Dashboard/QRScanner'

const Orders = () => {
  return (
    <SafeAreaView>
      <QRScanner/>
    </SafeAreaView>
  )
}

export default Orders

const styles = StyleSheet.create({})