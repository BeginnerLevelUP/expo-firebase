import { View,SafeAreaView,Alert } from 'react-native';
import React,{useState} from "react"
import Svg, { Path,Ellipse } from 'react-native-svg';
import { Button,TextInput,Icon,IconButton,Modal,Portal } from 'react-native-paper';
import { useSession } from "@/utils/auth/auth";
import auth from "@react-native-firebase/auth"
import db from "@react-native-firebase/database"
export default function ProfilePage(){
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    const { signOut,session} = useSession();
    const user=JSON.parse(session)
    const currentUser=auth().currentUser
    
    const [username, setUsername] = useState("");
    // const [email, setemail] = useState("");
    
    const updateProfile=async(displayName:string,email:string)=>{
        if(currentUser){
            try{
                await currentUser.updateProfile({displayName,})
                // await currentUser.updateEmail(email)
                await currentUser.reload()
                Alert.alert('Changed Made Successfully')
            }catch(e){
            e instanceof Error? Alert.alert(`${e}`) : Alert.alert('unknown error')
        }
        }else{
        console.log('no user')
        }
    }
    return(
        <SafeAreaView className='flex-1 justify-start items-center h-screen w-screen'> 
        {/* Profile Icon */}
            <View className='flex flex-row justify-center items-center px-12 py-4'>
                <View className='z-10 relative left-[8rem]'>
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

                <Button className='space-x-2' icon="account-edit-outline" mode="contained" onPress={() => showModal()}>
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
                    label={"Username"}
                    value={currentUser?.displayName||''}
                    disabled
                    />
                </View>

                <View className='my-4'>
                    <TextInput
                    label="Email"
                    value={currentUser?.email||''}
                    disabled
                    />
                </View>
                {/* Logout Button */}
                <IconButton icon="logout"
                size={50} onPress={() => signOut()}
                />
            </View>



        {/* Modal */}
            <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <View className='w-full my-12' >
                    <View className='my-4'>
                        <TextInput
                        label={" New Username"}
                        value={username}
                        onChangeText={text => setUsername(text)}
                        />
                    </View>

                    {/* <View className='my-4'>
                        <TextInput
                        label="New Email"
                        value={email}
                        onChangeText={text => setemail(text)}
                        />
                    </View> */}

                <Button className='space-x-4' icon="content-save" mode="contained" onPress={() =>{updateProfile(username,'')}}>
                    Save
                </Button>
                </View>
            </Modal>
            </Portal>

        </SafeAreaView>
    )
}