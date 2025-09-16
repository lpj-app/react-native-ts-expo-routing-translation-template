import React from "react";
import { Text, View } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {RouteProp, useRoute} from "@react-navigation/native";
import {Navbar, Topbar} from "../../components/PageLayout";
import {PagesStackParamList} from "../../types";
import { useLanguage } from '../../contexts/LanguageContext';

type WikiScreenRouteProp = RouteProp<PagesStackParamList, 'Wiki'>;

export default function WikiScreen(){
  const {t} = useLanguage();
  const route = useRoute<WikiScreenRouteProp>();

    return(
      <SafeAreaView className="flex-1 bg-gray-100">
        <Topbar/>
        <View className={"flex-1 items-center justify-center"}>
          <Text>{t('wiki.title')}</Text>
        </View>
        <Navbar/>
      </SafeAreaView>
    )
}