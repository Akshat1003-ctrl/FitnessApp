import {
  MD3LightTheme as DefaultLightTheme,
  MD3DarkTheme as DefaultDarkTheme,
} from 'react-native-paper';

// --- FONT CONFIGURATION ---
// This function takes a theme's default fonts and overrides the fontFamily.
const createFontConfig = (defaultFonts: any) => {
  const fontConfig: { [key: string]: any } = {}; // Add index signature to fix the type error
  for (const key in defaultFonts) {
    fontConfig[key] = {
      ...defaultFonts[key],
      fontFamily: 'Lato-Regular', // Use 'Lato-Regular' as the base font
    };
  }
  return fontConfig;
};

// --- LIGHT THEME ---
export const lightTheme = {
  ...DefaultLightTheme,
  roundness: 12, // More rounded corners to match the design
  colors: {
    ...DefaultLightTheme.colors,
    primary: '#BBF246', // Lime Green for buttons and active elements
    onPrimary: '#192126', // Dark text on the primary color
    background: '#FFFFFF', // Clean white background
    surface: '#FFFFFF', // Cards and other surfaces are also white
    onSurface: '#192126', // Main text color is dark charcoal
    onBackground: '#192126',
    outline: '#E0E0E0', // Light grey for borders
    text: '#192126',
  },
  fonts: createFontConfig(DefaultLightTheme.fonts),
};

// --- DARK THEME ---
export const darkTheme = {
  ...DefaultDarkTheme,
  roundness: 12, // More rounded corners to match the design
  colors: {
    ...DefaultDarkTheme.colors,
    primary: '#BBF246', // Lime Green for buttons and active elements
    onPrimary: '#192126', // Dark text on the primary color
    background: '#192126', // Dark charcoal for the main background
    surface: '#384046', // Darker grey for cards and surfaces
    onSurface: '#FFFFFF', // Main text color is white
    onBackground: '#FFFFFF',
    outline: '#5E6468', // Medium grey for borders
    text: '#FFFFFF',
  },
  fonts: createFontConfig(DefaultDarkTheme.fonts),
};
