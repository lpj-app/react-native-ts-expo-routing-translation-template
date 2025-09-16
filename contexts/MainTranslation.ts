type Translation = {
  de: Record<string, string>;
  en: Record<string, string>;
};

const MainTranslation: Translation = {
  en: {
    'main.title': 'Main Screen',
    'main.info': 'Go to settings to switch language'
  },
  de: {
    'main.title': 'Startseite',
    'main.info': 'Gehe in die Einstellungen, um die Sprache zu wechseln'
  },
};

export default MainTranslation;