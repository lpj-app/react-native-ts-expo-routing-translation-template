import { Text, View } from 'react-native';
import {Topbar, Navbar} from "../components/PageLayout";
import {SafeAreaView} from "react-native-safe-area-context";
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function AccountScreen() {
  const {t} = useLanguage();

  return(
    <SafeAreaView className="flex-1 bg-gray-100">
      <Topbar/>
      <View className={"flex-1 items-center justify-center"}>
        <Text>{t('account.title')}</Text>
      </View>
      <Navbar/>
    </SafeAreaView>
  )
}