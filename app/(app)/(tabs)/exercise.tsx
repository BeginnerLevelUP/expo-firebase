import React, { useEffect,useState } from "react";
import { View,ScrollView,FlatList,SafeAreaView} from "react-native";
import { Avatar, Button, Card,Text } from 'react-native-paper';
import { fetchAllExercises,targets } from "@/utils/api/fitness";
import Exercise from "@/utils/interface/exercise";
import Target from "@/utils/interface/target";
import ExerciseCard from "@/components/ExerciseCard";
export default function ExercisePage() {
    const [targetList,setTargetList]=useState<Target[]>([])
    const [allExercies,setExercies]=useState<Exercise[]>([])
    useEffect(() => {
        const initalize = async () => {
            setTargetList(targets);
            setExercies(await fetchAllExercises())
        };
        initalize();
    }, []);
    return (
        <>
        <SafeAreaView className=" flex-1 justify-center items-center w-screen h-screen">

            <ScrollView className=" w-full h-1/3" horizontal>
            {
                targetList.length>0?
                targetList.map((target,index)=>(
            <View className="mx-2 w-fit" key={index}>
            <Card>
                <Card.Title  title={target.name.toLocaleUpperCase()} />
                <Card.Cover source={{ uri: target.gifUrl }} />
            </Card>
            </View>

                )):
                (
                <Text>No Data Please Refresh</Text>
                )
            }
            </ScrollView>
            <View className="w-full h-2/3">
                <ExerciseCard></ExerciseCard>
            </View>


        </SafeAreaView>

        
        </>

        
    );
}