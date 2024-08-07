import { View, ScrollView, Text } from 'react-native';
import { Button, Card, ActivityIndicator } from 'react-native-paper';
import React, { useEffect, useState, FC } from 'react';
import { Link } from 'expo-router';
import { fetchAllExercises,addExercise,removeExercise,addExerciseToPlan,removeExerciseFromPlan } from '@/utils/api/fitness';
import Exercise from '@/utils/interface/exercise';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface ExerciseCardProps {
  searchedQuery?: string;
}

const ExerciseCard: FC<ExerciseCardProps> = ({ searchedQuery = '' }) => {
  const [allExercies, setAllExercies] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const exercises = await fetchAllExercises();
        setAllExercies(exercises);
      } catch (error) {
        console.error('Failed to fetch meals:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchMeals();
  }, []);

  // Function to check if any property includes the searchedQuery
  const matchesQuery = (exercise: Exercise, query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    return Object.values(exercise).some(value => 
      value && value.toString().toLowerCase().includes(lowerCaseQuery)
    );
  };

  // Filter meals based on searchedQuery
  const filteredMeals = allExercies.filter(meal =>
    matchesQuery(meal, searchedQuery)
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : filteredMeals.length > 0 ? (
        filteredMeals.map((item, index) => (
          <Link
            href={{
              pathname: '/exercise/[id]',
              params: { id: item.id, data: JSON.stringify(item) },
            }}
            key={index}
          >
            <View style={{ marginVertical: 10 }} key={index}>
              <Card>
                <Card.Title title={item.name} subtitle={item.target} />
                <Card.Cover source={{ uri: `${item.gifUrl}` }} />
                <Card.Actions>
                  <Button onPress={() => { addExerciseToPlan(item) }}>Add To Plan</Button>
                  <Button onPress={() => { addExercise(item) }}>Save For Later</Button>
                </Card.Actions>
              </Card>
            </View>
          </Link>
        ))
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>No results found</Text>
          <FontAwesome5 name="sad-cry" size={24} color="black" />
        </View>
      )}
    </ScrollView>
  );
};

export default ExerciseCard;