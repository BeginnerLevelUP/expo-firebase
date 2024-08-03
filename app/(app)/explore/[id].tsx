
import { View,ScrollView,Text,StyleSheet,Image} from 'react-native';
import React,{useEffect, useState} from "react"
import { Button } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import Meal from '@/utils/interface/meal';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const SingleMeal = () => {
     const { id,data } = useLocalSearchParams();
     const item = data ? JSON.parse(data as string) : null;
    const [meal, setMeal] = useState<Meal>();
  useEffect(() => {
    setMeal(item)
  }, []);

  return (
          <ScrollView>
            {meal?
            (
                  <View className='my-4' key={meal?.idMeal}>
                          <Text>{meal.strMeal}</Text>
                          <Text>{meal.strArea}</Text>
                          <Button>Add To Plan</Button>
                          <Button>Save For Later</Button>
                          <Image
                            className='w-1/2 h-full'
                            source={{ uri: meal.strMealThumb }}
                            resizeMode="cover" // or "contain", "stretch"
                          />
                  </View>
            ):(
                <Text>Error Fetching Meal</Text>
            )}


          </ScrollView>
  )
}

export default SingleMeal

