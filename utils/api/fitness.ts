const baseUrl = `https://exercisedb.p.rapidapi.com/`;
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
  const url = `${baseUrl}exercises?limit=10&offset=0`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key':"abf298e8cemsha3c126754e2939dp13f108jsnff2904aa1f37",
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
};

// // Filter
// export const filterExercises = async () => {
//   // Implementation goes here
// };
