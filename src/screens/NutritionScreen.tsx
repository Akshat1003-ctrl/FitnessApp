import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  Appbar,
  Card,
  Text,
  ProgressBar,
  List,
  useTheme,
  Divider,
  MD3Theme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type MacroCardProps = {
  title: string;
  value: number;
  unit: string;
  style: StyleProp<ViewStyle>;
};

const MacroCard = ({ title, value, unit, style }: MacroCardProps) => (
  <Card style={style}>
    <Card.Content>
      <Text variant="titleMedium">{title}</Text>
      <Text variant="headlineSmall">
        {value}
        <Text variant="bodyLarge">{unit}</Text>
      </Text>
    </Card.Content>
  </Card>
);

const NutritionScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const renderListIcon = React.useCallback(
    () => (
      <Icon
        name="../assets/images/home.png"
        size={24}
        color={theme.colors.primary}
      />
    ),
    [theme.colors.primary],
  );

  const nutritionData = {
    calories: { current: 1200, goal: 2000 },
    macros: { protein: 120, carbs: 150, fat: 50 },
    meals: {
      breakfast: 300,
      lunch: 400,
      dinner: 500,
      snacks: 100,
    },
  };

  const calorieProgress =
    nutritionData.calories.current / nutritionData.calories.goal;

  return (
    <View style={styles.screen}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        {/* FIX: Added the missing Appbar.Action for the menu icon */}
        <Appbar.Action icon="menu" onPress={() => {}} />
        <Appbar.Content title="Nutrition" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Today's Calories Section */}
        <View style={styles.section}>
          <Text variant="headlineSmall" style={styles.header}>
            Today
          </Text>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.calorieHeader}>
                <Text variant="titleMedium">Calories</Text>
                <Text variant="bodyLarge">
                  {nutritionData.calories.current}/{nutritionData.calories.goal}
                </Text>
              </View>
              <ProgressBar
                progress={calorieProgress}
                color={theme.colors.primary}
                style={styles.progressBar}
              />
            </Card.Content>
          </Card>
        </View>

        {/* Macronutrients Section */}
        <View style={styles.section}>
          <Text variant="headlineSmall" style={styles.header}>
            Macronutrients
          </Text>
          <View style={styles.macroContainer}>
            <MacroCard
              title="Protein"
              value={nutritionData.macros.protein}
              unit="g"
              style={styles.macroCard}
            />
            <MacroCard
              title="Carbs"
              value={nutritionData.macros.carbs}
              unit="g"
              style={styles.macroCard}
            />
            <MacroCard
              title="Fat"
              value={nutritionData.macros.fat}
              unit="g"
              style={styles.macroCard}
            />
          </View>
        </View>

        {/* Meals Section */}
        <View style={styles.section}>
          <Text variant="headlineSmall" style={styles.header}>
            Meals
          </Text>
          <Card style={styles.card}>
            <List.Item
              title="Breakfast"
              description={`${nutritionData.meals.breakfast} calories`}
              right={renderListIcon}
              onPress={() => {}}
            />
            <Divider />
            <List.Item
              title="Lunch"
              description={`${nutritionData.meals.lunch} calories`}
              right={renderListIcon}
              onPress={() => {}}
            />
            <Divider />
            <List.Item
              title="Dinner"
              description={`${nutritionData.meals.dinner} calories`}
              right={renderListIcon}
              onPress={() => {}}
            />
            <Divider />
            {/* FIX: Corrected the syntax for the 'right' prop */}
            <List.Item
              title="Snacks"
              description={`${nutritionData.meals.snacks} calories`}
              right={renderListIcon}
              onPress={() => {}}
            />
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

// Stylesheet created with the theme
const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    appbarTitle: {
      fontWeight: 'bold',
    },
    container: {
      padding: 16,
      paddingBottom: 100,
    },
    section: {
      marginBottom: 24,
    },
    header: {
      marginBottom: 12,
      fontWeight: 'bold',
    },
    card: {
      backgroundColor: theme.colors.surface,
    },
    calorieHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
    },
    macroContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    macroCard: {
      width: '48%',
      marginBottom: 16,
      backgroundColor: theme.colors.surface,
    },
  });

export default NutritionScreen;
