// src/screens/ProfileScreen.tsx

import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
// Import Switch and MD3Theme for type safety
import {
  Text,
  useTheme,
  Card,
  Avatar,
  List,
  Divider,
  MD3Theme,
  Switch,
} from 'react-native-paper';

// --- Main Profile Screen Component ---
const ProfileScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  // --- State for the notification toggle ---
  const [isNotificationsEnabled, setIsNotificationsEnabled] =
    React.useState(true);

  // --- Handler to toggle the switch state ---
  const onToggleSwitch = React.useCallback(() => {
    setIsNotificationsEnabled(prev => !prev);
  }, []);

  // --- Mock Data (will come from Firebase later) ---
  const userData = {
    name: 'Akshat',
    age: 28,
    height: '6\'0"',
    weight: '180 lbs',
    primaryGoal: 'Build Muscle',
  };

  const achievements = [
    { id: 1, icon: 'trophy-award', name: 'First Workout' },
    { id: 2, icon: 'run-fast', name: '5k Runner' },
    { id: 3, icon: 'weight-lifter', name: 'New PR' },
    { id: 4, icon: 'star-circle', name: '30-Day Streak' },
    { id: 5, icon: 'calendar-check', name: 'Perfect Week' },
  ];

  // --- Memoized Icon Render Functions ---
  const renderEditIcon = React.useCallback(
    () => (
      <Image
        source={require('../assets/images/edit.png')}
        style={[styles.menuIcon, { tintColor: theme.colors.onSurface }]}
      />
    ),
    [styles.menuIcon, theme.colors.onSurface],
  );
  const renderLinkedIcon = React.useCallback(
    () => (
      <Image
        source={require('../assets/images/link.png')}
        style={[styles.menuIcon, { tintColor: theme.colors.onSurface }]}
      />
    ),
    [styles.menuIcon, theme.colors.onSurface],
  );
  const renderLogoutPngIcon = React.useCallback(
    () => (
      <Image
        source={require('../assets/images/logout.png')}
        style={[styles.menuIcon, { tintColor: theme.colors.error }]}
      />
    ),
    [styles.menuIcon, theme.colors.error],
  );

  // --- Memoized Component Render Functions ---
  const renderNotificationSwitch = React.useCallback(
    () => (
      <Switch value={isNotificationsEnabled} onValueChange={onToggleSwitch} />
    ),
    [isNotificationsEnabled, onToggleSwitch],
  );

  return (
    <ScrollView style={styles.container}>
      {/* --- User Info Section --- */}
      <View style={styles.userInfoSection}>
        <Avatar.Image
          size={80}
          source={require('../assets/images/profile_placeholder.png')}
        />
        <View style={styles.userInfoText}>
          <Text style={styles.title}>{userData.name}</Text>
          <Text style={styles.caption}>
            Primary Goal: {userData.primaryGoal}
          </Text>
        </View>
      </View>

      {/* --- Physical Stats Section --- */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>
            {userData.height}
          </Text>
          <Text style={styles.statLabel}>Height</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>
            {userData.weight}
          </Text>
          <Text style={styles.statLabel}>Weight</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>
            {userData.age}
          </Text>
          <Text style={styles.statLabel}>Age</Text>
        </View>
      </View>

      {/* --- Achievements Section --- */}
      <Card style={styles.card}>
        <Card.Title title="Achievements" titleStyle={styles.cardTitle} />
        <Card.Content>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {achievements.map(item => (
              <View key={item.id} style={styles.badge}>
                <Avatar.Icon
                  size={50}
                  icon={item.icon}
                  style={{ backgroundColor: theme.colors.surfaceVariant }}
                />
                <Text style={styles.badgeName}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>
        </Card.Content>
      </Card>

      {/* --- Settings Menu Section --- */}
      <View style={styles.menuWrapper}>
        <List.Item title="Notifications" right={renderNotificationSwitch} />
        <Divider />
        <List.Item
          title="Edit Profile"
          left={renderEditIcon}
          onPress={() => {}}
        />
        <Divider />
        <List.Item
          title="Linked Accounts"
          left={renderLinkedIcon}
          onPress={() => {}}
        />
        <Divider />
        <List.Item
          title="Sign Out"
          titleStyle={{ color: theme.colors.error }}
          left={renderLogoutPngIcon}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};

// --- Styles ---
const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginTop: 20,
      marginBottom: 25,
      flexDirection: 'row',
      alignItems: 'center',
    },
    userInfoText: {
      marginLeft: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.onBackground,
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
      color: theme.colors.onSurfaceVariant,
    },
    statsRow: {
      flexDirection: 'row',
      marginBottom: 20,
      justifyContent: 'space-around',
    },
    statBox: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    statLabel: {
      fontSize: 15,
      color: theme.colors.onSurfaceVariant,
    },
    card: {
      marginHorizontal: 15,
      marginBottom: 20,
    },
    cardTitle: {
      fontWeight: 'bold',
    },
    badge: {
      alignItems: 'center',
      marginRight: 20,
    },
    badgeName: {
      marginTop: 5,
      fontSize: 12,
    },
    menuWrapper: {
      marginTop: 10,
    },
    // New unified style for all menu icons
    menuIcon: {
      width: 24,
      height: 24,
      marginLeft: 16,
      marginRight: 32,
    },
  });

export default ProfileScreen;
