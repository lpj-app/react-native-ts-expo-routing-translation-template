import { View, Text } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';

import {RootStackParamList} from "../../types";
import { useLanguage } from '../../contexts/LanguageContext';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SettingsScreen(){
    const {t, setLanguage, language} = useLanguage();
    const navigation = useNavigation<NavigationProp>();

    return(
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="flex-1 items-center justify-center">
              <Text>{t('settings.title')}</Text>
              <Picker
                selectedValue={language}
                style={{ width: 200, height: 75 }}
                onValueChange={(value) => setLanguage(value)}
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Deutsch" value="de" />
              </Picker>
            </View>
        </SafeAreaView>
    )
}