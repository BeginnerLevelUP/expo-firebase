import { View,Text,SafeAreaView,ScrollView } from "react-native"
import auth from "@react-native-firebase/auth"
import database from '@react-native-firebase/database';
import { Link } from "expo-router"
import { Chip } from 'react-native-paper';
import ExerciseCard from "@/components/ExerciseCard";
import ExploreCard from "@/components/ExploreCard";
import { useState,useEffect } from "react";
import Meal from "@/utils/interface/meal";
import Exercise from "@/utils/interface/exercise";
import { removeMealFromPlan,addMealToSaved } from "@/utils/api/explore";
import { removeExerciseFromPlan,addExercise } from "@/utils/api/fitness";
const Plan = () => {
  const currentUser=auth().currentUser
  const [activeMeal,setMealActive]=useState<Boolean>(true)
  const [activeExercise,setExerciseActive]=useState<Boolean>(false)
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
    <SafeAreaView className="flex justify-center items-center m-6">
        <View className="flex flex-row mt-16">
          <Text className="my-auto  mr-16 font-bold border border-black p-2 bg-violet-400 text-white rounded-md ">Current Calorie Goal : </Text>
          <Chip icon={activeMeal?"food-drumstick":"food-drumstick-off"} onPress={() => {setMealActive(!activeMeal); setExerciseActive(!activeExercise)}}>Meal</Chip>
         <Chip  icon={activeExercise?"fire":"fire-off"} onPress={() => {setExerciseActive(!activeExercise);setMealActive(!activeMeal)}}>Exercise</Chip>
        </View>
                <View className="my-2">
          {
            (!meals || !exercises) ? (
              <Chip icon={"alert-circle"}>None Found,Here Try Some Suggestions</Chip>
            ) : null
          }
        </View>
         <View>
         {
          activeExercise?(
            <ExerciseCard data={exercises} name="Plan" remove={removeExerciseFromPlan} viceVersa={addExercise} ></ExerciseCard>
          ):(
         <ExploreCard data={meals} name="Plan" remove={removeMealFromPlan} viceVersa={addMealToSaved}></ExploreCard>
          )
         }
         </View>


    </SafeAreaView>
  )
}

export default Plan
