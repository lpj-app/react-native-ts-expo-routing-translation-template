type Translation = {
  de: Record<string, string>;
  en: Record<string, string>;
};

const SettingsTranslation: Translation = {
  en: {
    'settings.title': 'Settings',
  },
  de: {
    'settings.title': 'Einstellungen'
  },
}

export default SettingsTranslation;