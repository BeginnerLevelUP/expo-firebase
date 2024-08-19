import { useState } from 'react';
import { Text, View,Image} from 'react-native';
import { Link } from 'expo-router';
import { IconButton } from 'react-native-paper';
import { FC } from 'react';
import Exercise from "@/utils/interface/exercise";

interface HomeCardProps {
  userPlannedExercies: Exercise[]
}

const HomeCardExercise: FC<HomeCardProps> = ({ userPlannedExercies = [] }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const handleNextExercise = () => {
    setCurrentExerciseIndex((prevIndex) => 
      prevIndex === userPlannedExercies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevExercise = () => {
    setCurrentExerciseIndex((prevIndex) => 
      prevIndex === 0 ? userPlannedExercies.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {/* Nav */}
      <View className='w-fit flex flex-row justify-between items-center p-6 border'>
        <IconButton
          icon="arrow-left-circle"
          size={35}
          onPress={handlePrevExercise}
        /> 
        <View>
          {
            userPlannedExercies.length > 0 && (
                <>    
            <Link href={{pathname:"/exercise/[id]",params: { id: userPlannedExercies[currentExerciseIndex].id, data: JSON.stringify(userPlannedExercies[currentExerciseIndex]) },}}>        
              <View className='flex flex-col items-center'>
                <View className='flex flex-row items-center'>
                <Text className='font-bold text-2xl'>
                {userPlannedExercies[currentExerciseIndex].name.split(' ')[0].toLocaleUpperCase()}
                </Text>
                <IconButton
                  icon="bookmark-plus-outline"
                  size={40}
                  iconColor='green'
                /> 
                </View>
                <Image
                className='my-4'
                source={{ uri: userPlannedExercies[currentExerciseIndex].gifUrl }}
                width={120}
                height={120}
                /> 
              </View>
                </Link>
                </>
            )
          }
        </View>

        <IconButton
          icon="arrow-right-circle"
          size={35}
          onPress={()=>{handleNextExercise()}}
        />  
      </View>
    </>
  );
};

export default HomeCardExercise;