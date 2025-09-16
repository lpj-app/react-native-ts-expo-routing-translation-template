type Translation = {
  de: Record<string, string>;
  en: Record<string, string>;
};

const WikiTranslation: Translation = {
  en: {
    'wiki.title': 'Wiki - find something to read',
  },
  de: {
    'wiki.title': 'Wiki - finde etwas zum lesen',
  },
}

export default WikiTranslation;