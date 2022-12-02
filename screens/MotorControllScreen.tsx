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
  function forward() {
    firebase.database().ref("users/command/motor").set({
      direction: "forward"
    });
    setTimeout(() => {
      firebase.database().ref("users/command/motor").set({
        direction: "stop"
      });
    }, 5000);
  }

  function backwards() {
    firebase.database().ref("users/command/motor").set({
      direction: "backward"
    });
    setTimeout(() => {
      firebase.database().ref("users/command/motor").set({
        direction: "stop"
      });
    }, 3000);
  }

  function left() {
    firebase.database().ref("users/command/motor").set({
      direction: "left"
    });
    setTimeout(() => {
      firebase.database().ref("users/command/motor").set({
        direction: "stop"
      });
    }, 3000);
  }

  function right() {
    firebase.database().ref("users/command/motor").set({
      direction: "right"
    });
    setTimeout(() => {
      firebase.database().ref("users/command/motor").set({
        direction: "stop"
      });
    }, 3000);
  }

  function test() {
    firebase.database().ref("users/command/motor").set({
      direction: "test"
    });
    setTimeout(() => {
      firebase.database().ref("users/command/motor").set({
        direction: "test"
      });
    }, 10000);
  }

  return (
    <View className="flex-1 justify-center bg-white bg">
      <View className="flex-row justify-center p-5">
        <TouchableOpacity
          onPress={forward}
          onPressOut={() => {
            firebase.database().ref("users/command/motor").set({
              direction: "forward"
            });
          }}
          className="p-5 bg-blue-300 dark:bg-purple-600 rounded-2xl"
        >
          <Ionicons name="arrow-up" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-evenly">
        <View className="flex-row justify-center p-5">
          <TouchableOpacity
            onPress={left}
            onPressOut={() => {
              firebase.database().ref("users/command/motor").set({
                direction: "left"
              });
            }}
            className="p-5 bg-blue-300  dark:bg-purple-600 rounded-2xl"
          >
            <Ionicons name="arrow-back" size={32} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <View className="flex-row justify-center p-5">
            <TouchableOpacity
              onPress={right}
              onPressOut={() => {
                firebase.database().ref("users/command/motor").set({
                  direction: "right"
                });
              }}
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
          onPressOut={() => {
            firebase.database().ref("users/command/motor").set({
              direction: "backwards"
            });
          }}
          className="p-5 bg-blue-300 dark:bg-purple-600 rounded-2xl"
        >
          <Ionicons name="arrow-down" size={32} color="black" />
        </TouchableOpacity>
      </View>
      {/* <Button
        title="Test"
        onPress={test}
        onPressOut={() => {
          firebase.database().ref("users/command/motor").set({
            direction: "test"
          });
        }}
      ></Button> */}
      <View className="flex-row justify-center p-5">
        <TouchableOpacity
          onPress={backwards}
          onPressOut={() => {
            firebase.database().ref("users/command/motor").set({
              direction: "backwards"
            });
          }}
          className="p-5 bg-blue-300 dark:bg-purple-600 rounded-2xl"
        >
          <Ionicons name="ios-arrow-down" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
