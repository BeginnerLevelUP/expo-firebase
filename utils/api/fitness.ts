const baseUrl = `https://exercisedb.p.rapidapi.com/`;
const queryParam=`?limit=0`
import auth from "@react-native-firebase/auth"
import db from "@react-native-firebase/database"
import { Alert } from "react-native";
import Meal from "../interface/meal";
const currentUser=auth().currentUser


// // Add Exercise
// export const addExercise = async () => {
//   // Implementation goes here
// };

// // Remove Exercise
// export const removeExercise = async () => {
//   // Implementation goes here
// };

// // Add Exercise To Plan
// export const addExerciseToPlan = async () => {
//   // Implementation goes here
// };

// // Remove Exercise From Plan
// export const removeExerciseFromPlan = async () => {
//   // Implementation goes here
// };

// // Fetch All Exercises
export const fetchAllExercises = async () => {
const url = `${baseUrl}exercises${queryParam}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key':(process.env['EXPO_PUBLIC_X_Rapidapi_Key']) as string,
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	return result
} catch (error) {
	console.error(error);
}
};

export const fetchTargetList = async () => {
const url = `${baseUrl}exercises/targetList${queryParam}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key':(process.env['EXPO_PUBLIC_X_Rapidapi_Key']) as string,
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	return result
} catch (error) {
	console.error(error);
}
};
// // Filter
// export const filterExercises = async () => {
//   // Implementation goes here
// };