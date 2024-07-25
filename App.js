import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import LoginScreen from "./App/Screen/LoginScreen/LoginScreen.jsx";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./App/Navigations/TabNaviagtion.jsx";
import * as Location from "expo-location";
import { UserLocationContext } from "./App/Context/UserLocationContext.js";
import GlobalApi from "./App/Utils/GlobalApi.js";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Raleway-Regular": require("./assets/Fonts/Raleway-Regular.ttf"),
    "Raleway-SemiBold": require("./assets/Fonts/Raleway-SemiBold.ttf"),
    "Raleway-Bold": require("./assets/Fonts/Raleway-Bold.ttf"),
  });
  //Default Location
  const [location, setLocation] = useState({
    latitude: 8.919292,
    longitude: 76.659573,
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        console.log("Requesting location permissions...");
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          console.log("Permission denied");
          return;
        }

        console.log("Fetching current location...");
        let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
        if (location && location.coords) {
          setLocation(location.coords);
          console.log("Location set:", location.coords);
        } else {
          console.log(
            "No location coords available, setting default location."
          );
          setLocation({
            latitude: 8.919292,
            longitude: 76.659573,
          });
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={GlobalApi.CLERK_API_KEY}
    >
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <View style={styles.container}>
          <SignedIn>
            <NavigationContainer>
              <TabNavigation />
            </NavigationContainer>
          </SignedIn>
          <SignedOut>
            <LoginScreen />
          </SignedOut>

          <StatusBar style="light" />
        </View>
      </UserLocationContext.Provider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#011133",
    color: "#fff",
    paddingTop: 25,
  },
});
