import Ionicons from "@expo/vector-icons/Ionicons";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";
import { KorolJoystick } from "korol-joystick";
import { Joystick } from "react-joystick-component";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";

export default function CameraControlScreen() {
  // up
  function servoUp() {
    firebase.database().ref("users/command/servo").set({
      direction: "up"
    });
    setTimeout(() => {
      firebase.database().ref("users/command/servo").set({
        direction: "stop"
      });
    }, 3000);
  }

  function servoDown() {
    firebase.database().ref("users/command/servo").set({
      direction: "down"
    });
    setTimeout(() => {
      firebase.database().ref("users/command/servo").set({
        direction: "stop"
      });
    }, 3000);
  }

  function servoLeft() {
    firebase.database().ref("users/command/servo").set({
      direction: "left"
    });
    setTimeout(() => {
      firebase.database().ref("users/command/servo").set({
        direction: "stop"
      });
    }, 3000);
  }
  function servoRight() {
    firebase.database().ref("users/command/servo").set({
      direction: "right"
    });
    setTimeout(() => {
      firebase.database().ref("users/command/servo").set({
        direction: "stop"
      });
    }, 3000);
  }
  return (
    <View className="flex-1 justify-center bg-white bg">
      <View className="flex-row justify-center p-5">
        <TouchableOpacity
          onPress={servoUp}
          className="p-5 bg-blue-300 dark:bg-purple-600 rounded-2xl"
        >
          <Ionicons name="arrow-up" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-evenly">
        <View className="flex-row justify-center p-5">
          <TouchableOpacity
            onPress={servoLeft}
            className="p-5 bg-blue-300  dark:bg-purple-600 rounded-2xl"
          >
            <Ionicons name="arrow-back" size={32} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <View className="flex-row justify-center p-5">
            <TouchableOpacity
              onPress={servoRight}
              className="p-5 bg-blue-300 dark:bg-purple-600  rounded-2xl"
            >
              <Ionicons name="arrow-forward" size={32} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-row justify-center p-5">
        <TouchableOpacity
          onPress={servoDown}
          className="p-5 bg-blue-300 dark:bg-purple-600 rounded-2xl"
        >
          <Ionicons name="arrow-down" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
