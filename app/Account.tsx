import { Text, View } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";

import { useLanguage } from '../contexts/LanguageContext';
import { useNavigation } from "@react-navigation/native";
import {RootStackParamList} from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AccountScreen() {
  const {t} = useLanguage();
  const navigation = useNavigation<NavigationProp>();

  return(
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className={"flex-1 items-center justify-center"}>
        <Text>{t('account.title')}</Text>
      </View>
    </SafeAreaView>
  )
}