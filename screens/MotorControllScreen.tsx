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

export default function MotorControlScreen() {
  const time_motors = 5000;
  function forward() {
    firebase.database().ref("users/command/motor").set({
      direction: "forward"
    });
    setTimeout(() => {
      firebase.database().ref("users/command/motor").set({
        direction: "stop"
      });
    }, time_motors);
  }

  function backwards() {
    firebase.database().ref("users/command/motor").set({
      direction: "backward"
    });
    setTimeout(() => {
      firebase.database().ref("users/command/motor").set({
        direction: "stop"
      });
    }, time_motors);
  }

  function left() {
    firebase.database().ref("users/command/motor").set({
      direction: "left"
    });
    setTimeout(() => {
      firebase.database().ref("users/command/motor").set({
        direction: "stop"
      });
    }, time_motors);
  }

  function right() {
    firebase.database().ref("users/command/motor").set({
      direction: "right"
    });
    setTimeout(() => {
      firebase.database().ref("users/command/motor").set({
        direction: "stop"
      });
    }, time_motors);
  }

  function motorSpeed(speed) {
    firebase.database().ref("users/command/motor_speed").set({
      speed: speed
    });
  }

  return (
    <View className="flex-1 justify-center bg-white bg">
      <View className="flex-row justify-center p-5">
        <TouchableOpacity
          onPress={forward}
          className="p-5 bg-blue-300 dark:bg-purple-600 rounded-2xl"
        >
          <Ionicons name="arrow-up" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-evenly">
        <View className="flex-row justify-center p-5">
          <TouchableOpacity
            onPress={left}
            className="p-5 bg-blue-300  dark:bg-purple-600 rounded-2xl"
          >
            <Ionicons name="arrow-back" size={32} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <View className="flex-row justify-center p-5">
            <TouchableOpacity
              onPress={right}
              className="p-5 bg-blue-300 dark:bg-purple-600  rounded-2xl"
            >
              <Ionicons name="arrow-forward" size={32} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-row justify-center p-5">
        <TouchableOpacity
          onPress={backwards}
          className="p-5 bg-blue-300 dark:bg-purple-600 rounded-2xl"
        >
          <Ionicons name="arrow-down" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center p-5">
        <TouchableOpacity
          onPress={() => {
            motorSpeed("low");
          }}
          className="p-5 bg-blue-500 dark:bg-purple-600 rounded-2xl mr-5"
        >
          <Text>Low</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            motorSpeed("medium");
          }}
          className="p-5 bg-yellow-500 dark:bg-purple-600 rounded-2xl"
        >
          <Text>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            motorSpeed("high");
          }}
          className="p-5 bg-green-500 dark:bg-purple-600 rounded-2xl ml-5"
        >
          <Text>High</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
