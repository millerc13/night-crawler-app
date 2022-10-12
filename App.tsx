import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useReducer } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets
} from "react-native-safe-area-context";
// svg
import Svg, { Path } from "react-native-svg";
// reanimated
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming
} from "react-native-reanimated";
// lottie
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Lottie from "lottie-react-native";
import { useColorScheme } from "nativewind";
import HomeScreen from "./screens/HomeScreen";

import { useNavigation } from "@react-navigation/core";
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from "react-native";
import { auth } from "./firebase";
import ControlScreen from "./screens/ControlScreen";
import LoginScreen from "./screens/LoginScreen";
import { default as SettingsScreen } from "./screens/SettingsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{
            headerTintColor: `${
              colorScheme === "dark" ? "#ffffff" : "#ffffff"
            }`,
            headerStyle: {
              backgroundColor: `${
                colorScheme === "dark" ? "#9333ea" : "#2563eb"
              }`
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeTabs() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Tab.Navigator tabBar={(props) => <AnimatedTabBar {...props} />}>
      <Tab.Screen
        name="Chat Screen"
        options={{
          headerShown: false,
          // @ts-ignore
          tabBarIcon: ({ ref }) => (
            <Lottie
              ref={ref}
              loop={false}
              source={require("./assets/lottie/chat.icon.json")}
              style={styles.icon}
            />
          )
        }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Controls Screen"
        options={{
          headerShown: false,
          // @ts-ignore
          tabBarIcon: ({ ref }) => (
            <Lottie
              ref={ref}
              loop={false}
              source={require("./assets/lottie/controls.icon.json")}
              style={styles.iconControls}
            />
          )
        }}
        component={ControlScreen}
      />

      <Tab.Screen
        name="Settings"
        options={{
          headerTintColor: `${colorScheme === "dark" ? "#9ca3af" : "#000000"}`,
          headerStyle: {
            backgroundColor: `${colorScheme === "dark" ? "#171717" : "#d1d5db"}`
          },

          // @ts-ignore
          tabBarIcon: ({ ref }) => (
            <Lottie
              ref={ref}
              loop={false}
              source={require("./assets/lottie/settings.icon.json")}
              style={styles.icon}
            />
          )
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}

const AnimatedTabBar = ({
  state: { index: activeIndex, routes },
  navigation,
  descriptors
}: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();

  const reducer = (state: any, action: { x: number; index: number }) => {
    // Add the new value to the state
    return [...state, { x: action.x, index: action.index }];
  };

  const [layout, dispatch] = useReducer(reducer, []);
  // console.log(layout);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({ x: event.nativeEvent.layout.x, index });
  };

  const xOffset = useDerivedValue(() => {
    // Can't use the layout values because our components haven't finished rendering yet
    if (layout.length !== routes.length) return 0;
    return [...layout].find(({ index }) => index === activeIndex)!.x - 25;
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // smooth transition offset of X
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }]
    };
  });
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View
      className="bg-blue-600 dark:bg-purple-800"
      style={{ paddingBottom: bottom }}
    >
      <AnimatedSvg
        width={110}
        height={60}
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyles]}
      >
        <Path
          fill={`${colorScheme === "dark" ? "#1c1917" : "#fafafa"}`}
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={(e) => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};

type TabBarComponentProps = {
  active?: boolean;
  options: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
};

const TabBarComponent = ({
  active,
  options,
  onLayout,
  onPress
}: TabBarComponentProps) => {
  // lottie animation
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (active && ref?.current) {
      // @ts-ignore
      ref.current.play();
    }
  }, [active]);

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 250 })
        }
      ]
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, { duration: 250 })
    };
  });

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View
        style={[styles.iconContainer, animatedIconContainerStyles]}
      >
        {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  activeBackground: {
    position: "absolute"
  },
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  component: {
    height: 60,
    width: 60,
    marginTop: -5
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: "white"
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    height: 36,
    width: 36
  },
  iconControls: {
    height: 42,
    width: 42
  }
});
