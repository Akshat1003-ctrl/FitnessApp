import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Divider,
  ProgressBar,
  Text,
  useTheme,
  MD3Theme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// --- FIX 1: Create a type for the GoalIcon component's props ---
type GoalIconProps = {
  iconName: string | null;
  imageSource: ImageSourcePropType | null;
  theme: MD3Theme;
};

// --- FIX 2: Move the GoalIcon component outside of ProfileScreen ---
// This makes it a stable, reusable component and fixes the implicit 'any' type error.
const GoalIcon = ({ iconName, imageSource, theme }: GoalIconProps) => {
  // If an image source is provided, render an Image component.
  if (imageSource) {
    return (
      <Image
        source={imageSource}
        style={{ width: 24, height: 24, tintColor: theme.colors.onSurface }}
      />
    );
  }
  // Otherwise, render an Icon from the vector library.
  return (
    <Icon name={iconName || ''} size={24} color={theme.colors.onSurface} />
  );
};

const ProfileScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const profileData = {
    name: 'Akshat Chandra',
    subtitle: 'Fitness Enthusiast',
    joinDate: 'Joined 2021',
    avatar: require('../assets/images/profile_placeholder.png'),
    stats: [
      { id: 1, value: '150', label: 'Workouts' },
      { id: 2, value: '30', label: 'Friends' },
      { id: 3, value: '200', label: 'Challenges' },
    ],
    goals: [
      {
        id: 1,
        icon: null,
        image: require('../assets/images/calander.png'),
        title: 'Weekly Workouts',
        description: '5 workouts per week',
      },
      {
        id: 2,
        icon: null,
        image: require('../assets/images/unbalance_weight.png'),
        title: 'Weight Loss',
        description: 'Lose 10 lbs',
      },
      {
        id: 3,
        icon: null,
        image: require('../assets/images/footsteps.png'),
        title: 'Running Goal',
        description: 'Run a marathon',
      },
    ],
    progress: [
      { id: 1, title: 'Weekly Workouts', value: 3 / 4, label: '3/4 completed' },
      { id: 2, title: 'Weight Loss', value: 5 / 10, label: '5/10 lbs lost' },
      { id: 3, title: 'Running Goal', value: 5 / 20, label: '5/20 miles run' },
    ],
  };

  return (
    <View style={styles.screen}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Profile" titleStyle={styles.appbarTitle} />
        <Appbar.Action icon="cog-outline" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        {/* --- User Info Section --- */}
        <View style={styles.userInfoSection}>
          <Avatar.Image size={100} source={profileData.avatar} />
          <Text variant="headlineMedium" style={styles.userName}>
            {profileData.name}
          </Text>
          <Text variant="bodyLarge" style={styles.userSubtitle}>
            {profileData.subtitle}
          </Text>
          <Text variant="bodyMedium" style={styles.userJoinDate}>
            {profileData.joinDate}
          </Text>
        </View>

        {/* --- Edit Profile Button --- */}
        <Button
          mode="contained"
          onPress={() => {}}
          style={styles.editButton}
          labelStyle={styles.editButtonLabel}
          buttonColor={theme.colors.surface}
          textColor={theme.colors.onSurface}
        >
          Edit Profile
        </Button>

        {/* --- Stats Section --- */}
        <View style={styles.statsContainer}>
          {profileData.stats.map(stat => (
            <Card key={stat.id} style={styles.statCard}>
              <Card.Content style={styles.statContent}>
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

        {/* --- Goals Section --- */}
        <Text variant="headlineSmall" style={styles.sectionHeader}>
          Goals
        </Text>
        <Card style={styles.listCard}>
          {profileData.goals.map((goal, index) => (
            <React.Fragment key={goal.id}>
              <View style={styles.goalItem}>
                <View style={styles.goalIconContainer}>
                  <GoalIcon
                    iconName={goal.icon}
                    imageSource={goal.image}
                    theme={theme}
                  />
                </View>
                <View style={styles.goalTextContainer}>
                  <Text variant="titleMedium">{goal.title}</Text>
                  <Text
                    variant="bodyMedium"
                    //@ts-ignore
                    style={{ color: theme.colors.secondaryText }}
                  >
                    {goal.description}
                  </Text>
                </View>
              </View>
              {index < profileData.goals.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Card>

        {/* --- Progress Section --- */}
        <Text variant="headlineSmall" style={styles.sectionHeader}>
          Progress
        </Text>
        <Card style={styles.listCard}>
          {profileData.progress.map(item => (
            <View key={item.id} style={styles.progressItem}>
              <Text variant="titleMedium">{item.title}</Text>
              <ProgressBar
                progress={item.value}
                color={theme.colors.primary}
                style={styles.progressBar}
              />
              <Text
                variant="bodySmall"
                //@ts-ignore
                style={{ color: theme.colors.secondaryText }}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </Card>
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
    },
    appbarTitle: {
      fontWeight: 'bold',
    },
    container: {
      padding: 16,
      paddingBottom: 120,
    },
    userInfoSection: {
      alignItems: 'center',
      marginBottom: 24,
    },
    userName: {
      marginTop: 16,
      fontWeight: 'bold',
    },
    userSubtitle: {
      marginTop: 4,
      //@ts-ignore
      color: theme.colors.secondaryText,
    },
    userJoinDate: {
      marginTop: 4,
      //@ts-ignore
      color: theme.colors.secondaryText,
    },
    editButton: {
      borderRadius: 50,
      paddingVertical: 6,
      marginBottom: 24,
    },
    editButtonLabel: {
      fontSize: 16,
      fontWeight: 'bold',
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
    statContent: {
      alignItems: 'center',
      paddingHorizontal: 4,
      paddingVertical: 16,
    },
    sectionHeader: {
      fontWeight: 'bold',
      marginBottom: 16,
    },
    listCard: {
      backgroundColor: theme.colors.surface,
      marginBottom: 24,
    },
    goalItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    goalIconContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 8,
      padding: 12,
      marginRight: 16,
      width: 48,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    goalTextContainer: {
      flex: 1,
    },
    progressItem: {
      padding: 16,
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
      marginVertical: 8,
    },
  });

export default ProfileScreen;
