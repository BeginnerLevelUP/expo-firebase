const baseUrl = `https://www.themealdb.com/api/json/v1/1/`;


// Add Meal
export const addMealToFavorites = async () => {
    try {
        // Code to add meal to favorites goes here
    } catch (e) {
        console.log(`Error Adding Meal to Favorites: ${e instanceof Error ? e.message : 'Unknown Error'}`)
    }
}

// Remove Meal
export const removeMealFromFavorites = async () => {
    try {
        // Code to remove meal from favorites goes here
    } catch (e) {
        console.log(`Error Removing Meal from Favorites: ${e instanceof Error ? e.message : 'Unknown Error'}`)
    }
}

// Add Meal To Plan
export const addMealToPlan = async () => {
    try {
        // Code to add meal to plan goes here
    } catch (e) {
        console.log(`Error Adding Meal to Plan: ${e instanceof Error ? e.message : 'Unknown Error'}`)
    }
}

// Remove Meal From Plan
export const removeMealFromPlan = async () => {
    try {
        // Code to remove meal from plan goes here
    } catch (e) {
        console.log(`Error Removing Meal from Plan: ${e instanceof Error ? e.message : 'Unknown Error'}`)
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
        console.log(`Error Fetching All Meals: ${e instanceof Error ? e.message : 'Unknown Error'}`)
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
        console.log(`Error Getting All Categories: ${e instanceof Error ? e.message : 'Unknown Error'}`);
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
        console.log(`Error Getting All Categories: ${e instanceof Error ? e.message : 'Unknown Error'}`);
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
        console.log(`Error Getting All Categories: ${e instanceof Error ? e.message : 'Unknown Error'}`);
    }
}