import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '@/constants/bookingTheme';
import { BookingProvider } from '@/context/booking';
import type { RootStackParamList } from '@/navigation/types';
import BookingScreen from '@/screens/BookingScreen';
import BraiderDetailScreen from '@/screens/BraiderDetailsScreen';
import BraiderListScreen from '@/screens/BraiderListScreen';
import ConfirmationScreen from '@/screens/ConfirmationScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <BookingProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.ink,
            headerShadowVisible: false,
            contentStyle: { backgroundColor: colors.background },
          }}>
            <Stack.Screen name="BraiderList" component={BraiderListScreen} options={{ title: 'Wimora' }} />
            <Stack.Screen name="BraiderDetail" component={BraiderDetailScreen} options={{ title: 'Braider details' }} />
            <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Book appointment' }} />
            <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{ title: 'Booking confirmed', headerBackVisible: false, gestureEnabled: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </BookingProvider>
    </SafeAreaProvider>
  );
}
