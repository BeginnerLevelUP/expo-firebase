import { Image, StyleSheet, Platform } from 'react-native';
import { useSession } from '../../../auth/auth';
import { Text, View } from 'react-native';
export default function HomeScreen() {
  const { signOut } = useSession();
  return (
    <View>
      
    </View>
  );
}

