import auth from "@react-native-firebase/auth"
import db from "@react-native-firebase/database"
import { Alert } from "react-native";
import Exercise from "../interface/exercise";
import Target from "../interface/target";
const currentUser=auth().currentUser
const baseUrl = `https://exercisedb.p.rapidapi.com/`;
export const targets: Target[] = [
    { name: "abductors", gifUrl: "https://v2.exercisedb.io/image/NMgaKpcwOmh3yi" },
    { name: "abs", gifUrl: "https://v2.exercisedb.io/image/uTduYYQcXCWcO6" },
    { name: "adductors", gifUrl: "https://v2.exercisedb.io/image/Vbz511qJx0LgRf" },
    { name: "biceps", gifUrl: "https://v2.exercisedb.io/image/tDf3kNjU-ak-v4" },
    { name: "calves", gifUrl: "https://v2.exercisedb.io/image/28k0e17IbOadhN" },
    { name: "cardiovascular system", gifUrl: "https://v2.exercisedb.io/image/OS51PjG6OaMp-k" },
    { name: "delts", gifUrl: "https://v2.exercisedb.io/image/MgQl7PTiD9vb1n" },
    { name: "forearms", gifUrl: "https://v2.exercisedb.io/image/BVsnehjevTbQe0" },
    { name: "glutes", gifUrl: "https://v2.exercisedb.io/image/xaCgVtHvByx2bu" },
    { name: "hamstrings", gifUrl: "https://v2.exercisedb.io/image/euB3Kgar2c0aTM" },
    { name: "lats", gifUrl: "https://v2.exercisedb.io/image/XQve2kj6CZXPc5"},
    { name: "levator scapulae", gifUrl: "https://v2.exercisedb.io/image/NJj9HPo7aZ-sfN" },
    { name: "pectorals", gifUrl: "https://v2.exercisedb.io/image/OjdZWSiJhBHQbJ" },
    { name: "quads", gifUrl: "https://v2.exercisedb.io/image/21jlRSfFSRenni" },
    { name: "serratus anterior", gifUrl: "https://v2.exercisedb.io/image/AH0I82lf-AwMOf" },
    { name: "spine", gifUrl: "https://v2.exercisedb.io/image/Dz3yddKd4Xrq-H" },
    { name: "traps", gifUrl: "https://v2.exercisedb.io/image/QQLIxlseLIcizJ" },
    { name: "triceps", gifUrl: "https://v2.exercisedb.io/image/leldQO-DQOQxRo" },
    { name: "upper back", gifUrl: "https://v2.exercisedb.io/image/uFDgyqhxNWYHPI" }
];
// Add Exercise
export const addExercise = async (exercise:Exercise) => {
  if (!currentUser) {
    Alert.alert("No user is currently logged in.");
    return;
  }
  try {
    const exercisesRef = db().ref(`/users/${currentUser.uid}/saved/exercises`);
    const snapshot = await exercisesRef.orderByChild('id').equalTo(exercise.id).once('value');
    
    if (snapshot.exists()) {
      Alert.alert("Exercise already saved.");
      return;
    }
    // Update the saved Exercise with the new exercise
    exercisesRef.push(exercise);
    Alert.alert("Exerice Saved For Later");
  } catch (e) {
    Alert.alert(`Error Adding Exercise to Saved: ${e instanceof Error ? e.message : 'Unknown Error'}`);
  }
};

// Remove Exercise
export const removeExercise = async (exercise:Exercise)  => {
 if (!currentUser) {
    Alert.alert("No user is currently logged in.");
    return;
  }
  try {
    const exercisesRef = db().ref(`/users/${currentUser.uid}/saved/exercises`);
    
    // Find the Exercise by its id
    const snapshot = await exercisesRef.orderByChild('id').equalTo(exercise.id).once('value');
    
    if (!snapshot.exists()) {
      Alert.alert("Exercise Not Found.");
      return;
    }
    
    // Loop through the results (should only be one) and remove it
    snapshot.forEach((childSnapshot) => {
      childSnapshot.ref.remove();
      return true
    });

    Alert.alert("Exercise Removed Successfully");
  } catch (e) {
    Alert.alert(`Error Removing Exercise: ${e instanceof Error ? e.message : 'Unknown Error'}`);
  }
}


// Add Exercise To Plan
export const addExerciseToPlan = async (exercise:Exercise)  => {
  if (!currentUser) {
    Alert.alert("No user is currently logged in.");
    return;
  }
  try {
    const exercisesRef = db().ref(`/users/${currentUser.uid}/plan/exercises`);
    const snapshot = await exercisesRef.orderByChild('id').equalTo(exercise.id).once('value');
    
    if (snapshot.exists()) {
      Alert.alert("Exercise Already In Plan.");
      return;
    }
    // Update the saved exerciess with the new exericse
    exercisesRef.push(exercise);
    Alert.alert("Exercise Added To Plan");
  } catch (e) {
    Alert.alert(`Error Adding Exercise to Saved: ${e instanceof Error ? e.message : 'Unknown Error'}`);
  }
};

// Remove Exercise From Plan
export const removeExerciseFromPlan = async (exercise:Exercise)  => {
 if (!currentUser) {
    Alert.alert("No user is currently logged in.");
    return;
  }
  try {
    const exercisesRef = db().ref(`/users/${currentUser.uid}/plan/exercises`);
    
    // Find the Exercise by its id
    const snapshot = await exercisesRef.orderByChild('id').equalTo(exercise.id).once('value');
    
    if (!snapshot.exists()) {
      Alert.alert("Exercise Not Found.");
      return;
    }
    
    // Loop through the results (should only be one) and remove it
    snapshot.forEach((childSnapshot) => {
      childSnapshot.ref.remove();
      return true
    });

    Alert.alert("Exercise Removed Successfully");
  } catch (e) {
    Alert.alert(`Error Removing Exercise: ${e instanceof Error ? e.message : 'Unknown Error'}`);
  }
};

// // Fetch All Exercises
export const fetchAllExercises = async (limit:string='10',offset:string='0') => {
const url = `${baseUrl}exercises?limit=${limit}&offset=${offset}`;
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