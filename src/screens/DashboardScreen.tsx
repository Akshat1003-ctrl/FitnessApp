import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';

function DashboardScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const dynamicStyles = {
    backgroundColor: isDarkMode ? '#1C1C1E' : '#F2F2F7',
    textColor: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: dynamicStyles.backgroundColor },
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={dynamicStyles.backgroundColor}
      />
      <Text style={[styles.text, dynamicStyles.textColor]}>
        Fitness App Dashboard
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default DashboardScreen;
