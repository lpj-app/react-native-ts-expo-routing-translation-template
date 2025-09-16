// navigation/MainNavigation.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from '../app/Main';
import AccountScreen from '../app/Account';
import { RootStackParamList } from '../types';
import PagesNavigator from './PagesNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="Account" component={AccountScreen} />
                <Stack.Screen name="Pages" component={PagesNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
