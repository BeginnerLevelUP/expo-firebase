import { View,Text,ScrollView,SafeAreaView } from 'react-native';
import React,{useState} from "react"
import Svg, { Path,Ellipse } from 'react-native-svg';
import { Button,TextInput,Icon } from 'react-native-paper';
export default function ProfilePage(){
    const [text, setText] = useState("");
    return(

        <SafeAreaView className='flex-1 justify-start items-center h-screen w-screen'> 
        {/* Profile Icon */}
            <View className='flex flex-row justify-center items-center px-12 py-4'>
                <View className='z-10 relative left-32'>
                    <Icon
                        source="account"
                        size={90}
                    /> 
                </View>

                <View className='z-0'>
                <Svg width="139" height="121" viewBox="0 0 139 121" fill="none">
                    <Ellipse cx="69.5" cy="60.5" rx="69.5" ry="60.5" fill="#D9D9D9"/>
                </Svg>
                </View>

                <Button className='space-x-2' icon="account-edit-outline" mode="contained" onPress={() => console.log('Pressed')}>
                    Edit
                </Button>
                    <Button className='space-x-4' icon="trash-can-outline" mode="contained" onPress={() => console.log('Pressed')}>
                    Remove
                </Button>
            </View>
        {/* Edit / Profile Details */}
            <View className='w-2/3 my-12' >
                <View className='my-4'>
                    <TextInput
                    label="Username"
                    value={text}
                    onChangeText={text => setText(text)}
                    />
                </View>

                <View className='my-4'>
                    <TextInput
                    label="Email"
                    value={text}
                    onChangeText={text => setText(text)}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}