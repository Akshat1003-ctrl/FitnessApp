import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import { Text, View, useColorScheme, StyleSheet, Button } from 'react-native';

// Define the type for the stack navigator's params to get type safety
type WorkoutStackParamList = {
  WorkoutsList: undefined; // No params expected for the list screen
  StartWorkout: undefined; // No params expected for the start workout screen
};

// --- Placeholder Screens ---
// These are simple components to represent the real screens you will build.

const WorkoutsListScreen = () => {
  // Use the defined type with the useNavigation hook
  const navigation = useNavigation<NavigationProp<WorkoutStackParamList>>();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={[
        styles.placeholderContainer,
        { backgroundColor: isDarkMode ? '#1C1C1E' : '#F2F2F7' },
      ]}
    >
      <Text
        style={[
          styles.placeholderText,
          { color: isDarkMode ? '#FFF' : '#000' },
        ]}
      >
        Your Past Workouts
      </Text>
      <Button
        title="Start a New Workout"
        onPress={() => navigation.navigate('StartWorkout')}
      />
    </View>
  );
};

const StartWorkoutScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={[
        styles.placeholderContainer,
        { backgroundColor: isDarkMode ? '#1C1C1E' : '#F2F2F7' },
      ]}
    >
      <Text
        style={[
          styles.placeholderText,
          { color: isDarkMode ? '#FFF' : '#000' },
        ]}
      >
        New Workout Screen
      </Text>
    </View>
  );
};

const GenericTabScreen = ({ route }: { route: any }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={[
        styles.placeholderContainer,
        { backgroundColor: isDarkMode ? '#1C1C1E' : '#F2F2F7' },
      ]}
    >
      <Text
        style={[
          styles.placeholderText,
          { color: isDarkMode ? '#FFF' : '#000' },
        ]}
      >
        {route.name}
      </Text>
    </View>
  );
};

// --- Stack Navigator for the Workouts Tab ---
const Stack = createNativeStackNavigator<WorkoutStackParamList>();

function WorkoutStackNavigator() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
        },
        headerTitleStyle: {
          color: isDarkMode ? '#FFFFFF' : '#000000',
        },
        headerTintColor: isDarkMode ? '#0A84FF' : '#007AFF', // Color for the back button arrow
      }}
    >
      <Stack.Screen
        name="WorkoutsList"
        component={WorkoutsListScreen}
        options={{ title: 'Workouts' }}
      />
      <Stack.Screen
        name="StartWorkout"
        component={StartWorkoutScreen}
        options={{ title: 'New Workout' }}
      />
    </Stack.Navigator>
  );
}

// --- Main Tab Navigator ---
const Tab = createBottomTabNavigator();

function AppTabs() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Set to false because the Stack Navigator has its own header.
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
          borderTopColor: isDarkMode ? '#3A3A3C' : '#D1D1D6',
        },
        tabBarActiveTintColor: '#0A84FF',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Dashboard" component={GenericTabScreen} />
      <Tab.Screen name="Workouts" component={WorkoutStackNavigator} />
      <Tab.Screen name="Nutrition" component={GenericTabScreen} />
      <Tab.Screen name="Profile" component={GenericTabScreen} />
    </Tab.Navigator>
  );
}

// --- Main Export ---
// This is what your root App.tsx will import
export default function NavigationWrapper() {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
