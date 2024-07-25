import { View, FlatList, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState, useContext } from "react";
import PlaceItem from "./PlaceItem";
import { getFirestore } from "firebase/firestore";
import { app } from "../../Utils/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';

export default function PlaceListView({ placeList }) {
  const { selectedMarker } = useContext(SelectMarkerContext);
  useEffect(() => {
    selectedMarker && scrollToIndex(selectedMarker)
  }, [selectedMarker])

  const [favlist, setFavlist] = useState([])

  useEffect(() => {
    user && getFav()
  }, [user])
  const db = getFirestore(app);
  const { user } = useUser()
  const getFav = async () => {
    setFavlist([])
    const q = query(collection(db, "ev-fav-place"), where("email", "==", user?.primaryEmailAddress?.emailAddress));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFavlist(favlist => [...favlist, doc.data()]);

    });
  };

  const isfav = (place) => {
    const result = favlist.find(item => item.place.id == place.id);
    return result ? true : false;
  }

  useEffect(() => {
    scrollToIndex(4);
  }, []);
  const flatListRef = useRef(null);
  const getItemLayout = (_, index) => ({
    length: Dimensions.get("window").width,
    offset: Dimensions.get("window").width * index,
    index,
  });
  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  return (
    placeList && (
      <View>
        <FlatList
          getItemLayout={getItemLayout}
          horizontal={true}
          ref={flatListRef}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={placeList}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.container}>
              <PlaceItem place={item} isfav={isfav(item)} markedFav={() => getFav()} />
            </View>
          )}
        />
      </View>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
