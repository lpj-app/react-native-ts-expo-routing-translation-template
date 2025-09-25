import { Text, View } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";

import { useLanguage } from '../../contexts/LanguageContext';
import { RootStackParamList } from "types";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function WikiScreen(){
  const {t} = useLanguage();
  const navigation = useNavigation<NavigationProp>();

    return(
      <SafeAreaView className="flex-1 bg-gray-100">
        <View className={"flex-1 items-center justify-center"}>
          <Text>{t('wiki.title')}</Text>
        </View>
      </SafeAreaView>
    )
}