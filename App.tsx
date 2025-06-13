// FitnessApp/App.tsx

import React from 'react';
import { useColorScheme } from 'react-native';
import NavigationWrapper from './src/navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import { lightTheme, darkTheme } from './src/config/theme'; // Import our new themes

function App(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationWrapper />
    </PaperProvider>
  );
}

export default App;
