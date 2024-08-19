import { useSession } from '../../../utils/auth/auth';
import { Text, View,ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import auth from "@react-native-firebase/auth"
import { Icon } from 'react-native-paper';
import HomeCardExercise from '@/components/HomeCardExercise';
import HomeCardMeal from '@/components/HomeCardMeal';
import { useState,useEffect } from 'react';
import Meal from '@/utils/interface/meal';
import database from '@react-native-firebase/database';
import Exercise from '@/utils/interface/exercise';
export default function HomeScreen() {
  const {session } = useSession();
  const user=JSON.parse(session)
  const currentUser=auth().currentUser
  // const [activeMeal,setMealActive]=useState<Boolean>(true)
  // const [activeExercise,setExerciseActive]=useState<Boolean>(false)
  const[meals,setMeals]=useState<Meal[]>()
  const[exercises,setExercises]=useState<Exercise[]>()
  useEffect(() => {
  const onValueChange = database()
    .ref(`/users/${currentUser?.uid}`)
    .on('value', snapshot => {
      const data = snapshot.val();
      if (data && data.plan) {
        const mealPlan = data.plan.meals;
        const exercisePlan = data.plan.exercises;
        
        // Process meals
        if (mealPlan) {
          const mealArray = Object.values(mealPlan) as Meal[];
          setMeals(mealArray);
        }
        
        // Process exercises
        if (exercisePlan) {
          const exerciseArray = Object.values(exercisePlan)  as Exercise[];
          setExercises(exerciseArray);
        }
      }
    });

  return () => database().ref(`/users/${currentUser?.uid}`).off('value', onValueChange);
}, [currentUser]);
  return (
    <ScrollView> 
    <View  className='flex-1 justify-center items-center h-screen w-screen'>
      {/* Header */}
      <View className='mt-4'>
      <Text>Welcome Back <Text className='font-bold'>{currentUser?.displayName || currentUser?.email}</Text></Text>
      <View className='mx-auto my-8'>
        {/* Background */}
        <Svg width="127" height="123" viewBox="0 0 127 123" fill="none">
          <Path d="M127 61.5C127 95.4655 98.5701 123 63.5 123C28.4299 123 0 95.4655 0 61.5C0 27.5345 28.4299 0 63.5 0C98.5701 0 127 27.5345 127 61.5Z" fill="#BC0F0F"/>
        </Svg>
      </View>

      <View className='mx-auto  z-10 relative bottom-[10rem]'>
        {/* Burnt */}
          <Icon
            source="fire"
            size={100}
          />
      </View>

      </View>



      {/* Goal */}
      <HomeCardExercise userPlannedExercies={exercises||[]}></HomeCardExercise>

      {/* Meal */}
        <HomeCardMeal userPlannedMeals={meals||[]}></HomeCardMeal>
    </View>
    </ScrollView>

  );
}

