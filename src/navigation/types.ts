import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  BraiderList: undefined;
  BraiderDetail: {braiderId: string};
  Booking: {braiderId: string};
  Confirmation: undefined;
};


export type ScreenProps<RouteName extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, RouteName>;