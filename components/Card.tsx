import { View, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import React, { useEffect, useState,FC} from "react";
import { Link } from 'expo-router';
import { fetchAllMeals } from '@/utils/api/explore';
import Meal from '@/utils/interface/meal';

interface ExploreCardProps {
  searchedQuery?: string; 
}

const ExploreCard:FC<ExploreCardProps> = ({ searchedQuery='' }) => {
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

 // Function to check if any property includes the searchedQuery
  const matchesQuery = (meal: Meal, query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    return Object.values(meal).some(value => 
      value && value.toString().toLowerCase().includes(lowerCaseQuery)
    );
  };

  // Filter meals based on searchedQuery
  const filteredMeals = allMeals.filter(meal =>
    matchesQuery(meal, searchedQuery)
  );

  return (
    <ScrollView>
      {filteredMeals.map((item, index) => (
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
  );
};

export default ExploreCard;