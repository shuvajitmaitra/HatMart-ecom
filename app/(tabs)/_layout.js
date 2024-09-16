import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native"; // Import the hook to track tab focus
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <BouncyTabIcon icon="home" />,
          tabBarLabel: ({ focused }) => (
            <AnimatedTabLabel focused={focused} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => <BouncyTabIcon icon="cog" />,
          tabBarLabel: ({ focused }) => (
            <AnimatedTabLabel focused={focused} label="Settings" />
          ),
        }}
      />
    </Tabs>
  );
}

// Bouncy Tab Icon Component
function BouncyTabIcon({ icon }) {
  const scale = useSharedValue(1); // Default scale of 1 (normal size)
  const isFocused = useIsFocused(); // Check if the tab is focused

  // Bounce effect every time the tab is focused
  useEffect(() => {
    if (isFocused) {
      scale.value = withSequence(
        withSpring(1.5, {
          damping: 5,
          stiffness: 150,
        }), // First, grow to 1.5 scale
        withSpring(1, {
          damping: 5,
          stiffness: 150,
        }) // Then, return to normal size (scale 1)
      );
    }
  }, [isFocused]); // Trigger this effect every time the tab focus state changes

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <FontAwesome name={icon} size={28} color={isFocused ? "blue" : "gray"} />
    </Animated.View>
  );
}

// Animated Tab Label Component (no bounce, just color change)
function AnimatedTabLabel({ focused, label }) {
  return (
    <Text style={{ fontSize: 12, color: focused ? "blue" : "gray" }}>
      {label}
    </Text>
  );
}
