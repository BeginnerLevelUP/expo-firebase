import { View,Text,SafeAreaView,ScrollView } from "react-native"
import auth from "@react-native-firebase/auth"
import { Link } from "expo-router"
import { Chip } from 'react-native-paper';
import ExerciseCard from "@/components/ExerciseCard";
import ExploreCard from "@/components/ExploreCard";
import { useState } from "react";
const Plan = () => {
  const currentUser=auth().currentUser
  console.log(currentUser)
  const [activeMeal,setMealActive]=useState<Boolean>(true)
  const [activeExercise,setExerciseActive]=useState<Boolean>(false)
  return (
    <SafeAreaView className="flex justify-center items-center">
        <View className="flex flex-row mt-16">
          <Text>Current Calorie Goal : </Text>
          <Chip icon={activeMeal?"food-drumstick":"food-drumstick-off"} onPress={() => {setMealActive(!activeMeal); setExerciseActive(!activeExercise)}}>Meal</Chip>
         <Chip  icon={activeExercise?"fire":"fire-off"} onPress={() => {setExerciseActive(!activeExercise);setMealActive(!activeMeal)}}>Exercise</Chip>
        </View>
         <View>
         {
          activeExercise?(
            <ExerciseCard></ExerciseCard>
          ):(
         <ExploreCard></ExploreCard>
          )
         }
         </View>


    </SafeAreaView>
  )
}

export default Plan