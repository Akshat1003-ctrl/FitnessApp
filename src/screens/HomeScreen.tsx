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

// --- Type definition for StepsCardContent props ---
type StepsCardData = {
  current: number;
  goal: number;
};

// --- New component for the content of the Steps card ---
const StepsCardContent = ({ data }: { data: StepsCardData }) => {
  const theme = useTheme();
  // Pass the theme to the style creation function
  const styles = createStyles(theme);
  const progress = (data.current / data.goal) * 100;

  return (
    <View style={styles.cardContentContainer}>
      <View style={styles.cardHeader}>
        <Image
          source={require('../assets/images/steps.png')}
          style={[styles.cardIcon, { tintColor: theme.colors.primary }]}
        />
        <Text style={styles.cardTitle}>Steps</Text>
      </View>
      <Text style={styles.cardValue}>
        {data.current.toLocaleString()} Steps
      </Text>
      <Text style={styles.cardGoal}>Goal: {data.goal.toLocaleString()}</Text>
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

// --- Type definition ---
type CardItemProps = {
  card: { id: number; type: string; title: string; data: any }; // Updated card type
  onDelete: (id: number) => void;
  isDeleteMode: boolean;
  onLongPress: (id: number) => void;
};

// --- Animated Card Component ---
const CardItem = React.memo(
  ({ card, onDelete, isDeleteMode, onLongPress }: CardItemProps) => {
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
              {/* Conditionally render content based on card type */}
              {card.type === 'steps' ? (
                <StepsCardContent data={card.data} />
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

  // --- State Management ---
  const [cards, setCards] = React.useState([
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
  const pastDate = new Date().setDate(today.getDate() - 7);
  const futureDate = new Date().setDate(today.getDate() + 7);
  const dateRange = getDaysArray(pastDate, futureDate);

  const todayString = new Date().toDateString();
  const selectedDateString = selectedDate.toDateString();
  const workoutTitleText =
    todayString === selectedDateString
      ? 'Workout for Today'
      : `Workout for ${selectedDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
        })}`;

  // --- Handlers ---
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
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <Text
          variant="headlineLarge"
          style={{ color: theme.colors.onBackground }}
        >
          {getGreeting()},
        </Text>
        <Text
          variant="headlineLarge"
          style={[styles.userName, { color: theme.colors.onBackground }]}
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

// --- Styles ---
// Moved createStyles outside of the main component for clarity
const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    cardBody: {},
    cardContentContainer: {
      flex: 1,
      padding: 10,
      justifyContent: 'space-between',
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardIcon: {
      width: 24,
      height: 24,
      marginRight: 8,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.onSurface,
    },
    cardValue: {
      fontSize: 32,
      fontWeight: 'bold',
      marginTop: 10,
      color: theme.dark ? theme.colors.onSurface : '#000000', // Black in light mode, default in dark
    },
    cardGoal: {
      fontSize: 14,
      color: 'gray',
    },
    progressBar: {
      height: 8,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 4,
      marginTop: 10,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
    },
  });

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  header: { marginBottom: 20 },
  userName: { fontWeight: 'bold' },
  calendarContainer: {
    marginBottom: 20,
  },
  dateItem: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  dateItemSelected: {
    backgroundColor: '#192126',
  },
  dateDay: {
    fontSize: 12,
    color: '#8B8F92',
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#192126',
  },
  dateTextSelected: {
    color: 'white',
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
    marginBottom: 15,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    zIndex: 10,
  },
  minusIcon: {
    width: 12,
    height: 2,
    backgroundColor: 'white',
  },
  pressableArea: {
    flex: 1,
  },
});

export default HomeScreen;
