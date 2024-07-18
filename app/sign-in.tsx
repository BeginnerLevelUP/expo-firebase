import { router } from 'expo-router';
import { Text, View,TextInput,Button,StyleSheet,Alert } from 'react-native';
// import { useState } from 'react';
import { useSession } from '../auth/auth';
// import auth from "@react-native-firebase/auth"
// "https://www.youtube.com/watch?v=mZlKwRV4MC8&t=582s&ab_channel=Dan%27sReactNativeLab"


export default function SignIn() {
  const { signIn } = useSession();
  // const [email,setEmail]=useState<string | undefined>()
  // const [password,setPassword]=useState<string | undefined>()

  // const createAccount=async(response:any)=>{
    
  // }
  // const registerAndGoToMainFlow=async()=>{
  //   if(email&&password){
  //     try{
  //       const response=await auth().createUserWithEmailAndPassword(
  //         email,
  //         password
  //       )
  //       if (response.user){
  //         await createAccount(response)
  //       }
  //     }catch(e){
  //       e instanceof Error? Alert.alert(`${e}`) : Alert.alert('unknown error')
  //     }
  //   }
  // }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('/');
        }}>
        Sign Inxr
      </Text>
      {/* <Text>Email</Text>
      <TextInput placeholder='Enter Your Email' value={email} onChange={()=>setEmail}></TextInput>
      <Text>Password</Text>
      <TextInput placeholder='Enter Your Password' value={password} onChange={()=>setPassword}></TextInput>
      <Button title='Login' onPress={()=>{}}></Button>
      <Button title='Sign Up' onPress={()=>{}}></Button> */}
    </View>
  );
}
