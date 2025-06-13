// src/navigation/AppNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';
import { Button as PaperButton, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Define the type for the stack navigator's params
type WorkoutStackParamList = {
  WorkoutsList: undefined;
  StartWorkout: undefined;
};

// Define the type for the tabBarIcon props
type TabBarIconProps = {
  color: string;
  size: number;
};

// --- Placeholder Screens ---

const WorkoutsListScreen = () => {
  const navigation = useNavigation<NavigationProp<WorkoutStackParamList>>();
  const theme = useTheme();

  // Memoize the dynamic styles to prevent re-creation on each render
  const viewStyle = React.useMemo(
    () => ({
      backgroundColor: theme.colors.background,
    }),
    [theme.colors.background],
  );

  const textStyle = React.useMemo(
    () => ({
      color: theme.colors.onBackground,
    }),
    [theme.colors.onBackground],
  );

  return (
    <View style={[styles.placeholderContainer, viewStyle]}>
      <Text style={[styles.placeholderText, textStyle]}>
        Your Past Workouts
      </Text>
      <PaperButton
        mode="contained"
        onPress={() => navigation.navigate('StartWorkout')}
        icon="plus-circle"
      >
        Start a New Workout
      </PaperButton>
    </View>
  );
};

const StartWorkoutScreen = () => {
  const theme = useTheme();

  const viewStyle = React.useMemo(
    () => ({
      backgroundColor: theme.colors.background,
    }),
    [theme.colors.background],
  );

  const textStyle = React.useMemo(
    () => ({
      color: theme.colors.onBackground,
    }),
    [theme.colors.onBackground],
  );

  return (
    <View style={[styles.placeholderContainer, viewStyle]}>
      <Text style={[styles.placeholderText, textStyle]}>
        New Workout Screen
      </Text>
    </View>
  );
};

const GenericTabScreen = ({ route }: { route: any }) => {
  const theme = useTheme();

  const viewStyle = React.useMemo(
    () => ({
      backgroundColor: theme.colors.background,
    }),
    [theme.colors.background],
  );

  const textStyle = React.useMemo(
    () => ({
      color: theme.colors.onBackground,
    }),
    [theme.colors.onBackground],
  );

  return (
    <View style={[styles.placeholderContainer, viewStyle]}>
      <Text style={[styles.placeholderText, textStyle]}>{route.name}</Text>
    </View>
  );
};

// --- Stack Navigator for the Workouts Tab ---
const Stack = createNativeStackNavigator<WorkoutStackParamList>();

function WorkoutStackNavigator() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTitleStyle: {
          color: theme.colors.onSurface,
        },
        headerTintColor: theme.colors.primary,
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
  const theme = useTheme();

  // Memoize the icon render functions so they are stable
  const renderDashboardIcon = React.useCallback(
    ({ color, size }: TabBarIconProps) => (
      <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
    ),
    [],
  );

  const renderWorkoutsIcon = React.useCallback(
    ({ color, size }: TabBarIconProps) => (
      <MaterialCommunityIcons name="dumbbell" color={color} size={size} />
    ),
    [],
  );

  const renderNutritionIcon = React.useCallback(
    ({ color, size }: TabBarIconProps) => (
      <MaterialCommunityIcons name="food-apple" color={color} size={size} />
    ),
    [],
  );

  const renderProfileIcon = React.useCallback(
    ({ color, size }: TabBarIconProps) => (
      <MaterialCommunityIcons name="account-circle" color={color} size={size} />
    ),
    [],
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={GenericTabScreen}
        options={{
          tabBarIcon: renderDashboardIcon,
        }}
      />
      <Tab.Screen
        name="Workouts"
        component={WorkoutStackNavigator}
        options={{
          tabBarIcon: renderWorkoutsIcon,
        }}
      />
      <Tab.Screen
        name="Nutrition"
        component={GenericTabScreen}
        options={{
          tabBarIcon: renderNutritionIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={GenericTabScreen}
        options={{
          tabBarIcon: renderProfileIcon,
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
