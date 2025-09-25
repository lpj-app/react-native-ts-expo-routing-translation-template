import {View, Text, Button} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { useLanguage } from '../../contexts/LanguageContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProjectsScreen() {
    const {t} = useLanguage();
    const navigation = useNavigation<NavigationProp>();

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="flex-1 items-center justify-center">
              <Text>{t('projects.title')}</Text>
                <Button
                    title={t('projects.button')}
                    onPress={() =>
                        navigation.navigate("ProjectDetail", {})
                    }
                />

            </View>
        </SafeAreaView>
    );
}
