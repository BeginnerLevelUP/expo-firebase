import { View,Text,ScrollView,SafeAreaView } from 'react-native';
import React,{useState} from "react"
import Svg, { Path,Ellipse } from 'react-native-svg';
import { Button,TextInput,PaperProvider } from 'react-native-paper';
export default function ProfilePage(){
    const [text, setText] = useState("");
    return(
    <PaperProvider>
        <SafeAreaView className='flex-1 justify-start items-center h-screen w-screen'> 
        {/* Profile Icon */}
            <View className='flex flex-row justify-center items-center px-12 py-4'>
                <View className='z-10 relative left-28'>
                <Svg width="62" height="53" viewBox="0 0 62 53" fill="none">
                <Path d="M30.7159 26.4095C35.371 26.4095 39.8354 25.0278 43.127 22.5683C46.4186 20.1088 48.2679 16.773 48.2679 13.2948C48.2679 9.81658 46.4186 6.48082 43.127 4.02134C39.8354 1.56186 35.371 0.180145 30.7159 0.180145C26.0608 0.180145 21.5964 1.56186 18.3048 4.02134C15.0132 6.48082 13.164 9.81658 13.164 13.2948C13.164 16.773 15.0132 20.1088 18.3048 22.5683C21.5964 25.0278 26.0608 26.4095 30.7159 26.4095ZM24.4493 31.3275C10.9425 31.3275 0 39.5036 0 49.5958C0 51.2761 1.82376 52.6388 4.0726 52.6388H57.3592C59.6081 52.6388 61.4318 51.2761 61.4318 49.5958C61.4318 39.5036 50.4893 31.3275 36.9825 31.3275H24.4493Z" fill="black"/>
                </Svg>
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
    </PaperProvider>
    )
}