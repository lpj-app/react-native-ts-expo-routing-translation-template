import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { useLanguage } from '../../contexts/LanguageContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProjectDetail() {
  const {t} = useLanguage();
  const navigation = useNavigation<NavigationProp>();

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="flex-1 items-center justify-center">
              <Text>{t('projectDetails.title')}</Text>
            </View>
        </SafeAreaView>
    );
}
