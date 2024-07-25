import { View, Text, Image, Button, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { useUser, useAuth } from "@clerk/clerk-expo";
import Colors from "../../Utils/Colors";
import { useNavigation } from '@react-navigation/native'


export default function ProfileScreen() {
  const { user } = useUser();
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const handleSignOut = () => {
    signOut();
  };

  return (
    <ImageBackground
      source={require('./../../../assets/Images/login-bg.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.userInfoContainer}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={styles.profileImage}
        />
        <Text style={styles.fullName}>{user?.fullName}</Text>
        <Text style={styles.email}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>
      <View style={styles.navigationButtonsRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}>Go to Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorite')} style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}>Go to Fav</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flexibleSpace} />
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flex: 1,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 70,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 10,
    color: "#FFFFFF",
  },
  email: {
    fontSize: 18,
    marginTop: 5,
    color: "#CCCCCC",
  },
  flexibleSpace: {
    flex: 1,
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  navigationButtonsRow: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
  },
  navigationButton: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  navigationButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signOutButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '50%',
    alignItems: 'center'
  },
  signOutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});