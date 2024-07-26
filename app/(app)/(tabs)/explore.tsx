import Ionicons from '@expo/vector-icons/Ionicons';
import { View,Text,ScrollView,SafeAreaView } from 'react-native';
import { Button, Menu, Divider, Searchbar,Avatar, Card,} from 'react-native-paper';
import React,{useState} from "react"
import { AntDesign } from '@expo/vector-icons';
export default function TabTwoScreen() {
  const cards = [1, 2, 3]; //placeholder
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
          <ScrollView>
              {cards.map((item, index) => (
                  <View className='my-4' key={index}>
                      <Card>
                        <Card.Title title="Item" subtitle="Item Subtitle" />
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Actions>
                          <Button>Add To Plan</Button>
                          <Button>Save To Favorites</Button>
                        </Card.Actions>
                      </Card>
                  </View>

                    ))}
          </ScrollView>

      </SafeAreaView> 

  );
}
