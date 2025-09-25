// components/NavBar.tsx
import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList} from "../types";
import { useLanguage } from '../contexts/LanguageContext';
import { SafeAreaView } from "react-native-safe-area-context";

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    showTopbar?: boolean;
    showNavbar?: boolean;
}

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    showTopbar?: boolean;
    showNavbar?: boolean;
    navbarMode?: "full" | "disabled" | "content-hidden";
}

export default function Layout({
                                   children,
                                   title,
                                   showTopbar = true,
                                   showNavbar = true,
                                   navbarMode = "full",
                               }: LayoutProps) {
    const renderNavbar = () => {
        if (navbarMode === "disabled") return null;
        return <Navbar mode={navbarMode} />;
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            {showTopbar && <Topbar title={title} />}
            <View className="flex-1">{children}</View>
            {showNavbar && renderNavbar()}
        </SafeAreaView>
    );
}

// Navbar component
interface NavbarProps {
    mode?: "full" | "content-hidden" | "disabled";
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type FeatherName = React.ComponentProps<typeof Feather>['name'];

export function Navbar({ mode = "full" }: NavbarProps) {
  const {t} = useLanguage();
  const navigation = useNavigation<NavigationProp>();

  const items: {
    route: keyof RootStackParamList;
    label: string;
    icon: FeatherName
  }[] = [
    { route: "Projects", label: t('navbar.projects'), icon: "tool" },
    { route: "Calendar", label: t('navbar.calendar'), icon: "calendar" },
    { route: "Main", label: t('navbar.start'), icon: "home" },
    { route: "Wiki", label: t('navbar.wiki'), icon: "book-open" },
    { route: "Settings", label: t('navbar.settings'), icon: "settings" },
  ];

  return (
    <View className="bg-white border-t border-gray-100">
      <View className="flex-row mx-4 my-2 bg-gray-50 rounded-xl">
        {items.map((item) => (
          <TouchableOpacity
            key={item.route}
            onPress={() => navigation.navigate({ name: item.route, params: {} })}
            className="flex-1 items-center py-2 rounded-xl active:bg-white"
            disabled={mode === "content-hidden" || mode === "disabled"}
          >
            {mode === "full" && (
              <View>
                <Feather name={item.icon} size={18} color="#4B5563" />
                <Text className="text-xs text-gray-600 mt-0.5">{item.label}</Text>
              </View>
            )}
            {mode === "content-hidden" && (
              <View className="h-8 w-8" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export function Topbar(props: { title?: string }) {
    const navigation = useNavigation<NavigationProp>();

    const displayTitle = props.title || "";

    return (
        <View className="bg-white border-b border-gray-100">
            {/* Topbar */}
            <View className="flex-row items-center justify-between px-5 py-2">
                <View className="w-8" />

                {/* Titel + Dropdown */}
                <View className="flex-row items-center">
                    <Text className="text-lg font-bold text-gray-900">{displayTitle}</Text>

                </View>

                {/* User-Button */}
                <TouchableOpacity
                    className="w-8 h-8 bg-blue-500 rounded-lg items-center justify-center active:bg-blue-600"
                    onPress={() => navigation.navigate({name: "Account", params: {} })}
                >
                    <Feather name="user" size={16} color="white" />
                </TouchableOpacity>
            </View>

        </View>
    );
}
