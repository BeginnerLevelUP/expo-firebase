
import { View,ScrollView, } from 'react-native';
import { Button,Card,} from 'react-native-paper';
import React,{useEffect, useState} from "react"
import { Link } from 'expo-router';
import { fetchAllMeals } from '@/utils/api/explore';
import Meal from '@/utils/interface/meal';

const ExploreCard = () => {
    const [allMeals, setAllMeals] = useState<Meal[]>([]);
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const meals = await fetchAllMeals();
        setAllMeals(meals);
      } catch (error) {
        console.error('Failed to fetch meals:', error);
      }
    };

    fetchMeals();
  }, []);

  return (
          <ScrollView>
              {allMeals.map((item, index) => (
              <Link href={`/explore/${item.idMeal}`} key={index}>
                  <View className='my-4' key={index}>
                      <Card>
                        <Card.Title title={item.strMeal} subtitle={item.strArea} />
                        <Card.Cover source={{ uri: `${item.strMealThumb}` }} />
                        <Card.Actions>
                          <Button>Add To Plan</Button>
                          <Button>Save To Favorites</Button>
                        </Card.Actions>
                      </Card>
                  </View>
            </Link>
                    ))}
          </ScrollView>
  )
}

export default ExploreCard