import Ionicons from '@expo/vector-icons/Ionicons';
import { View,Text,ScrollView,SafeAreaView } from 'react-native';
import { Button, Menu, Divider, Searchbar,Avatar, Card,} from 'react-native-paper';
import React,{useState} from "react"
import { AntDesign } from '@expo/vector-icons';
import ExploreCard from '@/components/Card';

import { fetchAllMeals } from '@/utils/api/explore';

export default function TabTwoScreen() {
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [search,setSearch]=useState(false)
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (

        <SafeAreaView className='flex-1 justify-center items-center h-screen w-screen'> 
          {/* Nav */}
          <View className='flex flex-col justify-between w-full px-8'>
            <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={()=>{setSearch(true)}}
            />
          <View className='flex flex-row justify-center items-center mt-4'>
            <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}><Text className='text-black font-bold'>Filter</Text><AntDesign name="filter" size={24} color="black"/></Button>}>
            <Menu.Item onPress={() => {}} title="High Protien" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Low Calories" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Vegan" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Keto" />
          </Menu>
          <Text>Recommened Or The Search Query</Text>
          </View>

          </View>
          {/* Body */}
          {
            search?(
          <ExploreCard searchedQuery={searchQuery}></ExploreCard>
            ):(
          <ExploreCard></ExploreCard>
            )
          }


      </SafeAreaView> 

  );
}
