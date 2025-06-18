// src/config/theme.ts

import {
  MD3LightTheme as DefaultLightTheme,
  MD3DarkTheme as DefaultDarkTheme,
} from 'react-native-paper';

// Simplified color palette
const themeColors = {
  primary: '#BBF246', // Lime Green
  darkCharcoal: '#192126',
  secondaryText: '#8B8F92',
};

export const lightTheme = {
  ...DefaultLightTheme,
  roundness: 20, // More rounded corners to match the design
  colors: {
    ...DefaultLightTheme.colors,
    primary: themeColors.primary,
    onPrimary: themeColors.darkCharcoal,
    background: '#F7F7F7', // Off-white background from the design
    surface: '#FFFFFF', // Cards are pure white
    onSurface: themeColors.darkCharcoal,
    onBackground: themeColors.darkCharcoal,
    onSurfaceVariant: themeColors.secondaryText,
    // All other custom colors have been removed
  },
};

export const darkTheme = {
  ...DefaultDarkTheme,
  roundness: 20,
  colors: {
    ...DefaultDarkTheme.colors,
    primary: themeColors.primary,
    onPrimary: themeColors.darkCharcoal,
    background: '#121212', // A standard dark background
    surface: themeColors.darkCharcoal,
    onSurface: '#FFFFFF',
    onBackground: '#FFFFFF',
    onSurfaceVariant: themeColors.secondaryText,
    // All other custom colors have been removed
  },
};
