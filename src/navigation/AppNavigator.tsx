// src/navigation/AppNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';

// Import your screens
import HomeScreen from '../screens/HomeScreen';
import NutritionScreen from '../screens/NutritionScreen';
import ProfileScreen from '../screens/ProfileScreen'; // Import the new screen

// --- Reusable Components ---
// Placeholder for your workouts screen
const WorkoutScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Workouts</Text>
  </View>
);

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

// Helper for rendering PNG icons
const renderPngIcon =
  (source: ImageSourcePropType) =>
  ({ color, size }: TabBarIconProps) =>
    (
      <Image
        source={source}
        style={{
          width: size,
          height: size,
          tintColor: color, // Applies active/inactive color
        }}
        resizeMode="contain"
      />
    );

const Tab = createBottomTabNavigator();

function AppTabs() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary, // Your orange color
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: true,
        // --- UPDATED tabBarStyle for a fixed bottom bar ---
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          height: 80, // A bit taller
          borderTopWidth: 0, // Removes the top border line
          elevation: 10, // Keeps a subtle shadow on Android
          shadowOpacity: 0.1, // Keeps a subtle shadow on iOS
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Overview" // UPDATED
        component={HomeScreen}
        options={{
          tabBarIcon: renderPngIcon(require('../assets/images/home.png')),
        }}
      />
      <Tab.Screen
        name="Workout" // Name is "Workout" in screenshot
        component={WorkoutScreen}
        options={{
          tabBarIcon: renderPngIcon(require('../assets/images/workout.png')),
        }}
      />
      <Tab.Screen
        name="Nutrition"
        component={NutritionScreen}
        options={{
          tabBarIcon: renderPngIcon(require('../assets/images/nutrition.png')), // Assumes this is the grid icon
        }}
      />
      <Tab.Screen
        name="Profile" // UPDATED
        component={ProfileScreen} // UPDATED
        options={{
          tabBarIcon: renderPngIcon(require('../assets/images/account.png')), // UPDATED
        }}
      />
    </Tab.Navigator>
  );
}

export default function NavigationWrapper() {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { fontSize: 24 },
});
