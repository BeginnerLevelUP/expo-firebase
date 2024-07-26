import { View,Text,SafeAreaView } from "react-native"
import { PaperProvider,List,Icon } from "react-native-paper"
import { useState } from "react"
export default function CalendarPage(){
    const cards = [1, 2, 3,4,5,6,7]; //placeholder
  const [expanded, setExpanded] =useState(true);
  const handlePress = () => setExpanded(!expanded);
    return(
        <PaperProvider>
             <SafeAreaView className='flex-1 justify-start items-center h-screen w-screen'> 
                <View className="w-full px-8 ">
                    <List.Section title="Week">
                    {cards.map((item, index) => (
                    <View className="my-3">
                        <List.Accordion
                        key={index}
                        title="Uncontrolled Accordion"
                        left={props => <List.Icon {...props} icon="folder" />}
                        >
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                        </List.Accordion>
                    </View>
                    ))}
                    </List.Section>
                </View>
                <View className="flex flex-row justify-between px-8 w-full">
                    <Icon
                        source="arrow-left-circle"
                        size={20}
                    /> 
                    <Icon
                        source="arrow-right-circle"
                        size={20}
                    />                     
                </View>
            </SafeAreaView>
        </PaperProvider>
    )
}