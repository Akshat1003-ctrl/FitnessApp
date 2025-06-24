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
        tabBarStyle: {
          position: 'absolute',
          // Adjusted values to better match the screenshot
          bottom: 10,
          left: 20,
          right: 20,
          backgroundColor: theme.colors.surface,
          borderRadius: 0, // A less dramatic corner radius
          height: 70, // A bit taller
          // Shadow properties
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
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
