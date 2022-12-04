import { Video } from "expo-av";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { auth } from "../firebase";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function TabOneScreen() {
  const db = firebase.firestore();
  const video = React.useRef(null);
  const [videoUrls, setVideoUrls] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    storageRef
      .listAll()
      .then(function (result) {
        result.items.forEach(function (videoRef) {
          // And finally display them
          displayVideo(videoRef);
        });
      })
      .catch(function (error) {
        // Handle any errors
      });
    setVideoUrls([]);
  }, []);

  const currentUser = firebase.auth().currentUser.uid;
  const path_on_cloud = "users/" + currentUser + "/videos/";
  var storageRef = firebase.storage().ref(path_on_cloud);

  function displayVideo(videoRef) {
    videoRef
      .getDownloadURL()
      .then(function (url) {
        if (!videoUrls.includes(url) && url.indexOf(".mp4") >= 0) {
          // Only adds video to state if not already in state
          setVideoUrls((videoUrls) => [...videoUrls, url]);
        }

        console.log(url);
      })
      .catch(function (error) {
        // Handle any errors
      });
  }

  return (
    <ScrollView>
      <View className="bg-neutral-50 dark:bg-neutral-900 web:bg-neutral-900 flex-1 justify-center">
        <View className="flex-1  items-center">
          {videoUrls.map((url) => {
            return (
              <Video
                key={url}
                style={styles.video}
                source={{
                  uri: url
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
              />
            );
          })}
        </View>
      </View>
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        className="bg-neutral-50 dark:bg-neutral-900 text-center text-black dark:text-white"
      />
      <Button
        onPress={onRefresh}
        title="Refresh"
        className="ios:hidden p-5 bg-blue-300 dark:bg-purple-600  rounded-2xl android: mb-10 android:flex"
      ></Button>
      <Text className="android:hidden p-20 bg-neutral-50 dark:bg-neutral-900 text-center text-black dark:text-white">
        Swipe down to refresh!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16
  },
  video: {
    height: 200,
    width: "90%",
    resizeMode: "contain",
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 40
  },

  TextStyle: {
    fontSize: 25,
    textAlign: "center"
  }
});
