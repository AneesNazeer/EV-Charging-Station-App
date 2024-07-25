import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../../hooks/WarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {

  const googleSignin = async () => {
    try {
      const { createdSessionId, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  return (
    <ImageBackground
      source={require('./../../../assets/Images/login-bg.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.loginContainer}>
        <Image style={styles.logoImage} source={require('./../../../assets/Images/logo-white.png')} />
        <View>
          <Text style={styles.heading}>Your Ultimate EV Charging Station Finder App</Text>
          <Text style={styles.subHeading}>Find EV charging station near you, plan trip and so much more in just one click</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={googleSignin}>
          <Text style={styles.btnText}>Login With Google</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  logoImage: {
    width: 200,
    height: 58,
    padding: 10
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    marginTop: 20,
  },

  heading: {
    fontFamily: 'Raleway-Bold',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    color: Colors.WHITE,
  },
  subHeading: {
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
    color: Colors.WHITE,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    padding: 15,
    width: '80%',
    marginBottom: 15,
  },
  btnText: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: 'Raleway-Regular',
    fontSize: 17,
  },
});