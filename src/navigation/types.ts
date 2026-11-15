import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  BraiderListScreen: undefined;
  BraiderDetailsScreen: {braiderId: string};
  BookingScreen: {bookingId: string};
  ConfirmationScreen: undefined;
};


export type ScreenProps<RouteName extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, RouteName>;