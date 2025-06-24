// src/react-native-paper.d.ts

import 'react-native-paper';

declare module 'react-native-paper' {
  // This extends the MD3Colors interface to include your custom colors.
  export interface MD3Colors {
    // Add any custom color names you want here
    cardBackground: string;
    ctaButton: string;
    secondaryText: string;
    notificationGreen: string;
    secondaryText: string;
  }
}
