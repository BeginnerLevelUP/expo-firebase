import { View,Text,SafeAreaView,ScrollView } from "react-native"
import { List,Icon } from "react-native-paper"
import { Link } from "expo-router";
import { useState } from "react"
import moment, { Moment } from "moment"; ;
export default function CalendarPage(){
    const currentDate=moment()//.format('MMMM Do YYYY, h:mm:ss a')

    // Function to determine the icon based on the day
    const handleDate = (day:Moment) => {
        if (day.isAfter(currentDate, 'day')) {
            return {icon:{string:"fire-hydrant",color:'black'},
                     expanded:false}; // Future date
        } else {
            return {icon:{string:"fire",color:'red'},expanded:undefined}; // Past or present date
        }
    };

    // Create an array of objects for the 7 days of the week
    const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
        const day = moment().startOf('week').add(i, 'days');
        const dateFunc=handleDate(day)
        return {
            day,
            icon:dateFunc.icon,
            expanded:dateFunc.expanded
        };
    });


    return(
             
             <SafeAreaView className='flex-1 justify-start items-center h-screen w-screen'> 
                <View className="flex flex-row">
                    <Link href={"/Plan"} className="mx-4">Change Plan</Link>
                    <Link href={"/Saved"} className="mx-4">View Saved</Link>
                </View>
                <ScrollView className="w-full px-8 ">
                    <List.Section>
                    {daysOfWeek.map((day, index) => (
                    <View className="my-3" key={index}>
                        <List.Accordion
                        expanded={day.expanded}
                        key={index}
                        title={`${day.day.format('dddd')} - ${day.day.format('MMMM Do YYYY')}`}
                        left={props => <List.Icon {...props} icon={day.icon.string}color={day.icon.color}
                         />}
                        >
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                        </List.Accordion>
                    </View>
                    ))}
                    </List.Section>
                </ScrollView>
                <View className="flex flex-row justify-between px-8 w-full mb-2">
                    <Icon
                        source="arrow-left-circle"
                        size={35}
                    /> 
                    <Text className="my-auto font-bold text-2xl">WEEK {currentDate.week()}</Text>
                    <Icon
                        source="arrow-right-circle"
                        size={35}
                    />                     
                </View>
            </SafeAreaView>

    )
}