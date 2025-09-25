# React Native TS Expo Routing + Translation Template

A minimal Expo + React Native + TypeScript template with file\-based react-routing and lightweight page\-scoped translations powered by custom react context and preconfigured NativeWind/Tailwind styling. 

<br><br>

Current version: 1.0.1

# Contents
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [What’s included](#whats-included)
- [Project structure](#project-structure)
- [Routing model](#routing-model)
  - [Add new page to routing](#add-new-page-to-routing)
  - [Navigate between pages](#navigate-between-pages)
  - [Add params to routes](#add-params-to-routes)
    - [Set content and visibiility of navbar and topbar](#set-content-and-visibiility-of-navbar-and-topbar)
- [Translations model](#translations-model)
- [Styling with NativeWind/Tailwind](#styling-with-nativewindtailwind)
- [Common tasks](#common-tasks)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)

## Demo
The translation is based on the [nextjs website template](https://github.com/lpj-app/nextjs-translation-template). The translation can be tested live [here](https://nextjs-language-template.lpj.app/).

Check out the demo: <br>
[![Demo video](https://img.youtube.com/vi/SvcQUSJpff4/0.jpg)](https://youtube.com/shorts/SvcQUSJpff4?si=-gUaqOcS8wQsgzup)
## Prerequisites

- Node.js LTS and npm
- Expo CLI: `npm i -g expo-cli` or use `npx expo`
- Android Studio (emulator) or a physical device with Expo Go
- Windows 10/11 (project is editor\-agnostic; tested in WebStorm)

## Getting started

1. Use as a template on GitHub or clone the repo.
2. Install dependencies in root directory:
    - `npm install`
3. Start the dev server:
    - `npm run start` or `npx expo start`
4. Launch:
    - Press `a` for Android emulator
    - Scan the QR with Expo Go on device
    - `w` to open web (if needed)

Optional:
- If Metro fails to resolve nativewind classes after a fresh install, clear cache: `npx expo start -c`.

## What’s included

- TypeScript setup with strict config: `tsconfig.json`, `app-env.d.ts`, `nativewind-env.d.ts`, `types.ts`
- Expo app config: `app.json`, Metro & Babel: `metro.config.js`, `babel.config.js`
- File\-based routing via `app/` screens and nested folders
- Page layout wrapper: `components/PageLayout.tsx`
- Lightweight translations by page:
    - `contexts/LanguageContext.tsx`
    - `contexts/*Translation.ts`
- Navigation helpers: `navigation/MainNavigation.tsx`, `navigation/PagesNavigation.tsx`
- Styling with NativeWind/Tailwind: `tailwind.config.js`, `global.css`
- Linting & formatting: `eslint.config.js`, `prettier.config.js`
- Assets for icons/splash: `assets/`

## Project structure

- `app/`: File\-based routes (e.g., `Main.tsx`, `Account.tsx`, nested `Profile/Calendar.tsx`)
- `components/PageLayout.tsx`: Shared layout wrapper for pages (includes navbar and topbar)
- `contexts/`: Language context and page\-scoped translation maps
- `navigation/`: Optional navigation composition for advanced scenarios
- `assets/`: App icons, splash, images, videos
- Root configs: TypeScript, ESLint, Prettier, Tailwind, Metro, Babel

## Routing model

- Each file in `app/` becomes a route (nested folders → nested routes).
- Example routes:
    - `app/Main.tsx` → `/Main`
    - `app/Account.tsx` → `/Account`
    - `app/Profile/Projects.tsx` → `/Profile/Projects`

### Add new page to routing
1. Create `app/NewPage.tsx` or nested `app/Folder/NewPage.tsx`.
2. Use `useNavigation` from `@react-navigation/native` to navigate programmatically.
3. (Optional) Add translations in `contexts/NewPageTranslation.ts` and import in `
4. Add the route name alias to `types.ts`
```ts
// RootStack
export type RootStackParamList = {
    Main: {};
    Account: {};
    Wiki: {};
    Projects: {};
    ProjectDetail: {};
    Calendar: {};
    Settings: {};
    NewPage: {}; // <- add your new page here
};
```
5. Import your new page and add the new route to config mapping in `navigation/MainNavigation.tsx`

Import new page:
```ts
import NewPage from '../app/NewPage'; // <- import your new page here
```

Add page to config mapping:
```ts
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
    NewPage: { navbarMode: "full", showTopbar: true }, // <- add your new page here
};
```

#### Set content and visibiility of navbar and topbar
Edit the `layoutConfig` object in `MainNavigation.tsx` to set:
- `navbarMode`: `"full"` (default, shows all icons), `"content-hidden"` (hides icons, shows back button), `"disabled"` (hides navbar)
- `showTopbar`: `true` (default, shows topbar), `false` (hides topbar)

This is how you can specify the visibility and content of the navbar and topbar for each page as needed.

F.e. a signup or login page does not need navbar content but it could be nice to have the component for design, so you can set `navbarMode: "content-hidden"`

The `layoutConfig` is needed to wrap the entire NavigationContainer in `MainNavigation.tsx` with the `PageLayout` component to prevent rerender of nav and top bar on each page change.

6. Finally add the route to the `Stack.Navigator` in `MainNavigation.tsx`:

```ts
...
<Stack.Screen name="Main" component={MainScreen} />
<Stack.Screen name="Account" component={AccountScreen} />
<Stack.Screen name="Wiki" component={WikiScreen} />
<Stack.Screen name="Projects" component={ProjectsScreen} />
<Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
<Stack.Screen name="Calendar" component={CalendarScreen} />
<Stack.Screen name="Settings" component={SettingsScreen} />
<Stack.Screen name="NewPage" component={NewPage} /> {/* <- add your new page here */}
...
```

### Navigate between pages
- Use `useNavigation` from `@react-navigation/native` and the `RootStackParamList` type from `types.ts` to get typed navigation.
- Example:
```ts
import {View, Text, Button} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { useLanguage } from '../../contexts/LanguageContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProjectsScreen() {
    const {t} = useLanguage();
    const navigation = useNavigation<NavigationProp>();

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="flex-1 items-center justify-center">
              <Text>{t('projects.title')}</Text>
                <Button
                    title={t('projects.button')}
                    onPress={() =>
                        navigation.navigate({name: 'ProjectDetail', params: {}})
                        navigation.navigate({name: 'ProjectDetail', params: {id: 2, name: 'My Project'}}) {/*Navigate with params*/}
                    }
                />

            </View>
        </SafeAreaView>
    );
}
```

### Add params to routes
Add the route params to `types.ts`:
```ts
// RootStack
export type RootStackParamList = {
    ...
    NewPage: {id: number, name: string}; // <- add params like id or name
};
```


## Translations model

- `contexts/LanguageContext.tsx` exposes current language and setter from there you import `{ useLanguage }`;
- In page use translation function with `const { t, language } = useLanguage();` and access translation with `t('translation.key')`.
- Each page has a translation map in `contexts/*Translation.ts` (keys → localized strings).
- All pages are automatically wrapped in `LanguageProvider` in `App.tsx`. So theres no need to wrap individual pages.

Example usage in a screen:

```ts
import { View, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";
import { useLanguage } from '../contexts/LanguageContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MainScreen() {
    const {t, setLanguage, language} = useLanguage();
    const navigation = useNavigation<NavigationProp>();

    return (
    <SafeAreaView className="flex-1 bg-gray-100">
        <View className="flex-1 items-center justify-center">
            <Text>{t('main.title')}</Text>
            <Text className={'mt-8'}>{t('main.info')}</Text>
        </View>
    </SafeAreaView>
);
}

```

Example translation map in `contexts/MainTranslation.ts`:

```ts
type Translation = {
    de: Record<string, string>;
    en: Record<string, string>;
};

const MainTranslation: Translation = {
    en: {
        'main.title': 'Main Screen',
        'main.welcome': 'Welcome to the app!',
        'main.info': 'Go to settings to switch language'
    },
    de: {
        'main.title': 'Startseite',
        'main.welcome': 'Willkommen in der App!',
        'main.info': 'Gehe in die Einstellungen, um die Sprache zu wechseln'
    },
};

export default MainTranslation;
```

Then import Translation in `LanguageContext.tsx` and add to the translations object.

```ts
import React, { createContext, useContext, useState, ReactNode } from 'react';

import PageLayoutTranslation from './PageLayoutTranslation';
import MainTranslation from './MainTranslation';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    ...MainTranslation.en,
    ...PageLayoutTranslation.en,
  },
  de: {
    ...MainTranslation.de,
    ...PageLayoutTranslation.de,
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

```

## Styling with NativeWind/Tailwind

- Write Tailwind classes in `className` on React Native components.

#### Preconfigured by default, but if errors occur, check:
- Configure classes in `tailwind.config.js`.
- Ensure Babel has `nativewind/babel` plugin and `global.css` is imported once (usually in `App.tsx`) for web support.

Example:

```ts
import { View, Text } from 'react-native';

export function Badge({ label }: { label: string }) {
  return (
    <View className="px-3 py-1 rounded-full bg-blue-600">
      <Text className="text-white font-medium">{label}</Text>
    </View>
  );
}
```

Use standard React Native components with `className` for NativeWind styling.

## Common tasks

- Rename the app:
    - Edit `app.json` fields `name`, `slug`, and icon/splash paths under `assets/`.
- Add a new screen:
    1. Create `app/Feature.tsx`.
    2. Create `contexts/FeatureTranslation.ts` with per\-lang strings.
    3. Use `const {t, language} = useLanguage()` to read the current language and render from your translation map.
- Add a new language:
    1. Extend the language union/type in `types.ts` (and in `LanguageContext` if constrained).
    2. Add translations for all pages under `contexts/*Translation.ts`.
- Change language at runtime:
    - Use `const { language, setLanguage } = useLanguage();`
    - Call `setLang('en')` (or your new code) using a settings UI (see `app/Profile/Settings.tsx`).

## Scripts

Typical commands:
- Start: `npm run start` or `npx expo start`
- Android: `npm run android`
- Web: `npm run web`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`

Note: If a script is missing, use the equivalent `npx expo` command.

## Troubleshooting

- Metro cache issues: `npx expo start -c`
- NativeWind classes not applied: verify `babel.config.js` includes `nativewind/babel`, and `tailwind.config.js` `content` paths include `app/**/*.{ts,tsx}` and `components/**/*.{ts,tsx}`.
- Type errors for translations: ensure all languages share the same keys and exported types match `types.ts`.

## License

See [LICENSE](./LICENSE).


--- 

&copy; [lpj.app](https://github.com/lpj-app). Licensed under MIT.