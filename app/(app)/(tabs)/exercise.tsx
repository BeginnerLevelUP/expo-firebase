import React, { useEffect,useState } from "react";
import { View,ScrollView,FlatList,SafeAreaView} from "react-native";
import { Avatar, Button, Card,Text } from 'react-native-paper';
import { fetchAllExercises,fetchTargetList } from "@/utils/api/fitness";
import Exercise from "@/utils/interface/exercise";
import ExerciseCard from "@/components/ExerciseCard";
export default function ExercisePage() {
    const [targetList,setTargetList]=useState<string[]>([])
    const [allExercies,setExercies]=useState<Exercise[]>([])
    useEffect(() => {
        const initalize = async () => {
            setTargetList(await fetchTargetList());
            setExercies(await fetchAllExercises())
        };
        initalize();
    }, []);
    return (
        <>
        <SafeAreaView className="flex-1 justify-center items-center">

            <ScrollView className="w-screen px-4 " horizontal>
            {
                targetList.length>0?
                targetList.map((target,index)=>(
            <View className="p-4 w-1/12" key={index}>
            <Card>
                <Card.Title className="text-center" title={target.toLocaleUpperCase()} />
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            </Card>
            </View>

                )):
                (
                <Text>No Data Please Refresh</Text>
                )
            }
            </ScrollView>
            <ExerciseCard></ExerciseCard>
        </SafeAreaView>

        
        </>

        
    );
}