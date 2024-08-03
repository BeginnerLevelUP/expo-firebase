import { View, ScrollView,Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import React, { useEffect, useState,FC} from "react";
import { Link } from 'expo-router';
import { fetchAllMeals,addMealToSaved,addMealToPlan } from '@/utils/api/explore';
import Meal from '@/utils/interface/meal';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
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
  {filteredMeals.length > 0 ? (
    filteredMeals.map((item, index) => (
      <Link
        href={{
          pathname: '/explore/[id]',
          params: { id: item.idMeal, data: JSON.stringify(item) },
        }}
        key={index}
      >
        <View className='my-4' key={index}>
          <Card>
            <Card.Title title={item.strMeal} subtitle={item.strArea} />
            <Card.Cover source={{ uri: `${item.strMealThumb}` }} />
            <Card.Actions>
              <Button onPress={()=>{addMealToPlan(item)}} >Add To Plan</Button>
              <Button  onPress={()=>{addMealToSaved(item)}}>Save For Later</Button>
            </Card.Actions>
          </Card>
        </View>
      </Link>
    ))
  ) : (
    <View className='flex justify-center items-center my-10'>
    <Text className='font-bold text-4xl'>No results found</Text>   
    <FontAwesome5 name="sad-cry" size={24} color="black" /> 
    </View>

  )}
</ScrollView>
  );
};

export default ExploreCard;