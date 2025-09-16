// navigation/ClubNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClubWikiScreen from '../app/Profile/Wiki';
import ClubProjectsScreen from '../app/Profile/Projects';
import ClubProjectDetailScreen from '../app/Profile/ProjectDetail';
import ClubCalendarScreen from '../app/Profile/Calendar';
import ClubSettingsScreen from '../app/Profile/Settings';
import { PagesStackParamList } from '../types';

const Stack = createNativeStackNavigator<PagesStackParamList>();

export default function PagesNavigator() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Wiki" component={ClubWikiScreen} />
        <Stack.Screen name="Projects" component={ClubProjectsScreen} />
        <Stack.Screen name="ProjectDetail" component={ClubProjectDetailScreen} />
        <Stack.Screen name="Calendar" component={ClubCalendarScreen} />
        <Stack.Screen name="Settings" component={ClubSettingsScreen} />
      </Stack.Navigator>
    );
}
