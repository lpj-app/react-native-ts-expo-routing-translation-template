type Translation = {
  de: Record<string, string>;
  en: Record<string, string>;
};

const PageLayoutTranslation: Translation = {
  en: {
    'navbar.projects': 'Projects',
    'navbar.calendar': 'Calendar',
    'navbar.start': 'Home',
    'navbar.wiki': 'Wiki',
    'navbar.settings': 'Settings'
  },
  de: {
    'navbar.projects': 'Projekte',
    'navbar.calendar': 'Kalender',
    'navbar.start': 'Start',
    'navbar.wiki': 'Wiki',
    'navbar.settings': 'Einstellungen'
  },
};

export default PageLayoutTranslation;