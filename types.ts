import { NavigatorScreenParams } from "@react-navigation/native";

// types.ts
export type PagesStackParamList = {
    Start: {};
    Wiki: {};
    Projects: {};
    ProjectDetail: {};
    Calendar: {};
    Settings: {};
};

// RootStack
export type RootStackParamList = {
    Main: undefined;
    Account: undefined;
    Pages: NavigatorScreenParams<PagesStackParamList>;
};
