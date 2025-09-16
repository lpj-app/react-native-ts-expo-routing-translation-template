import React from "react";
import {View, Text, FlatList, TouchableOpacity, Button} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Navbar, Topbar } from "../../components/PageLayout";
import { PagesStackParamList } from "../../types";
import { useLanguage } from '../../contexts/LanguageContext';

type ProjectsScreenRouteProp = RouteProp<PagesStackParamList, 'Projects'>;
type ProjectsScreenNavigationProp = NativeStackNavigationProp<PagesStackParamList, 'Projects'>;

export default function ProjectsScreen() {
    const {t} = useLanguage();
    const route = useRoute<ProjectsScreenRouteProp>();
    const navigation = useNavigation<ProjectsScreenNavigationProp>();

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <Topbar />

            <View className="flex-1 items-center justify-center">
              <Text>{t('projects.title')}</Text>
                <Button
                    title={t('projects.button')}
                    onPress={() =>
                        navigation.navigate("ProjectDetail", {})
                    }
                />

            </View>
            <Navbar/>
        </SafeAreaView>
    );
}
