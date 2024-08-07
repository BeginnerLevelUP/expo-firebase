const baseUrl = `https://exercisedb.p.rapidapi.com/`;
const queryParam=`?limit=0`
import auth from "@react-native-firebase/auth"
import db from "@react-native-firebase/database"
import { Alert } from "react-native";
import Exercise from "../interface/exercise";
const currentUser=auth().currentUser


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