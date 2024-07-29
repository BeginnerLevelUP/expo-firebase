import { useSession } from '../../../utils/auth/auth';
import { Text, View,ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import auth from "@react-native-firebase/auth"
import { Icon } from 'react-native-paper';

//Figma files


export default function HomeScreen() {
  const { signOut,session } = useSession();
  const user=JSON.parse(session)
  const currentUser=auth().currentUser
  return (
    <ScrollView> 
    <View  className='flex-1 justify-center items-center h-screen w-screen'>
      {/* Header */}
      <View className='mt-4'>
      <Text>Welcome Back <Text className='font-bold'>{currentUser?.displayName || currentUser?.email}</Text></Text>
      <View className='mx-auto my-8'>
        {/* Background */}
        <Svg width="127" height="123" viewBox="0 0 127 123" fill="none">
          <Path d="M127 61.5C127 95.4655 98.5701 123 63.5 123C28.4299 123 0 95.4655 0 61.5C0 27.5345 28.4299 0 63.5 0C98.5701 0 127 27.5345 127 61.5Z" fill="#BC0F0F"/>
        </Svg>
      </View>

      <View className='mx-auto  z-10 relative bottom-[10rem]'>
        {/* Burnt */}
          <Icon
            source="fire"
            size={100}
          />
      </View>

      </View>

      {/* Nav */}
      <View className='w-full  flex flex-row justify-between px-4 items-center mb-24 '>
                    <Icon
                        source="arrow-left-circle"
                        size={35}
                    /> 
        <View className='bg-gray-600 h-32 w-3/4 flex items-center justify-between rounded-lg flex-row px-4'>
          <Icon
            source="bike-fast"
            size={100}
          />
          
          <View>
            <Text className='mb-8'>Goal : 0/500 cals</Text>
          <Icon
            source="bookmark-plus-outline"
            size={40}
            color='green'
          />
          </View>

        </View>
                    <Icon
                        source="arrow-right-circle"
                        size={35}
                    />  
      </View>

      {/* Goal */}
      <View className='w-full h-[200px] flex flex-row justify-between px-4 items-center '>
        
      </View>

    </View>
    </ScrollView>

  );
}

