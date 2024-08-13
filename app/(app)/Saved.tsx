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
import { removeMealFromSaved,addMealToPlan } from "@/utils/api/explore";
import { removeExercise,addExerciseToPlan } from "@/utils/api/fitness";
const Saved = () => {
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
      if (data && data.saved) {
        const mealPlan = data.saved.meals;
        const exercisePlan = data.saved.exercises;
        
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
          <Chip icon={activeMeal?"food-drumstick":"food-drumstick-off"} onPress={() => {setMealActive(!activeMeal); setExerciseActive(!activeExercise)}}>Meal</Chip>
         <Chip  icon={activeExercise?"fire":"fire-off"} onPress={() => {setExerciseActive(!activeExercise);setMealActive(!activeMeal)}}>Exercise</Chip>
        </View>
         <View>
         {
          activeExercise?(
            <>
                <View className="my-2">
          {
            (!exercises) ? (
              <Chip icon={"alert-circle"}>No Exercies Found,Here Try Some Suggestions</Chip>
            ) : null
          }
        </View>
            <ExerciseCard data={exercises} name="Saved" remove={removeExercise} viceVersa={addExerciseToPlan} ></ExerciseCard>
            </>
          ):(
            <>
            <View className="my-2">
                      {
                        (!meals ) ? (
                          <Chip icon={"alert-circle"}>No Meal Found,Here Try Some Suggestions</Chip>
                        ) : null
                      }
             </View>
         <ExploreCard data={meals} name="Saved" remove={removeMealFromSaved} viceVersa={addMealToPlan}></ExploreCard>
         </>
          )
         }
         </View>


    </SafeAreaView>
  )
}

export default Saved
