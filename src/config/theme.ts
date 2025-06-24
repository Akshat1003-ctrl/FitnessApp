// src/config/theme.ts

import {
  MD3LightTheme as DefaultLightTheme,
  MD3DarkTheme as DefaultDarkTheme,
} from 'react-native-paper';

// Define your new color palette
const themeColors = {
  blue: '#3895D3', // Your primary brand color
  darkGrey: '#333333', // A dark grey for surfaces in dark mode
  mediumGrey: '#888888', // For secondary text or icons
  lightGrey: '#F5F5F5', // For card backgrounds in light mode
  white: '#FFFFFF',
  black: '#000000',
  green: '#4CAF50',
};

// --- LIGHT THEME ---
export const lightTheme = {
  ...DefaultLightTheme,
  roundness: 4,
  colors: {
    // Standard properties
    ...DefaultLightTheme.colors,
    primary: themeColors.blue, // Main interactive color
    background: themeColors.white, // App background
    surface: themeColors.white, // Surface of components like AppBar
    onSurface: themeColors.black, // Text on surfaces
    onBackground: themeColors.black, // Body text
    notificationGreen: themeColors.green, //Notification Toggle

    // Custom properties for specific control
    cardBackground: themeColors.lightGrey, // Specific color for cards
    ctaButton: themeColors.blue, // Color for "Call to Action" buttons
    secondaryText: themeColors.mediumGrey,
  },
};

// --- DARK THEME ---
export const darkTheme = {
  ...DefaultDarkTheme,
  roundness: 4,
  colors: {
    // Standard properties
    ...DefaultDarkTheme.colors,
    primary: themeColors.blue, // Main interactive color
    background: themeColors.black, // App background
    surface: themeColors.darkGrey, // Surface of components like AppBar
    onSurface: themeColors.white, // Text on surfaces
    onBackground: themeColors.white, // Body text
    notificationGreen: themeColors.green, //Notification Toggele

    // Custom properties for specific control
    cardBackground: themeColors.darkGrey, // Specific color for cards
    ctaButton: themeColors.blue, // Color for "Call to Action" buttons
    secondaryText: themeColors.mediumGrey,
  },
};
