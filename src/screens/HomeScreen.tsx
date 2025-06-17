import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

// --- Helper Function for Dynamic Greeting ---
const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
};

const HomeScreen = () => {
  const theme = useTheme();
  // We'll use a hardcoded name for now. Later, this will come from Firebase Auth.
  const userName = 'Akshat';

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.container}>
        <Text
          variant="headlineLarge"
          style={{ color: theme.colors.onBackground }}
        >
          {getGreeting()},
        </Text>
        <Text
          variant="headlineLarge"
          style={[styles.userName, { color: theme.colors.onBackground }]}
        >
          {userName}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  userName: {
    fontWeight: 'bold',
  },
});

export default HomeScreen;
