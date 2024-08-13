import Ionicons from '@expo/vector-icons/Ionicons';
import { View,Text,SafeAreaView } from 'react-native';
import { Button, Menu, Searchbar,} from 'react-native-paper';
import React,{useState,useEffect} from "react"
import { AntDesign } from '@expo/vector-icons';
import { getCategories,getAreas,getIngredients } from '@/utils/api/explore';
import ExploreCard from '@/components/ExploreCard';
import Meal from '@/utils/interface/meal';
export default function TabTwoScreen() {
  const [visibleArea, setAreaVisible] = useState(false);
  const [visibleCatergory, setCatergoryVisible] = useState(false);
  const [visibleIngredient, setIngredientVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState(false);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await getCategories();
      const fetchedAreas = await getAreas();
      const fetchedIngredients = await getIngredients();
      setCategories(fetchedCategories);
      setAreas(fetchedAreas);
      setIngredients(fetchedIngredients);
    };
    fetchData();
  }, []);

  const openAreaMenu = () => setAreaVisible(true);
  const closeAreaMenu = () => setAreaVisible(false);
  const openCatergoryMenu = () => setCatergoryVisible(true);
  const closeCatergoryMenu = () => setCatergoryVisible(false);
  const openIngredientMenu = () => setIngredientVisible(true);
  const closeIngredientMenu = () => setIngredientVisible(false);
  return (
    <SafeAreaView className='flex-1 justify-center items-center h-screen w-screen'>
      {/* Nav */}
      <View className='flex flex-col justify-between w-full px-8'>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={() => { setSearch(true); }}
        />
        <View className='flex flex-row justify-center items-center mt-4'>
          
          {/* Category */}
          <Menu
            visible={visibleCatergory}
            onDismiss={closeCatergoryMenu}
            anchor={
              <Button onPress={openCatergoryMenu}>
                <Text className='text-black font-bold'>Category</Text>
                <AntDesign name="filter" size={24} color="black" />
              </Button>
            }
          >
            {categories.map((category:Meal,index) => (
              <Menu.Item key={index} onPress={() => {setSearchQuery(category.strCategory); setSearch(true)}} title={category.strCategory} />
            ))}
          </Menu>

          {/* Area */}
          <Menu
            visible={visibleArea}
            onDismiss={closeAreaMenu}
            anchor={
              <Button onPress={openAreaMenu}>
                <Text className='text-black font-bold'> Area</Text>
                <AntDesign name="filter" size={24} color="black" />
              </Button>
            }
          >
            {areas.map((area:Meal,index) => (
              <Menu.Item key={index} onPress={() => {setSearchQuery(area.strArea); setSearch(true)}} title={area.strArea} />
            ))}
          </Menu>

          {/* Ingredient */}
          <Menu
            visible={visibleIngredient}
            onDismiss={closeIngredientMenu}
            anchor={
              <Button onPress={openIngredientMenu}>
                <Text className='text-black font-bold'> Ingredient</Text>
                <AntDesign name="filter" size={24} color="black" />
              </Button>
            }
          >
            {ingredients.map((ingredient:Meal,index) => (
              <Menu.Item key={index} onPress={() => {setSearchQuery(ingredient.strIngredient); setSearch(true)}}title={ingredient.strIngredient} />
            ))}
          </Menu>

        </View>
      </View>
      {/* Body */}
      {search ? (
        <ExploreCard searchedQuery={searchQuery}></ExploreCard>
      ) : (
        <ExploreCard></ExploreCard>
      )}
    </SafeAreaView>
  );
}