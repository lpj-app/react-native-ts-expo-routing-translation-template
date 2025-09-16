import React from "react";
import { Text, View } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Navbar, Topbar} from "../../components/PageLayout";
import {RouteProp, useRoute} from "@react-navigation/native";
import {PagesStackParamList} from "../../types";
import { useLanguage } from '../../contexts/LanguageContext';

type CalendarScreenRouteProp = RouteProp<PagesStackParamList, 'Calendar'>;

export default function CalendarScreen(){
    const {t} = useLanguage();
    const route = useRoute<CalendarScreenRouteProp>();

    return(
        <SafeAreaView className="flex-1 bg-gray-100">
            <Topbar/>
            <View className={"flex-1 items-center justify-center"}>
              <Text>{t('calendar.title')}</Text>
            </View>
            <Navbar/>
        </SafeAreaView>
    )
}