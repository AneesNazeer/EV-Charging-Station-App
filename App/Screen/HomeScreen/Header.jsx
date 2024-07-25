import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

export default function Header() {
  const { user } = useUser()
  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.imageUrl }}
        style={{ width: 45, height: 45, borderRadius: 99 }} />
      <Image style={styles.logoImage} source={require('./../../../assets/Images/logo-white.png')} />
      <View style={styles.AntDesign} >
        <AntDesign name="filter" size={26} color={Colors.Green} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logoImage: {
    width: 160,
    height: 45,
    objectFit: 'cover',
    borderRadius: 99,

  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  AntDesign: {
    opacity: 0
  }
})