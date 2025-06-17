import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import the simple Home Screen
import HomeScreen from '../screens/HomeScreen';

// --- Type Definitions ---
type WorkoutStackParamList = {
  WorkoutsList: undefined;
  StartWorkout: undefined;
};

type TabBarIconProps = {
  color: string;
  size: number;
};

// --- Helper for rendering icons ---
const renderIcon =
  (name: string) =>
  ({ color, size }: TabBarIconProps) =>
    <MaterialCommunityIcons name={name} color={color} size={size} />;

// --- Placeholder & Reusable Components ---

const WorkoutsListScreen = () => {
  const navigation = useNavigation<NavigationProp<WorkoutStackParamList>>();
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.text, { color: theme.colors.onBackground }]}>
        Your Past Workouts
      </Text>
      <Button
        title="Start a New Workout"
        onPress={() => navigation.navigate('StartWorkout')}
        color={theme.colors.primary}
      />
    </View>
  );
};

const StartWorkoutScreen = () => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.text, { color: theme.colors.onBackground }]}>
        New Workout Screen
      </Text>
    </View>
  );
};

const GenericTabScreen = ({ route }: { route: any }) => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.text, { color: theme.colors.onBackground }]}>
        {route.name}
      </Text>
    </View>
  );
};

const WorkoutStackNavigator = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTitleStyle: { color: theme.colors.onSurface },
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
};

// --- Navigators ---
const Stack = createNativeStackNavigator<WorkoutStackParamList>();
const Tab = createBottomTabNavigator();

function AppTabs() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: 'Home',
          tabBarIcon: renderIcon('view-dashboard'),
        }}
      />
      <Tab.Screen
        name="Workouts"
        component={WorkoutStackNavigator}
        options={{ tabBarIcon: renderIcon('dumbbell') }}
      />
      <Tab.Screen
        name="Nutrition"
        component={GenericTabScreen}
        options={{ tabBarIcon: renderIcon('food-apple') }}
      />
      <Tab.Screen
        name="Profile"
        component={GenericTabScreen}
        options={{ tabBarIcon: renderIcon('account-circle-outline') }}
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
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
});
