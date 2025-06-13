import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, useColorScheme, StyleSheet } from 'react-native';

// --- Placeholder Screens ---
// In a real app, these would be your screen components from the /screens folder.
// For now, we'll create simple placeholders.

const PlaceholderScreen = ({ route }: { route: any }) => {
  const isDarkMode = useColorScheme() === 'dark';

  // Define dynamic colors separately
  const viewStyle = {
    backgroundColor: isDarkMode ? '#1C1C1E' : '#F2F2F7',
  };
  const textStyle = {
    color: isDarkMode ? '#FFF' : '#000',
  };

  return (
    // Combine static styles from StyleSheet with dynamic styles
    <View style={[styles.placeholderContainer, viewStyle]}>
      <Text style={[styles.placeholderText, textStyle]}>{route.name}</Text>
    </View>
  );
};

// --- Tab Navigator Setup ---
const Tab = createBottomTabNavigator();

function AppNavigator(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true, // Show a header for each screen
        headerStyle: {
          backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
        },
        headerTitleStyle: {
          color: isDarkMode ? '#FFFFFF' : '#000000',
        },
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
          borderTopColor: isDarkMode ? '#3A3A3C' : '#D1D1D6',
        },
        tabBarActiveTintColor: '#0A84FF', // A nice blue for the active tab
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Dashboard" component={PlaceholderScreen} />
      <Tab.Screen name="Workouts" component={PlaceholderScreen} />
      <Tab.Screen name="Nutrition" component={PlaceholderScreen} />
      <Tab.Screen name="Profile" component={PlaceholderScreen} />
    </Tab.Navigator>
  );
}

// --- Main Export ---
// This component wraps the entire app in the NavigationContainer.
export default function NavigationWrapper() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

// --- Styles for Placeholder ---
const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
