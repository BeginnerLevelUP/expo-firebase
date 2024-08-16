import { Text, View,ScrollView } from 'react-native';
import { Icon } from 'react-native-paper';
import { FC } from 'react';
import Meal from '@/utils/interface/meal';
import Exercise from '@/utils/interface/exercise';
interface HomeCardProps{
    userPlannedExercies:Exercise[]
}
const HomeCard:FC<HomeCardProps> = ({userPlannedExercies=[]}) => {
  return (
<>
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
</>
  )
}

export default HomeCard