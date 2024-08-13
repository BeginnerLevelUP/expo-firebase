import { View, ScrollView, Text } from 'react-native';
import { Button, Card, ActivityIndicator } from 'react-native-paper';
import React, { useEffect, useState, FC } from 'react';
import { Link } from 'expo-router';
import { fetchAllExercisesFromTarget, addExercise, addExerciseToPlan,fetchAllExercises } from '@/utils/api/fitness';
import Exercise from '@/utils/interface/exercise';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

interface ExerciseCardProps {
  searchedQuery?: string;
  data?:Exercise[],
  name?:string,
  remove?:(item:Exercise)=>void
  viceVersa?:(item:Exercise)=>void
}

const ExerciseCard: FC<ExerciseCardProps> = ({ searchedQuery = '',data,name,remove,viceVersa }) => {
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<string>('10');
  const [offset, setOffset] = useState<string>('0');


  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        if (searchedQuery) {
          const exercises = await fetchAllExercisesFromTarget(searchedQuery, limit, offset);
          setAllExercises(exercises);
        }else if(data){
          setAllExercises(data)
        }
        else {
          const exercises = await fetchAllExercises(limit, offset);
          setAllExercises(exercises);
        }
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [searchedQuery, limit, offset]);

  return (
    <View className='flex-row justify-center items-center px-4 '>
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
        ) : allExercises.length > 0 ? (
          allExercises.map((item, index) => (
            <Link
              href={{
                pathname: '/exercise/[id]',
                params: { id: item.id, data: JSON.stringify(item) },
              }}
              key={index}
            >
              <View style={{ marginVertical: 10 }} key={index} className='px-8'>
                <Card>
                  <Card.Title title={item.name} subtitle={item.target} />
                  <Card.Cover source={{ uri: `${item.gifUrl}` }} />
                  <Card.Actions>
                    <Button onPress={() => { 
                    if(viceVersa){ 
                      viceVersa(item)
                    }else{
                    addExerciseToPlan(item)
                    }

                      }}> {name==="Plan"?"Move To Saved":"Add To Plan"}</Button>
                    <Button onPress={() => { 
                    if(remove){ 
                      remove(item)
                    }else{
                      addExercise(item)
                    }
                       }}>{name?`Remove From ${name==="Plan"?"Plan":"Saved"}`:"Save For Later"}</Button>
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