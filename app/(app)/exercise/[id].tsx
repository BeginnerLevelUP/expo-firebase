
import { View,ScrollView,Text,Image} from 'react-native';
import React,{useEffect, useState} from "react"
import { Button } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import Exercise from '@/utils/interface/exercise';

const Singleexercise = () => {
     const { id,data } = useLocalSearchParams();
     const item = data ? JSON.parse(data as string) : null;
    const [exercise, setexercise] = useState<Exercise>();
  useEffect(() => {
    setexercise(item)
  }, []);

  return (
          <ScrollView>
            {exercise?
            (
                  <View className='my-4' key={exercise?.id}>
                          <Text>{exercise.name}</Text>
                          <Text>{exercise.target}</Text>
                          <Button>Add To Plan</Button>
                          <Button>Save For Later</Button>
                          <Image
                            className='w-1/2 h-full'
                            source={{ uri: exercise.gifUrl }}
                            resizeMode="cover" 
                          />
                  </View>
            ):(
                <Text>Error Fetching exercise</Text>
            )}


          </ScrollView>
  )
}

export default Singleexercise

