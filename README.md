# React Native TS Expo Routing + Translation Template

A minimal Expo + React Native + TypeScript template with file\-based react-routing and lightweight page\-scoped translations powered by custom react context and preconfigured NativeWind/Tailwind styling.

# Contents
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [What’s included](#whats-included)
- [Project structure](#project-structure)
- [Routing model](#routing-model)
- [Translations model](#translations-model)
- [Styling with NativeWind/Tailwind](#styling-with-nativewindtailwind)
- [Common tasks](#common-tasks)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)

## Demo
The translation is based on the [nextjs website template](https://github.com/lpj-app/nextjs-translation-template). The translation can be tested live [here](https://nextjs-language-template.lpj.app/).

Check out the demo:
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
- `components/PageLayout.tsx`: Shared layout wrapper for pages
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

Use standard React Native components with `className` for NativeWind styling.

## Translations model

- `contexts/LanguageContext.tsx` exposes current language and setter from there you import `{ useLanguage }`;
- In page use translation function with `const { t, language } = useLanguage();` and access translation with `t('translation.key')`.
- Each page has a translation map in `contexts/*Translation.ts` (keys → localized strings).
- All pages are automatically wrapped in `LanguageProvider` in `App.tsx`. So theres no need to wrap individual pages.

Example usage in a screen:

```ts
import { useContext } from 'react';
import { Text, View } from 'react-native';
import PageLayout from '@/components/PageLayout';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Main() {
  const { t } = useLanguage();
  
  return (
    <PageLayout title={t('main.title')}>
      <View className="gap-3 p-4">
        <Text className="text-xl font-bold">{t('main.welcome')}</Text>
        <Text className="text-neutral-500">{t('main.info')}</Text>
      </View>
    </PageLayout>
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