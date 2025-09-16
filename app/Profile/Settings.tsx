import React from "react";
import { View, Text } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';
import {RouteProp, useRoute} from "@react-navigation/native";
import {Navbar, Topbar} from "../../components/PageLayout";
import {PagesStackParamList} from "../../types";
import { useLanguage } from '../../contexts/LanguageContext';

type SettingsScreenRouteProp = RouteProp<PagesStackParamList, 'Settings'>;

export default function SettingsScreen(){
    const {t, setLanguage, language} = useLanguage();
    const route = useRoute<SettingsScreenRouteProp>();

    return(
        <SafeAreaView className="flex-1 bg-gray-100">
            <Topbar/>
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
            <Navbar/>
        </SafeAreaView>
    )
}