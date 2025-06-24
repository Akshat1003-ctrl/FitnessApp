// App.tsx
import React from 'react';
import { useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import NavigationWrapper from './src/navigation/AppNavigator';
import { darkTheme, lightTheme } from './src/config/theme';

const App = () => {
  // Use the device's color scheme (light/dark)
  const colorScheme = useColorScheme();

  // Select the theme based on the color scheme
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    // The PaperProvider provides the theme to all components in the app
    <PaperProvider theme={theme}>
      {/* The NavigationWrapper handles all screen navigation */}
      <NavigationWrapper />
    </PaperProvider>
  );
};

export default App;
