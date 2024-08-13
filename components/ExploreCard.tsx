import { View, ScrollView, Text } from 'react-native';
import { Button, Card, ActivityIndicator } from 'react-native-paper';
import React, { useEffect, useState, FC } from 'react';
import { Link } from 'expo-router';
import { fetchAllMeals, addMealToSaved, addMealToPlan } from '@/utils/api/explore';
import Meal from '@/utils/interface/meal';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface ExploreCardProps {
  searchedQuery?: string;
  //used for plan/saved pages
  data?:Meal[],
  name?:string,
  remove?:(item:Meal)=>void,
  viceVersa?:(item:Meal)=>void
}

const ExploreCard: FC<ExploreCardProps> = ({ searchedQuery = '',data,name,remove,viceVersa }) => {
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Start with loading as true

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        if (data){
          setAllMeals(data)
        }else{
        const meals = await fetchAllMeals();
        setAllMeals(meals);
        }

      } catch (error) {
        console.error('Failed to fetch meals:', error);
      } finally {
        setLoading(false); // Set loading to false in finally block to ensure it runs after data fetching
      }
    };

    fetchMeals();
  }, [data]);

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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : filteredMeals.length > 0 ? (
        filteredMeals.map((item, index) => (
          <Link
            href={{
              pathname: '/explore/[id]',
              params: { id: item.idMeal, data: JSON.stringify(item) },
            }}
            key={index}
          >
            <View style={{ marginVertical: 10 }} key={index}>
              <Card>
                <Card.Title title={item.strMeal} subtitle={item.strArea} />
                <Card.Cover source={{ uri: `${item.strMealThumb}` }} />
                <Card.Actions>
                  <Button onPress={() => { 
                    if(viceVersa){ 
                      viceVersa(item)
                    }else{
                    addMealToPlan(item)
                    }

                     }}>{name==="Plan"?"Move To Saved":"Add To Plan"}</Button>
                  <Button onPress={() => {
                    if(remove){
                      remove(item)
                    }else{
                     addMealToSaved(item) 
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
  );
};

export default ExploreCard;