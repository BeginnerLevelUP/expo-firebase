const baseUrl = `https://www.themealdb.com/api/json/v1/1/`;

// Search Meal
export const fetchMealBySearch = async () => {
    try {

    } catch (e) {
        console.log(`Error Searching for Meal: ${e instanceof Error ? e.message : 'Unknown Error'}`)
    }
}

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

// Fetch Meal From Id
export const fetchMealById = async (id:string) => {
    const allMealUrl = `${baseUrl}lookup.php?i=${id}`
    try {
        const request=await fetch(allMealUrl,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const response=await request.json()
        return response?.meals[0]
    } catch (e) {
        console.log(`Error Fetching  Meal: ${e instanceof Error ? e.message : 'Unknown Error'}`)
    }
}

// Filter Meals
export const filterMeals = async () => {
    try {
        // Code to filter meals goes here
    } catch (e) {
        console.log(`Error Filtering Meals: ${e instanceof Error ? e.message : 'Unknown Error'}`)
    }
}

