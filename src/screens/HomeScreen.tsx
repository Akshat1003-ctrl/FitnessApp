import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable, // Import Pressable
} from 'react-native';
import { Appbar, Card, Text, useTheme, MD3Theme } from 'react-native-paper';
// FIX: Import the 'Video' component type alongside the component itself.
import Video, { VideoRef } from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// --- Type definition for the VideoPlayer props ---
type VideoPlayerProps = {
  videoUri: string;
  isPlaying: boolean;
  onCardPress: () => void;
  theme: MD3Theme;
  styles: any;
};

// --- Reusable Video Player Component ---
const VideoPlayer = ({
  videoUri,
  isPlaying,
  onCardPress,
  styles,
}: VideoPlayerProps) => {
  // FIX: Provide the 'VideoRef' type to the useRef hook.
  // This tells TypeScript what methods are available on the ref (e.g., .seek()).
  const videoRef = useRef<VideoRef>(null);

  return (
    <Pressable onPress={onCardPress}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: videoUri }}
          style={styles.video}
          paused={!isPlaying}
          resizeMode="cover"
          repeat
          muted
          // The optional chaining (?.) is important here as the ref might be null initially.
          onEnd={() => videoRef.current?.seek(0)}
        />
        {!isPlaying && (
          <View style={styles.videoOverlay}>
            <Icon
              name="play-circle"
              size={60}
              color="rgba(255, 255, 255, 0.8)"
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};

// --- Helper Functions ---
const getDaysArray = (start: Date, end: Date): Date[] => {
  const arr = [];
  for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};

const getMockDataForDate = (date: Date) => {
  const day = date.getDate();
  return {
    steps: (1500 + ((day * 150) % 5000)).toLocaleString(),
    calories: (300 + ((day * 50) % 1000)).toLocaleString(),
    workouts: (day % 4).toString(),
  };
};

// --- Main Component ---
const HomeScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyData, setDailyData] = useState(getMockDataForDate(new Date()));
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const summaryData = {
    mainProgram: {
      id: 'main_program',
      title: 'Strength Training Program',
      description:
        'Build muscle and increase strength with this comprehensive program.',
      duration: '4 weeks',
      videoUri:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
    recommendedWorkouts: [
      {
        id: 'rec_1',
        title: 'Yoga for Flexibility',
        duration: '30 min',
        videoUri:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      },
      {
        id: 'rec_2',
        title: 'Morning Run',
        duration: '45 min',
        videoUri:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      },
      {
        id: 'rec_3',
        title: 'Full Body',
        duration: '60 min',
        videoUri:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      },
    ],
  };

  const today = new Date();
  const dateRange = getDaysArray(
    new Date(new Date().setDate(today.getDate() - 30)),
    new Date(new Date().setDate(today.getDate() + 30)),
  );

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setDailyData(getMockDataForDate(date));
  };

  const handleVideoPress = (videoId: string) => {
    setPlayingVideoId(prevId => (prevId === videoId ? null : videoId));
  };

  const monthName = selectedDate.toLocaleString('default', { month: 'long' });

  return (
    <View style={styles.screen}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Overview" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.calendarContainer}>
          <Text style={styles.monthHeader}>{monthName}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dateRange.map((date, index) => {
              const isSelected =
                date.toDateString() === selectedDate.toDateString();
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateItem,
                    isSelected && styles.dateItemSelected,
                  ]}
                  onPress={() => handleDateSelect(date)}
                >
                  <Text
                    style={[
                      styles.dateDay,
                      isSelected && styles.dateTextSelected,
                    ]}
                  >
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </Text>
                  <Text
                    style={[
                      styles.dateNumber,
                      isSelected && styles.dateTextSelected,
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statCardContent}>
              <Text variant="headlineMedium">{dailyData.steps}</Text>
              <Text variant="bodySmall" style={styles.secondaryText}>
                Steps
              </Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statCardContent}>
              <Text variant="headlineMedium">{dailyData.calories}</Text>
              <Text variant="bodySmall" style={styles.secondaryText}>
                Calories
              </Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content style={styles.statCardContent}>
              <Text variant="headlineMedium">{dailyData.workouts}</Text>
              <Text variant="bodySmall" style={styles.secondaryText}>
                Workouts
              </Text>
            </Card.Content>
          </Card>
        </View>

        <Card style={styles.programCard}>
          <VideoPlayer
            videoUri={summaryData.mainProgram.videoUri}
            isPlaying={playingVideoId === summaryData.mainProgram.id}
            onCardPress={() => handleVideoPress(summaryData.mainProgram.id)}
            theme={theme}
            styles={styles}
          />
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

        <Text variant="headlineSmall" style={styles.sectionHeader}>
          Recommended Workouts
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {summaryData.recommendedWorkouts.map((workout, index) => (
            <Card
              key={workout.id}
              style={[
                styles.recommendedCard,
                index > 0 && styles.recommendedCardWithMargin,
              ]}
            >
              <VideoPlayer
                videoUri={workout.videoUri}
                isPlaying={playingVideoId === workout.id}
                onCardPress={() => handleVideoPress(workout.id)}
                theme={theme}
                styles={styles}
              />
              <Card.Content style={styles.recommendedCardContent}>
                <Text variant="titleMedium">{workout.title}</Text>
                <Text variant="bodyMedium" style={styles.secondaryText}>
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
    screen: { flex: 1, backgroundColor: theme.colors.background },
    appbar: { backgroundColor: theme.colors.background, elevation: 0 },
    appbarTitle: { fontWeight: 'bold', textAlign: 'center' },
    container: { paddingHorizontal: 16, paddingBottom: 100 },
    calendarContainer: { paddingBottom: 24 },
    monthHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 12,
      color: theme.colors.onBackground,
    },
    dateItem: {
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      marginRight: 10,
      backgroundColor: theme.colors.surfaceVariant,
    },
    dateItemSelected: { backgroundColor: theme.colors.primary },
    dateDay: { fontSize: 14, color: theme.colors.onSurfaceVariant },
    dateNumber: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
    },
    dateTextSelected: { color: theme.colors.onPrimary },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    statCard: { width: '32%', backgroundColor: theme.colors.surface },
    statCardContent: { alignItems: 'center', paddingVertical: 16 },
    secondaryText: { color: theme.colors.onSurfaceVariant },
    programCard: { marginBottom: 24, backgroundColor: theme.colors.surface },
    programCardContent: { padding: 16 },
    cardTitle: { fontWeight: 'bold', marginBottom: 8 },
    durationText: { color: theme.colors.primary, marginTop: 8 },
    sectionHeader: { fontWeight: 'bold', marginBottom: 16 },
    recommendedCard: { width: 200, backgroundColor: theme.colors.surface },
    recommendedCardWithMargin: { marginLeft: 16 },
    recommendedCardContent: { padding: 12 },
    videoContainer: {
      height: 150,
      backgroundColor: theme.colors.surfaceVariant,
      borderTopLeftRadius: theme.roundness,
      borderTopRightRadius: theme.roundness,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    videoOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
  });

export default HomeScreen;
