import React from "react";
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Navbar ,Topbar } from "../components/PageLayout";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";
import { useLanguage } from '../contexts/LanguageContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export default function MainScreen() {
    const {t, setLanguage, language} = useLanguage();
    const navigation = useNavigation<NavigationProp>();

    return (
      <SafeAreaView className="flex-1 bg-gray-100">
        <Topbar/>
        <View className="flex-1 items-center justify-center">
          <Text>{t('main.title')}</Text>
          <Text className={'mt-8'}>{t('main.info')}</Text>
        </View>
        <Navbar/>
      </SafeAreaView>
    );
}
