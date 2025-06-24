import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Appbar,
  Avatar,
  Card,
  Text,
  useTheme,
  MD3Theme,
} from 'react-native-paper';

const HomeScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  // Mock data to populate the screen. You can replace this with Firebase data later.
  const summaryData = {
    stats: [
      { id: 1, label: 'Steps', value: '1,234' },
      { id: 2, label: 'Calories', value: '567' },
      { id: 3, label: 'Workouts', value: '89' },
    ],
    mainProgram: {
      title: 'Strength Training Program',
      description:
        'Build muscle and increase strength with this comprehensive program.',
      duration: '4 weeks',
    },
    recommendedWorkouts: [
      { id: 1, title: 'Yoga for Flexibility', duration: '30 min' },
      { id: 2, title: 'Morning Run', duration: '45 min' },
      { id: 3, title: 'Full Body', duration: '60 min' },
    ],
  };

  return (
    <View style={styles.screen}>
      {/* --- Custom Header --- */}
      <Appbar.Header style={styles.appbar}>
        <Avatar.Image
          size={30}
          source={require('../assets/images/profile_placeholder.png')}
          style={styles.avatar}
        />
        <Appbar.Content
          title="Today"
          titleStyle={styles.appbarTitle}
          style={styles.appbarContent}
        />
        <Appbar.Action icon="cog-outline" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        {/* --- Stats Cards --- */}
        <View style={styles.statsContainer}>
          {summaryData.stats.map(stat => (
            <Card key={stat.id} style={styles.statCard}>
              <Card.Content style={styles.statCardContent}>
                <Text variant="headlineMedium">{stat.value}</Text>
                <Text
                  variant="bodySmall"
                  //@ts-ignore
                  style={{ color: theme.colors.secondaryText }}
                >
                  {stat.label}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* --- Main Program Card --- */}
        <Card style={styles.programCard}>
          {/* Placeholder for the main program image */}
          <View style={styles.imagePlaceholder} />
          <Card.Content style={styles.programCardContent}>
            <Text variant="titleLarge" style={styles.cardTitle}>
              {summaryData.mainProgram.title}
            </Text>
            <Text variant="bodyMedium">
              {summaryData.mainProgram.description}
            </Text>
            <Text variant="bodySmall" style={styles.durationText}>
              {summaryData.mainProgram.duration}
            </Text>
          </Card.Content>
        </Card>

        {/* --- Recommended Workouts Section --- */}
        <Text variant="headlineSmall" style={styles.sectionHeader}>
          Recommended Workouts
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {summaryData.recommendedWorkouts.map((workout, index) => (
            <Card
              key={workout.id}
              style={[
                styles.recommendedCard,
                { marginLeft: index === 0 ? 0 : 16 },
              ]}
            >
              {/* Placeholder for workout image */}
              <View style={styles.recommendedImagePlaceholder} />
              <Card.Content style={styles.recommendedCardContent}>
                <Text variant="titleMedium">{workout.title}</Text>
                <Text
                  variant="bodyMedium"
                  // @ts-ignore
                  style={{ color: theme.colors.secondaryText }}
                >
                  {workout.duration}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    appbar: {
      backgroundColor: theme.colors.background,
      elevation: 0,
      justifyContent: 'space-between',
    },
    avatar: {
      marginLeft: 16,
    },
    appbarContent: {
      alignItems: 'center',
    },
    appbarTitle: {
      fontWeight: 'bold',
    },
    container: {
      paddingHorizontal: 16,
      paddingBottom: 120, // To make space for the floating tab bar
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    statCard: {
      width: '32%',
      backgroundColor: theme.colors.surface,
    },
    statCardContent: {
      alignItems: 'center',
      paddingVertical: 16,
    },
    programCard: {
      marginBottom: 24,
      backgroundColor: theme.colors.surface,
    },
    imagePlaceholder: {
      height: 150,
      backgroundColor: theme.colors.surfaceVariant, // Using a theme color for placeholder
      borderTopLeftRadius: theme.roundness,
      borderTopRightRadius: theme.roundness,
    },
    programCardContent: {
      padding: 16,
    },
    cardTitle: {
      fontWeight: 'bold',
      marginBottom: 8,
    },
    durationText: {
      color: theme.colors.primary,
      marginTop: 8,
    },
    sectionHeader: {
      fontWeight: 'bold',
      marginBottom: 16,
    },
    recommendedCard: {
      width: 200,
      backgroundColor: theme.colors.surface,
    },
    recommendedImagePlaceholder: {
      height: 120,
      backgroundColor: theme.colors.surfaceVariant,
      borderTopLeftRadius: theme.roundness,
      borderTopRightRadius: theme.roundness,
    },
    recommendedCardContent: {
      padding: 12,
    },
  });

export default HomeScreen;
