// navigation/MainNavigation.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import Layout from '../components/PageLayout';

import MainScreen from '../app/Main';
import AccountScreen from '../app/Account';
import WikiScreen from '../app/Profile/Wiki';
import ProjectsScreen from '../app/Profile/Projects';
import ProjectDetailScreen from '../app/Profile/ProjectDetail';
import CalendarScreen from '../app/Profile/Calendar';
import SettingsScreen from '../app/Profile/Settings';
import { useRef, useState } from 'react';

type NavbarMode = "full" | "disabled" | "content-hidden";
const Stack = createNativeStackNavigator<RootStackParamList>();

// Config mapping
const layoutConfig: Record<
    keyof RootStackParamList,
    { title?: string; navbarMode: NavbarMode; showTopbar: boolean }
> = {
    Main: { navbarMode: "full", showTopbar: true },
    Account: { navbarMode: "full", showTopbar: true },
    Wiki: { navbarMode: "full", showTopbar: true },
    Projects: { navbarMode: "full", showTopbar: true },
    ProjectDetail: { navbarMode: "full", showTopbar: true },
    Calendar: { navbarMode: "content-hidden", showTopbar: true },
    Settings: { navbarMode: "disabled", showTopbar: true },
};

export default function MainNavigation() {

    const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);
    const [cfg, setCfg] = useState(layoutConfig["Main"]); // default config

    function update() {
        const route = navigationRef.current?.getCurrentRoute();
        if (!route) return;
        const config = layoutConfig[route.name as keyof RootStackParamList];
        if (config) setCfg(config);
    }

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={update}
            onStateChange={update}
        >
            <Layout
                title={cfg.title}
                navbarMode={cfg.navbarMode}
                showTopbar={cfg.showTopbar}
            >
                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName="Main"
                >
                    <Stack.Screen name="Main" component={MainScreen} />
                    <Stack.Screen name="Account" component={AccountScreen} />
                    <Stack.Screen name="Wiki" component={WikiScreen} />
                    <Stack.Screen name="Projects" component={ProjectsScreen} />
                    <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
                    <Stack.Screen name="Calendar" component={CalendarScreen} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
            </Layout>
        </NavigationContainer>
    );
}
