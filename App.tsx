// src/screens/HomeScreen.tsx

import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import { Text, useTheme, Card, MD3Theme } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

// --- Helper Functions ---
const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return 'Good Morning';
  if (currentHour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

const getDaysArray = (start: Date | number, end: Date | number) => {
  let arr = [];
  for (
    let dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};

// --- Type definitions ---
type StepsCardData = { current: number; goal: number };
type CardData = { id: number; type: string; title: string; data: any };
type CardItemProps = {
  card: CardData;
  onDelete: (id: number) => void;
  isDeleteMode: boolean;
  onLongPress: (id: number) => void;
  styles: any;
  theme: MD3Theme;
};

// --- Sub-Components for Card Content ---

const StepsCardContent = ({
  data,
  styles,
  theme,
}: {
  data: StepsCardData;
  styles: any;
  theme: MD3Theme;
}) => {
  const progress = data.current > 0 ? (data.current / data.goal) * 100 : 0;
  return (
    <View style={styles.cardContentContainer}>
      <View style={styles.cardHeader}>
        <Image
          source={require('.../assets/images/steps.png')}
          style={[styles.cardIcon, { tintColor: theme.colors.primary }]}
        />
        <Text style={styles.cardTitle}>Steps</Text>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.cardValue}>
          {data.current.toLocaleString()} Steps
        </Text>
        <Text style={styles.cardGoal}>Goal: {data.goal.toLocaleString()}</Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress}%`, backgroundColor: theme.colors.primary },
          ]}
        />
      </View>
    </View>
  );
};

// --- Animated Card Component ---
const CardItem = React.memo(
  ({
    card,
    onDelete,
    isDeleteMode,
    onLongPress,
    styles,
    theme,
  }: CardItemProps) => {
    const rotation = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { rotate: `${interpolate(rotation.value, [0, 1], [0, 1])}deg` },
      ],
    }));

    React.useEffect(() => {
      if (isDeleteMode) {
        rotation.value = withRepeat(
          withSequence(
            withTiming(-1, { duration: 80 }),
            withTiming(1, { duration: 80 }),
          ),
          -1,
          true,
        );
      } else {
        rotation.value = withTiming(0, { duration: 80 });
      }
    }, [isDeleteMode, rotation]);

    return (
      <Pressable onLongPress={() => onLongPress(card.id)} delayLongPress={800}>
        <Animated.View style={animatedStyle}>
          <Card style={styles.statCard}>
            <Card.Content>
              {card.type === 'steps' ? (
                <StepsCardContent
                  data={card.data}
                  styles={styles}
                  theme={theme}
                />
              ) : null}
            </Card.Content>
          </Card>
          {isDeleteMode && (
            <TouchableOpacity
              onPress={() => onDelete(card.id)}
              style={styles.deleteButton}
            >
              <View style={styles.minusIcon} />
            </TouchableOpacity>
          )}
        </Animated.View>
      </Pressable>
    );
  },
);

// --- Main Home Screen Component ---
const HomeScreen = () => {
  const theme = useTheme();
  const userName = 'Akshat';
  const CARD_LIMIT = 10;

  // Create styles ONCE and pass them down to all children
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const [cards, setCards] = React.useState<CardData[]>([
    {
      id: 1,
      type: 'steps',
      title: 'Steps',
      data: { current: 6543, goal: 10000 },
    },
    { id: 2, type: 'empty', title: 'Empty', data: {} },
    { id: 3, type: 'empty', title: 'Empty', data: {} },
  ]);
  const [isDeleteMode, setDeleteMode] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const today = new Date();
  const dateRange = getDaysArray(
    new Date().setDate(today.getDate() - 7),
    new Date().setDate(today.getDate() + 7),
  );
  const workoutTitleText =
    today.toDateString() === selectedDate.toDateString()
      ? 'Workout for Today'
      : `Workout for ${selectedDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
        })}`;

  const handleAddCard = () => {
    if (cards.length < CARD_LIMIT) {
      setCards([
        ...cards,
        { id: Date.now(), type: 'empty', title: 'New Card', data: {} },
      ]);
    }
  };
  const handleDeleteCard = (idToDelete: number) => {
    const newCards = cards.filter(card => card.id !== idToDelete);
    setCards(newCards);
    if (newCards.length === 0) setDeleteMode(false);
  };
  const handleLongPress = (_id: number) => {
    setDeleteMode(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.headerText}>
          {getGreeting()},
        </Text>
        <Text
          variant="headlineLarge"
          style={[styles.userName, styles.headerText]}
        >
          {userName}
        </Text>
      </View>

      <View style={styles.calendarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dateRange.map((date, index) => {
            const isSelected =
              date.toDateString() === selectedDate.toDateString();
            return (
              <TouchableOpacity
                key={index}
                style={[styles.dateItem, isSelected && styles.dateItemSelected]}
                onPress={() => setSelectedDate(date)}
              >
                <Text
                  style={[
                    styles.dateDay,
                    isSelected && styles.dateTextSelected,
                  ]}
                >
                  {date
                    .toLocaleDateString('en-US', { weekday: 'short' })
                    .toUpperCase()}
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => setDeleteMode(false)}
          style={styles.pressableArea}
        >
          <View style={styles.statsContainer}>
            <Text style={styles.workoutTitle}>{workoutTitleText}</Text>
            {cards.map(card => (
              <View key={card.id} style={styles.cardWrapper}>
                <CardItem
                  card={card}
                  onDelete={handleDeleteCard}
                  isDeleteMode={isDeleteMode}
                  onLongPress={handleLongPress}
                  styles={styles}
                  theme={theme}
                />
              </View>
            ))}
            {!isDeleteMode && cards.length < CARD_LIMIT && (
              <View style={styles.cardWrapper}>
                <TouchableOpacity
                  onPress={handleAddCard}
                  style={styles.addCard}
                >
                  <Image
                    source={require('../assets/images/add.png')}
                    style={[
                      styles.addIcon,
                      { tintColor: theme.colors.primary },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

// --- A SINGLE StyleSheet for the whole screen ---
const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      backgroundColor: theme.colors.background,
    },
    header: { marginBottom: 20 },
    headerText: { color: theme.colors.onBackground },
    userName: { fontWeight: 'bold' },
    calendarContainer: { marginBottom: 20 },
    dateItem: {
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 12,
      marginRight: 10,
      backgroundColor: theme.colors.surfaceVariant,
    },
    dateItemSelected: { backgroundColor: theme.colors.onSurface },
    dateDay: { fontSize: 12, color: theme.colors.onSurfaceVariant },
    dateNumber: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
    },
    dateTextSelected: { color: theme.colors.surface },
    workoutTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      width: '100%',
      marginBottom: 15,
      color: theme.colors.onBackground,
    },
    statsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingBottom: 20,
    },
    cardWrapper: {
      width: '48%',
      marginBottom: 15,
      paddingTop: 10,
      paddingLeft: 10,
    },
    statCard: { width: '100%', height: 160 },
    addCard: {
      width: '100%',
      height: 160,
      justifyContent: 'center',
      alignItems: 'center',
      borderStyle: 'dashed',
      borderWidth: 2,
      borderColor: 'gray',
      borderRadius: 12,
    },
    addIcon: { width: 50, height: 50 },
    deleteButton: {
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: '#8B8F92',
      borderRadius: 12,
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      zIndex: 10,
    },
    minusIcon: { width: 12, height: 2, backgroundColor: 'white' },
    pressableArea: { flex: 1 },
    // Styles for card content
    cardContentContainer: {
      flex: 1,
      padding: 10,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardIcon: {
      width: 30,
      height: 30,
      marginRight: 8,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.onSurface,
    },
    cardBody: {
      flex: 1,
      justifyContent: 'center',
    },
    cardValue: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.dark ? theme.colors.onSurface : '#000000',
    },
    cardGoal: {
      fontSize: 14,
      color: 'gray',
    },
    progressBar: {
      height: 8,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
    },
  });

export default HomeScreen;
