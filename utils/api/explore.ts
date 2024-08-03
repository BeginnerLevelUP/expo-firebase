const baseUrl = `https://www.themealdb.com/api/json/v1/1/`;
import auth from "@react-native-firebase/auth"
import db from "@react-native-firebase/database"
import { Alert } from "react-native";
import Meal from "../interface/meal";
const currentUser=auth().currentUser
// Add Meal
export const addMealToSaved = async (meal: Meal) => {
  if (!currentUser) {
    Alert.alert("No user is currently logged in.");
    return;
  }
  try {
    const mealsRef = db().ref(`/users/${currentUser.uid}/saved/meals`);
    const snapshot = await mealsRef.orderByChild('idMeal').equalTo(meal.idMeal).once('value');
    
    if (snapshot.exists()) {
      Alert.alert("Meal already saved.");
      return;
    }
    // Update the saved meals with the new meal
    mealsRef.push(meal);
    Alert.alert("Meal Saved For Later");
  } catch (e) {
    Alert.alert(`Error Adding Meal to Saved: ${e instanceof Error ? e.message : 'Unknown Error'}`);
  }
};
// Remove Meal
export const removeMealFromSaved = async (meal:Meal) => {
if (!currentUser) {
    Alert.alert("No user is currently logged in.");
    return;
  }
  try {
    const mealsRef = db().ref(`/users/${currentUser.uid}/saved/meals`);
    
    // Find the meal by its id
    const snapshot = await mealsRef.orderByChild('idMeal').equalTo(meal.idMeal).once('value');
    
    if (!snapshot.exists()) {
      Alert.alert("Meal Not Found.");
      return;
    }
    
    // Loop through the results (should only be one) and remove it
    snapshot.forEach((childSnapshot) => {
      childSnapshot.ref.remove();
      return true
    });

    Alert.alert("Meal Removed Successfully");
  } catch (e) {
    Alert.alert(`Error Removing Meal: ${e instanceof Error ? e.message : 'Unknown Error'}`);
  }
}

// Add Meal To Plan
export const addMealToPlan = async (meal:Meal) => {
  if (!currentUser) {
    Alert.alert("No user is currently logged in.");
    return;
  }
  try {
    const mealsRef = db().ref(`/users/${currentUser.uid}/plan/meals`);
    const snapshot = await mealsRef.orderByChild('idMeal').equalTo(meal.idMeal).once('value');
    
    if (snapshot.exists()) {
      Alert.alert("Meal Already In Plan.");
      return;
    }
    // Update the saved meals with the new meal
    mealsRef.push(meal);
    Alert.alert("Meal Added To Plan");
  } catch (e) {
    Alert.alert(`Error Adding Meal to Saved: ${e instanceof Error ? e.message : 'Unknown Error'}`);
  }
}

// Remove Meal From Plan
export const removeMealFromPlan = async (meal:Meal) => {
if (!currentUser) {
    Alert.alert("No user is currently logged in.");
    return;
  }
  try {
    const mealsRef = db().ref(`/users/${currentUser.uid}/plan/meals`);
    
    // Find the meal by its id
    const snapshot = await mealsRef.orderByChild('idMeal').equalTo(meal.idMeal).once('value');
    
    if (!snapshot.exists()) {
      Alert.alert("Meal Not Found.");
      return;
    }
    
    // Loop through the results (should only be one) and remove it
    snapshot.forEach((childSnapshot) => {
      childSnapshot.ref.remove();
      return true
    });

    Alert.alert("Meal Removed Successfully");
  } catch (e) {
    Alert.alert(`Error Removing Meal: ${e instanceof Error ? e.message : 'Unknown Error'}`);
  }
}

// Fetch All Meals
export const fetchAllMeals = async () => {
    const allMealUrl = `${baseUrl}search.php?s=`
    try {
        const request=await fetch(allMealUrl,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const response=await request.json()
        return response?.meals
    } catch (e) {
        Alert.alert(`Error Fetching All Meals: ${e instanceof Error ? e.message : 'Unknown Error'}`)
    }
}

// Get Catergories
export const getCategories = async () => {
    const allMealUrl = `${baseUrl}list.php?c=list`;
    try {
        const request = await fetch(allMealUrl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await request.json();
        return response.meals;
    } catch (e) {
        Alert.alert(`Error Getting All Categories: ${e instanceof Error ? e.message : 'Unknown Error'}`);
    }
}
//Get Areas
export const getAreas = async () => {
    const allMealUrl = `${baseUrl}list.php?a=list`;
    try {
        const request = await fetch(allMealUrl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await request.json();

        return response.meals;
    } catch (e) {
        Alert.alert(`Error Getting All Categories: ${e instanceof Error ? e.message : 'Unknown Error'}`);
    }
}
//Get Ingredients
export const getIngredients = async () => {
    const allMealUrl = `${baseUrl}list.php?i=list`;
    try {
        const request = await fetch(allMealUrl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await request.json();
        return response.meals;
    } catch (e) {
        Alert.alert(`Error Getting All Categories: ${e instanceof Error ? e.message : 'Unknown Error'}`);
    }
}