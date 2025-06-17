// App.tsx

import React from 'react';
import NavigationWrapper from './src/navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <NavigationWrapper />
    </PaperProvider>
  );
}

export default App;
