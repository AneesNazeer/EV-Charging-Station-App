import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useState, useCallback } from "react";
import Colors from "../../Utils/Colors";
import { app } from "../../Utils/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import PlaceItem from "../HomeScreen/PlaceItem";
import { useFocusEffect } from '@react-navigation/native';

export default function FavoriteScreen() {
  const [favlist, setFavlist] = useState([]);
  const [loading, setLoading] = useState(false)
  useFocusEffect(
    useCallback(() => {
      getFav();
    }, [user])
  );
  const db = getFirestore(app);
  const { user } = useUser();
  const getFav = async () => {
    setLoading(true)
    setFavlist([]);
    const q = query(
      collection(db, "ev-fav-place"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFavlist((favlist) => [...favlist, doc.data()]);
    });
    setLoading(false)
  };


  return (
    <ImageBackground
      source={require('./../../../assets/Images/login-bg.jpg')}
      style={{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      }}
    >
      <Text
        style={{ padding: 10, fontFamily: "Raleway-SemiBold", fontSize: 30, color: Colors.WHITE }}
      >
        My Favorite <Text style={{ color: Colors.PRIMARY }}>Place </Text>
      </Text>
      {loading ? (
        <View
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
          <Text style={{ fontFamily: "Raleway-SemiBold", marginTop: 5 }}>
            Loading...
          </Text>
        </View>
      ) : null}
      <View>
        {(favlist.length === 0 || !favlist) ? (
          <View
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "Raleway-SemiBold", marginTop: 5, color: Colors.WHITE }}>
              No favorite added!
            </Text>
          </View>
        ) : (
          <FlatList
            onRefresh={() => getFav()}
            refreshing={loading}
            data={favlist}
            renderItem={({ item, index }) => (
              <View key={index} style={{ marginBottom: 5 }}>
                <PlaceItem
                  place={item.place}
                  isfav={true}
                  markedFav={() => getFav()}
                />
              </View>
            )}
            keyExtractor={(item) => item.place.id.toString()}
            contentContainerStyle={{ paddingBottom: 150 }}
          />
        )}
      </View>
    </ImageBackground>
  );
}
