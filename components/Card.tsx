
import Ionicons from '@expo/vector-icons/Ionicons';
import { View,Text,ScrollView,SafeAreaView } from 'react-native';
import { Button, Menu, Divider, Searchbar,Avatar, Card,} from 'react-native-paper';
import React,{useState} from "react"
const ExploreCard = () => {
    const cards = [1, 2, 3]; //placeholder
  return (
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
  )
}

export default ExploreCard