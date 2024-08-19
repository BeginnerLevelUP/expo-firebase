import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import Meal from '@/utils/interface/meal'

interface HomeCardProps {
  userPlannedMeals: Meal[]
}

export default function HomeCardMeal({ userPlannedMeals }: HomeCardProps) {
  const numColumns = 2; // Number of columns in the grid

  const renderItem = ({ item }: { item: Meal }) => (
    <View style={styles.gridItem}>
      <Text style={styles.mealText}>{item.name}</Text>
      {/* Add more details about the meal here */}
    </View>
  );

  return (
    <FlatList
      data={userPlannedMeals}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.grid}
    />
  )
}

const styles = StyleSheet.create({
  grid: {
    justifyContent: 'center',
  },
  gridItem: {
    flex: 1,
    margin: 10,
    backgroundColor: '#f9c2ff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})