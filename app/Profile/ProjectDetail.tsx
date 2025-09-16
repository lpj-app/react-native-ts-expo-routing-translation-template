import React from "react";
import { View, Text } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PagesStackParamList } from "../../types";
import { Topbar, Navbar } from "../../components/PageLayout";
import { useLanguage } from '../../contexts/LanguageContext';

type ProjectRouteProp = RouteProp<PagesStackParamList, "ProjectDetail">;

export default function ProjectDetail() {
  const {t} = useLanguage();
  const route = useRoute<ProjectRouteProp>();

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <Topbar />

            <View className="flex-1 items-center justify-center">
              <Text>{t('projectDetails.title')}</Text>
            </View>

            <Navbar />
        </SafeAreaView>
    );
}
