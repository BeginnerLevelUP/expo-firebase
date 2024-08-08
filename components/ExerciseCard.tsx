import { View, ScrollView, Text } from 'react-native';
import { Button, Card, ActivityIndicator } from 'react-native-paper';
import React, { useEffect, useState, FC } from 'react';
import { Link } from 'expo-router';
import { fetchAllExercises, addExercise, removeExercise, addExerciseToPlan, removeExerciseFromPlan } from '@/utils/api/fitness';
import Exercise from '@/utils/interface/exercise';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

interface ExerciseCardProps {
  searchedQuery?: string;
}

const ExerciseCard: FC<ExerciseCardProps> = ({ searchedQuery = '' }) => {
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<string>('10');
  const [offset, setOffset] = useState<string>('0');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const exercises = await fetchAllExercises(limit, offset);
        setAllExercises(exercises);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [limit, offset]);

  // Function to check if any property includes the searchedQuery
  const matchesQuery = (exercise: Exercise, query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    return Object.values(exercise).some(value =>
      value && value.toString().toLowerCase().includes(lowerCaseQuery)
    );
  };

  // Filter exercises based on searchedQuery
  const filteredExercises = allExercises.filter(exercise =>
    matchesQuery(exercise, searchedQuery)
  );

  return (
    <View className='flex-row justify-center items-center px-4'>
      <Entypo
        name="arrow-with-circle-left"
        size={24}
        color="black"
        onPress={() => {
          const newOffset = Math.max(0, parseInt(offset) - 10);
          setOffset(newOffset.toString());
        }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='my-4'>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : filteredExercises.length > 0 ? (
          filteredExercises.map((item, index) => (
            <Link
              href={{
                pathname: '/exercise/[id]',
                params: { id: item.id, data: JSON.stringify(item) },
              }}
              key={index}
            >
              <View style={{ marginVertical: 10 }} key={index} className='px-4'>
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
      <Entypo
        name="arrow-with-circle-right"
        size={24}
        color="black"
        onPress={() => {
          const newOffset = parseInt(offset) + 10;
          setOffset(newOffset.toString());
        }}
      />
    </View>
  );
};

export default ExerciseCard;