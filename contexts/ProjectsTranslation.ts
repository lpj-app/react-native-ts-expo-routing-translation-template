type Translation = {
  de: Record<string, string>;
  en: Record<string, string>;
};

const ProjectsTranslation: Translation = {
  en: {
    'projects.title': 'Projects',
    'projects.button': 'Click me, to go to project details',
  },
  de: {
    'projects.title': 'Projekte',
    'projects.button': 'Klick mich, um zu den Projektdetails zu gehen',
  },
}

export default ProjectsTranslation;