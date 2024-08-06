import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { fetchAllExercises } from "@/utils/api/fitness";

export default function ExercisePage() {
    useEffect(() => {
        fetchAllExercises();
    }, []);

    return (
        <View className="flex justify-center items-center">
            <Text>Exercise</Text>
        </View>
    );
}