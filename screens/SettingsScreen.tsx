// ./screens/Contact.js

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import { NativeWindStyleSheet, useColorScheme } from "nativewind";
import React from "react";
import { Button, Image, Text, View } from "react-native";
import { auth } from "../firebase";
const Contact = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigation = useNavigation();

  function handleSignOut() {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          // console.log("Signed Out");
          navigation.replace("Login");
        },
        function (error) {
          console.error("Sign Out Error", error);
        }
      );
  }

  return (
    <View className="flex-1 justify-start bg-neutral-50  dark:bg-neutral-900">
      <View tw="flex-row justify-between p-2 align-center">
        <Image
          source={{ uri: "https://i.ibb.co/CtB4fth/profile-cj.png" }}
          style={{ width: 50, height: 50, borderRadius: 30 }}
        />
        <Text tw="flex-1 text-start ml-3 font-bold mt-2 text-lg dark:text-white ">
          CJ Miller
        </Text>
      </View>
      <View tw="flex-row justify-between p-2 align-center ">
        <Text tw="flex-1 text-start ml-3 font-bold mt-2 text-lg dark:text-white">
          Toggle Dark Mode
        </Text>
        <Feather
          name={`${colorScheme === "dark" ? "moon" : "sun"}`}
          size={30}
          color={`${colorScheme === "dark" ? "#e5e5e5" : "#171717"}`}
          onPress={toggleColorScheme}
        />
      </View>
      <Button onPress={() => handleSignOut()} title="Sign out" />
    </View>
  );
};
NativeWindStyleSheet.setOutput({
  web: "css",
  default: "native"
});
export default Contact;
