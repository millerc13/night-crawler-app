import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";
import { KorolJoystick } from "korol-joystick";
import { Joystick } from "react-joystick-component";
import { Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";
export default function ControlScreen() {
  function forward() {
    firebase.database().ref("users/command").set({
      velx: 1
    });
    setTimeout(() => {
      firebase.database().ref("users/command").set({
        velx: 0
      });
    }, 3000);
  }

  function backwards() {
    firebase.database().ref("users/command").set({
      velx: -1
    });
    setTimeout(() => {
      firebase.database().ref("users/command").set({
        rotate: 0
      });
    }, 3000);
  }

  function left() {
    firebase.database().ref("users/command").set({
      rotate: "left"
    });
    setTimeout(() => {
      firebase.database().ref("users/command").set({
        velx: 0
      });
    }, 3000);
  }

  function right() {
    firebase.database().ref("users/command").set({
      velx: "right"
    });
    setTimeout(() => {
      firebase.database().ref("users/command").set({
        velx: 0
      });
    }, 1000);
  }

  return (
    <View className="flex-1 justify-center ">
      <View className="flex-row justify-center p-5">
        <TouchableOpacity
          onPress={forward}
          onPressOut={() => {
            firebase.database().ref("users/command").set({
              velx: 0
            });
          }}
          className="p-5 bg-blue-300 rounded-2xl"
        >
          <Text>Forward</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center">
        <View className="flex-row justify-center p-5">
          <TouchableOpacity
            onPress={left}
            onPressOut={() => {
              firebase.database().ref("users/command").set({
                velx: 0
              });
            }}
            className="p-5 bg-blue-300 rounded-2xl"
          >
            <Text>Left</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <View className="flex-row justify-center p-5">
            <TouchableOpacity
              onPress={right}
              onPressOut={() => {
                firebase.database().ref("users/command").set({
                  velx: 0
                });
              }}
              className="p-5 bg-blue-300 rounded-2xl"
            >
              <Text>Right</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-row justify-center p-5">
        <TouchableOpacity
          onPress={backwards}
          onPressOut={() => {
            firebase.database().ref("users/command").set({
              velx: 0
            });
          }}
          className="p-5 bg-blue-300 rounded-2xl"
        >
          <Text>Backward</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
