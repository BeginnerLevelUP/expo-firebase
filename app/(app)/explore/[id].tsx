
import { View,ScrollView,Text } from 'react-native';
import { Button,Card,} from 'react-native-paper';
import React,{useEffect, useState} from "react"
import { useLocalSearchParams } from 'expo-router';
import { fetchMealById } from '@/utils/api/explore';
import Meal from '@/utils/interface/meal';

const SingleMeal = () => {
     const { id } = useLocalSearchParams();
    const [meal, setMeal] = useState<Meal>();
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const meal = await fetchMealById(id as string);
        setMeal(meal);
      } catch (error) {
        console.error('Failed to fetch meals:', error);
      }
    };

    fetchMeals();
  }, []);

  return (
          <ScrollView>
            {meal?
            (
                  <View className='my-4' key={meal?.idMeal}>
                      <Card>
                        <Card.Title title={meal?.strMeal} subtitle={meal?.strArea} />
                        <Card.Cover source={{ uri: `${meal?.strMealThumb}` }} />
                        <Card.Actions>
                          <Button>Add ddddd To Plan</Button>
                          <Button>Save To Favorites</Button>
                        </Card.Actions>
                      </Card>
                  </View>
            ):(
                <Text>Error Fetching Meal</Text>
            )}


          </ScrollView>
  )
}

export default SingleMeal