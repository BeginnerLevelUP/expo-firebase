import { router } from 'expo-router';
import { Text, View,TextInput,Button,StyleSheet,Alert } from 'react-native';
import { useState } from 'react';
import { useSession } from '../auth/auth';

// "https://www.youtube.com/watch?v=mZlKwRV4MC8&t=582s&ab_channel=Dan%27sReactNativeLab"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import db from "@react-native-firebase/database"

export default function SignIn() {
  const { signIn } = useSession();
  const [email,setEmail]=useState<string | undefined>()
  const [password,setPassword]=useState<string | undefined>()

  const createAccount=async(response:FirebaseAuthTypes.UserCredential)=>{
    db().ref(`/users/${response.user.uid}`).set({ email });
    db().ref(`/users/${response.user.uid}/calories`).set({ totalCalories: 0 });
  }
  const registerAndGoToMainFlow=async()=>{
    if(email&&password){
      try{
        const response=await auth().createUserWithEmailAndPassword(
          email,
          password
        )
        if (response.user){
          await createAccount(response)
          signIn(JSON.stringify(response.user))
          router.replace('/');
        }
      }catch(e){
        e instanceof Error? Alert.alert(`${e}`) : Alert.alert('unknown error')
      }
    }
  }


  const loginInAndGoToMainFlow=async()=>{
    if(email&&password){
      try{
        const response=await auth().signInWithEmailAndPassword(
          email,
          password
        )
        if (response.user){
          signIn(JSON.stringify(response.user))
          router.replace('/');
        }

      }catch(e){
        e instanceof Error? Alert.alert(`${e}`) : Alert.alert('unknown error')
      }
    }
  }
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        Sign Inxr
      </Text>
      <Text>Email</Text>
      <TextInput placeholder='Enter Your Email' value={email} onChangeText={setEmail}></TextInput>
      <Text>Password</Text>
      <TextInput placeholder='Enter Your Password' value={password} onChangeText={setPassword}></TextInput>
      <Button title='Login' onPress={()=>{loginInAndGoToMainFlow()}}></Button>
      <Button title='Sign Up' onPress={() => {registerAndGoToMainFlow();}}></Button>
    </View>
  );
}
