// src/navigation/AppNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
// Import the Image component for our custom icons
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';

// Import your screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

// --- Type Definitions ---
type TabBarIconProps = {
  focused: boolean; // We can use this if we want different styles when focused
  color: string;
  size: number;
};

// --- Reusable Components ---
// Placeholder for your workouts and nutrition screens
const WorkoutScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Workouts</Text>
  </View>
);
const NutritionScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Nutrition</Text>
  </View>
);

// --- CORRECT Helper for rendering PNG icons ---
const renderPngIcon =
  (source: ImageSourcePropType) =>
  ({ focused: _focused, color, size }: TabBarIconProps) =>
    (
      <Image
        source={source}
        style={{
          width: size,
          height: size,
          tintColor: color, // This is key: it applies the active/inactive color
        }}
        resizeMode="contain"
      />
    );

// --- Main Tab Navigator ---
const Tab = createBottomTabNavigator();

function AppTabs() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 50,
          left: 30,
          right: 30,
          backgroundColor: theme.colors.surface,
          borderRadius: 60,
          height: 54,
          // --- Shadow Properties ---
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 }, // Negative height for top shadow
          shadowOpacity: 0.2, // A bit more subtle than before
          shadowRadius: 6,
          elevation: 10, // Shadow for Android
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: 'Home',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTitleStyle: { color: theme.colors.onBackground },
          tabBarIcon: renderPngIcon(require('../assets/images/home.png')),
        }}
      />
      <Tab.Screen
        name="Workouts"
        component={WorkoutScreen} // Using the placeholder for now
        options={{
          tabBarIcon: renderPngIcon(require('../assets/images/workout.png')),
        }}
      />
      <Tab.Screen
        name="Nutrition"
        component={NutritionScreen}
        options={{
          tabBarIcon: renderPngIcon(require('../assets/images/nutrition.png')),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: 'My Profile',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTitleStyle: { color: theme.colors.onBackground },
          tabBarIcon: renderPngIcon(require('../assets/images/account.png')),
        }}
      />
    </Tab.Navigator>
  );
}

// --- Main Export ---
export default function NavigationWrapper() {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
}

// Simple styles for placeholder screens
const styles = StyleSheet.create({
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { fontSize: 24 },
});
